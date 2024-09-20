import sys
from selenium_run import scrape_tweets

def search_keyword(strings, keyword):
    # Check if any string contains the keyword (case-insensitive)
    return any(keyword.lower() in string.lower() for string in strings)


if __name__ == "__main__":

    if len(sys.argv) > 1:
        url = sys.argv[1]  # Get the first argument after the script name
    else:
        url = "https://x.com/skyecosystem/status/1836007774893007235"  # Default URL if no argument is passed

    tweets = scrape_tweets(url, tweet_count=5)
    keyword = "Sky"

    found_strings = search_keyword(tweets, keyword)
    print("Strings containing the keyword:", found_strings)
