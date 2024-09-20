# import requests
# from bs4 import BeautifulSoup


# def scrape_tweets(username):
#     print("scraper_alive")

#     url = f"https://x.com/{username}"

#     response = requests.get(url)
#     soup = BeautifulSoup(response.text, "html.parser")

#     print("site_parsed", soup)

#     # Find all tweets on the user's page
#     tweets = soup.find_all("div", {"data-testid": "tweet"})
#     scraped_tweets = []
#     print("tweets", tweets)

#     for tweet in tweets:
#         tweet_text = tweet.find("div", {"lang": True})
#         if tweet_text:
#             scraped_tweets.append(tweet_text.text)

#     return scraped_tweets


# if __name__ == "__main__":
#     username = "elonmusk"  # Change to the desired Twitter handle
#     tweets = scrape_tweets(username)
#     for tweet in tweets:
#         print(tweet)
