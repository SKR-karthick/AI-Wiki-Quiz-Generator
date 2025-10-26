"""
Quiz generation using Groq AI.
"""

import os
import json
import logging
import re
from dotenv import load_dotenv
from groq import Groq
from models import QuizOutput, KeyEntities

load_dotenv()
logger = logging.getLogger(__name__)

class QuizGenerationConfig:
    MODEL_NAME = "llama-3.3-70b-versatile"
    TEMPERATURE = 0.7

def generate_quiz(article_content: str, article_title: str) -> dict:
    """Generate quiz from article content using AI."""
    try:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables. Please set it in your .env file")

        client = Groq(api_key=api_key)
        logger.info(f"Generating quiz for: {article_title}")

        prompt_template = (
            "You are an expert educator specializing in creating educational quizzes from Wikipedia articles.\n\n"
            "Given the following Wikipedia article content, generate a comprehensive, educational quiz with high-quality questions.\n\n"
            "ARTICLE CONTENT:\n{article_content}\n\n"
            "REQUIREMENTS:\n"
            "1. Generate exactly 7-8 thoughtful, factual questions based on the article.\n"
            "2. Each question must:\n"
            "   - Be directly answerable from the provided content\n"
            "   - Have 4 distinct, plausible options\n"
            "   - Have one clear correct answer\n"
            "   - Include a brief explanation (2-3 sentences) grounding the answer in the article\n"
            "   - Be assigned a difficulty level (easy, medium, or hard)\n"
            "3. Extract key entities: people, organizations, and locations mentioned in the article.\n"
            "4. Provide a 2-3 sentence summary of the article.\n"
            "5. List 3-5 main sections/topics covered in the article.\n"
            "6. Suggest 3-5 related Wikipedia topics for further reading.\n\n"
            "IMPORTANT CONSTRAINTS:\n"
            "- Do NOT hallucinate information not present in the article\n"
            "- Questions should test comprehension, not just recall\n"
            "- Vary difficulty levels across questions\n"
            "- Ensure all options are grammatically consistent with the question\n\n"
            "CRITICAL ANSWER FORMAT RULES:\n"
            "- The 'answer' field MUST contain the EXACT text from one of the options\n"
            "- Do NOT add prefixes like 'A)', 'Option A:', or any other formatting\n"
            "- Copy the option text EXACTLY as it appears in the options array\n"
            "- Example: If options are [\"Paris\", \"London\", \"Berlin\", \"Rome\"], answer should be \"Paris\" NOT \"A) Paris\"\n\n"
            "Return the response as a valid JSON object matching this exact structure:\n"
            "{\n"
            "  \"title\": \"string - article title\",\n"
            "  \"summary\": \"string - 2-3 sentence summary\",\n"
            "  \"key_entities\": {\n"
            "    \"people\": [\"list of people mentioned\"],\n"
            "    \"organizations\": [\"list of organizations\"],\n"
            "    \"locations\": [\"list of locations\"]\n"
            "  },\n"
            "  \"sections\": [\"list of main sections/topics\"],\n"
            "  \"quiz\": [\n"
            "    {\n"
            "      \"question\": \"What is the capital of France?\",\n"
            "      \"options\": [\"Paris\", \"London\", \"Berlin\", \"Rome\"],\n"
            "      \"answer\": \"Paris\",\n"
            "      \"difficulty\": \"easy\",\n"
            "      \"explanation\": \"Paris is the capital and largest city of France.\"\n"
            "    }\n"
            "  ],\n"
            "  \"related_topics\": [\"topic 1\", \"topic 2\", \"topic 3\"]\n"
            "}\n\n"
            "CRITICAL: Return ONLY valid JSON, no markdown formatting, no extra text. The 'answer' field must match EXACTLY one option."
        )
        prompt = prompt_template.replace("{article_content}", article_content)

        response = client.chat.completions.create(
            model=QuizGenerationConfig.MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a helpful assistant that generates educational quizzes."},
                {"role": "user", "content": prompt}
            ],
            temperature=QuizGenerationConfig.TEMPERATURE,
            max_tokens=2048
        )
        response_text = response.choices[0].message.content
        logger.info(f"LLM response length: {len(response_text)} characters")
        logger.info(f"Full raw LLM response:\n{response_text}")

        cleaned_response = response_text.strip()
        if cleaned_response.startswith('```json'):
            cleaned_response = cleaned_response[7:]  # Remove ```json
        if cleaned_response.startswith('```'):
            cleaned_response = cleaned_response[3:]  # Remove ```
        if cleaned_response.endswith('```'):
            cleaned_response = cleaned_response[:-3]  # Remove trailing ```
        cleaned_response = cleaned_response.strip()

        try:
            quiz_data = json.loads(cleaned_response)
        except json.JSONDecodeError:
            # Try to extract JSON substring between first { and last }
            start = cleaned_response.find('{')
            end = cleaned_response.rfind('}')
            if start != -1 and end != -1 and end > start:
                json_str = cleaned_response[start:end+1]
                try:
                    quiz_data = json.loads(json_str)
                except Exception as e2:
                    logger.error(f"Failed to parse extracted JSON: {e2}")
                    logger.error(f"Full raw response:\n{response_text}")
                    raise ValueError("No valid JSON found in LLM response")
            else:
                logger.error(f"Could not find JSON in response. Full raw response:\n{response_text}")
                raise ValueError("No valid JSON found in LLM response")

        if not quiz_data.get("title"):
            quiz_data["title"] = article_title

        try:
            validated = QuizOutput(**quiz_data)
        except Exception as e:
            logger.error(f"Pydantic validation error: {e}")
            logger.error(f"Parsed quiz data:\n{json.dumps(quiz_data, indent=2)}")
            raise ValueError(f"Quiz validation failed: {str(e)}")
        
        logger.info(f"Successfully generated quiz with {len(validated.quiz)} questions")
        if hasattr(validated, 'model_dump'):
            return validated.model_dump()
        else:
            return validated.dict()

    except Exception as e:
        logger.error(f"Quiz generation failed: {str(e)}")
        raise ValueError(f"Failed to generate quiz: {str(e)}")


def extract_key_entities_from_content(content: str) -> KeyEntities:
    """
    Extract key entities (fallback if LLM extraction fails).
    
    Args:
        content (str): Article content
    
    Returns:
        KeyEntities: Extracted entities
    """
    return KeyEntities(
        people=[],
        organizations=[],
        locations=[]
    )


if __name__ == "__main__":
    # Test the quiz generator
    test_content = """
    Alan Turing was a British mathematician, computer scientist, logician, and theoretical biologist.
    He is widely regarded as one of the most influential figures of the 20th century.
    """
    
    try:
        quiz = generate_quiz(test_content, "Alan Turing")
        print(json.dumps(quiz, indent=2))
    except Exception as e:
        print(f"Error: {e}")
    
