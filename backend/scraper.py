"""
Wikipedia scraper using BeautifulSoup.
Fetches and cleans Wikipedia article content for LLM processing.
"""

import requests
from bs4 import BeautifulSoup
from typing import Tuple, Optional
import logging

logger = logging.getLogger(__name__)

# Headers to mimic a browser request
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}


def scrape_wikipedia(url: str) -> Tuple[str, str, str]:
    """
    Scrape Wikipedia article content and return cleaned text, title, and raw HTML.
    
    Args:
        url (str): Wikipedia article URL (e.g., https://en.wikipedia.org/wiki/Alan_Turing)
    
    Returns:
        Tuple[str, str, str]: (cleaned_text, title, raw_html)
    
    Raises:
        ValueError: If URL is not valid or content cannot be fetched
        requests.RequestException: If network error occurs
    """
    
    # Validate URL
    if not url.startswith("https://en.wikipedia.org/wiki/"):
        raise ValueError("Please provide a valid Wikipedia URL (https://en.wikipedia.org/wiki/...)")
    
    try:
        # Fetch the page
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.content, "html.parser")
        raw_html = response.text
        
        # Extract title
        title = extract_title(soup)
        
        # Extract cleaned content
        cleaned_content = extract_content(soup)
        
        if not cleaned_content.strip():
            raise ValueError("Could not extract article content from the URL")
        
        logger.info(f"Successfully scraped: {title} from {url}")
        return cleaned_content, title, raw_html
        
    except requests.RequestException as e:
        logger.error(f"Network error while scraping {url}: {str(e)}")
        raise ValueError(f"Unable to fetch the URL: {str(e)}")
    except Exception as e:
        logger.error(f"Error scraping {url}: {str(e)}")
        raise ValueError(f"Error processing Wikipedia article: {str(e)}")


def extract_title(soup: BeautifulSoup) -> str:
    """
    Extract article title from Wikipedia page.
    
    Args:
        soup (BeautifulSoup): Parsed HTML content
    
    Returns:
        str: Article title
    """
    # Try multiple methods to find the title
    title_h1 = soup.find("h1", class_="firstHeading")
    if title_h1:
        return title_h1.get_text(strip=True)
    
    # Fallback to page title meta tag
    title_tag = soup.find("meta", property="og:title")
    if title_tag:
        return title_tag.get("content", "Unknown")
    
    return "Unknown Title"


def extract_content(soup: BeautifulSoup) -> str:
    """
    Extract and clean article content from Wikipedia.
    Removes boilerplate, references, tables, and formatting.
    
    Args:
        soup (BeautifulSoup): Parsed HTML content
    
    Returns:
        str: Cleaned article text
    """
    
    # Find main content area
    content_div = soup.find("div", id="mw-content-text")
    
    if not content_div:
        logger.warning("Could not find main content div, using body")
        content_div = soup.find("body")
    
    if not content_div:
        return ""
    
    # Clone to avoid modifying original
    content = content_div.__copy__()
    
    # Remove unwanted elements
    unwanted_selectors = [
        ("script",),  # Scripts
        ("style",),  # Stylesheets
        ("noscript",),  # Noscript content
        ("div", {"class": "reflist"}),  # References
        ("div", {"class": "navbox"}),  # Navigation boxes
        ("div", {"class": "infobox"}),  # Infoboxes (we extract key info separately)
        ("table",),  # Tables
        ("sup", {"class": "reference"}),  # Reference markers
        ("div", {"class": "toc"}),  # Table of contents
        ("div", {"class": "mw-editsection"}),  # Edit buttons
        ("span", {"class": "mw-editsection"}),  # Edit spans
    ]
    
    for selector in unwanted_selectors:
        if len(selector) == 1:
            for element in content.find_all(selector[0]):
                element.decompose()
        else:
            for element in content.find_all(selector[0], selector[1]):
                element.decompose()
    
    # Extract text
    text = content.get_text(separator=" ", strip=True)
    
    # Clean up excessive whitespace
    text = " ".join(text.split())
    
    # Remove common Wikipedia boilerplate patterns
    lines = text.split(".")
    cleaned_lines = []
    
    for line in lines:
        line = line.strip()
        # Skip very short lines and common boilerplate
        if len(line) > 10 and not any(skip in line.lower() for skip in [
            "citation needed",
            "edit this box",
            "expand this article",
            "this article needs",
        ]):
            cleaned_lines.append(line)
    
    result = ". ".join(cleaned_lines)
    
    # Limit to first ~4000 characters for LLM processing
    # (most APIs have token limits, and we want efficiency)
    if len(result) > 8000:
        result = result[:8000] + "..."
    
    return result


def extract_sections(soup: BeautifulSoup) -> list:
    """
    Extract main section headings from the article.
    
    Args:
        soup (BeautifulSoup): Parsed HTML content
    
    Returns:
        list: List of section titles
    """
    sections = []
    
    # Find all heading tags (h2 and h3 are typically section headings)
    for heading in soup.find_all(["h2", "h3"], limit=15):  # Limit to first 15 sections
        text = heading.get_text(strip=True)
        
        # Remove edit link from heading text
        edit_link = heading.find("span", class_="mw-editsection")
        if edit_link:
            text = text.replace(edit_link.get_text(), "").strip()
        
        if text and text not in ["Contents", "See also", "References", "External links"]:
            sections.append(text)
    
    return sections


if __name__ == "__main__":
    # Test the scraper
    test_url = "https://en.wikipedia.org/wiki/Alan_Turing"
    try:
        content, title, _ = scrape_wikipedia(test_url)
        print(f"Title: {title}")
        print(f"Content length: {len(content)} characters")
        print(f"First 500 characters: {content[:500]}")
    except Exception as e:
        print(f"Error: {e}")
