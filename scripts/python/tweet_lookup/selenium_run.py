from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
import time


# Set up ChromeDriver
def init_driver():
    # Provide the path to your ChromeDriver if it's not in your system's PATH
    service = Service("C:/Users/msadi/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe")
    options = webdriver.ChromeOptions()
    # Optional: Run in headless mode (browser UI won't be displayed)
    # options.add_argument("--headless")
    driver = webdriver.Chrome(service=service, options=options)
    # print("driver,", driver)

    return driver


# Function to scrape tweets from a user's profile
def scrape_tweets(url, tweet_count=10):
    # print("scraper alive")

    driver = init_driver()

    # print("driver_completed")

    # Navigate to the Twitter user's page

    driver.get(url)
    time.sleep(10)  # Wait for the page to load

    # Scroll to load more tweets
    body = driver.find_element(By.TAG_NAME, "body")
    for _ in range(10):  # Adjust based on how many tweets you want
        body.send_keys(Keys.PAGE_DOWN)
        time.sleep(2)

    # Locate the tweets
    tweets = driver.find_elements(By.CSS_SELECTOR, '[data-testid="tweet"]')

    # Collect tweet text
    scraped_tweets = []
    for tweet in tweets[:tweet_count]:
        # print("tweet:" , tweet)
        scraped_tweets.append(tweet.text)

    driver.quit()

    return scraped_tweets

