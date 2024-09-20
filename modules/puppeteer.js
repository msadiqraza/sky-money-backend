const puppeteer = require("puppeteer");

// Function to initialize the Puppeteer browser
async function initBrowser() {
	const browser = await puppeteer.launch({
		headless: true, // Run in headless mode
		args: ["--start-maximized"],
	});

	const page = await browser.newPage();
	await page.setViewport({ width: 1366, height: 768 });
	return { browser, page };
}

// Function to scrape tweets from a given URL
async function scrapeTweets(url, tweetCount = 5) {
	const { browser, page } = await initBrowser();
	await page.goto(url, { waitUntil: "networkidle2" });

	// Wait for the page to load
	await new Promise((resolve) => setTimeout(resolve, 10000));

	// Scroll down to load more tweets
	for (let i = 0; i < 10; i++) {
		await page.keyboard.press("PageDown");
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}

	// Select all tweet elements using the data-testid attribute
	const tweets = await page.$$('[data-testid="tweet"]');

	// Collect tweet text (limiting to the provided tweet count)
	const scrapedTweets = [];
	for (let i = 0; i < Math.min(tweets.length, tweetCount); i++) {
		const tweetText = await tweets[i].evaluate(
			(el) => el.innerText
		);
		scrapedTweets.push(tweetText);
	}

	await browser.close();
	return scrapedTweets;
}

// Function to search for a keyword in an array of strings
function searchKeyword(strings, keyword) {
	return strings.some((string) =>
		string.toLowerCase().includes(keyword.toLowerCase())
	);
}

module.exports = {scrapeTweets, searchKeyword}