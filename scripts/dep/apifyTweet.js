const { ApifyClient } = require("apify-client");

// Initialize Apify Client
const client = new ApifyClient({
	token: "apify_api_ftfPmHT8SfOkbwMa2Yav6zYKXL10pq0VQmNj",
});

async function getTweets(username) {
    try {
		if (username.includes("@"))
			username = username.replace("@", "")
        
		console.log("actor alive", typeof username, username);

		
		const result = await client
			.actor("gentle_cloud/twitter-tweets-scraper")
			.call({
				result_count: "1",
				since_date: "2024-06-01",
				start_urls: [
					{
						url: "https://twitter.com/"+ username,
					},
				],
			});

		const { items } = await client
			.dataset(result.defaultDatasetId)
			.listItems();

		const text = items[0].full_text;
		console.dir(text);

		if (text.includes("@SkyEcosystem")) {
			return true
        }
        else
            return false
	} catch (error) {
		console.log("Error during batch processing:", error);
		return false;
	}
}

module.exports = getTweets