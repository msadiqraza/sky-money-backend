from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time


def search_follower(username, target_username):
    print("scraper_alive")

    # Set up Chrome WebDriver
    service = Service("C:/Users/msadi/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe")
    driver = webdriver.Chrome(service=service)

    print("driver_alive")

    # Open the follower list page
    url = f"https://x.com/{username}/followers"
    driver.get(url)
    time.sleep(5)  # Wait for the page to load

    # Scroll and search for the target username
    found = False
    while True:
        followers = driver.find_elements(By.CSS_SELECTOR, "div[dir='ltr'] span span")
        for follower in followers:
            if follower.text.lower() == target_username.lower():
                found = True
                break
        if found:
            break
        # Scroll down to load more followers
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)

    driver.quit()
    return found


username = "skyecosystem"
target_username = "CurveFinance"
found = search_follower(username, target_username)
print(f"User found: {found}")
