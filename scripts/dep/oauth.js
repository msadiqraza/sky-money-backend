const axios = require("axios");
const qs = require("qs"); // to format URL-encoded data

require('dotenv').config()

// Replace with your app's API key and secret
const apiKey = process.env.TWITTER_API_KEY;
const apiSecretKey = process.env.TWITTER_API_KEY_SECRET;

// Twitter's OAuth2 token URL
const tokenUrl = "https://api.twitter.com/oauth2/token";

// Base64 encode the client credentials (apiKey:apiSecretKey)
const credentials = Buffer.from(`${apiKey}:${apiSecretKey}`).toString("base64");

// Function to get bearer token
const getBearerToken = async ()=> {
	const data = qs.stringify({ grant_type: "client_credentials" });

	try {
		const response = await axios.post(tokenUrl, data, {
			headers: {
				Authorization: `Basic ${credentials}`,
				"Content-Type":
					"application/x-www-form-urlencoded;charset=UTF-8",
			},
		});

		// The bearer token is in response.data.access_token
		console.log(
			"Bearer Token:",
			typeof response.data.access_token,
			response.data.access_token
        );
        
        return response.data.access_token;
	} catch (error) {
		console.error(
			"Error getting bearer token:",
			error.response.data
		);
	}
}

// Call the function to get the token
module.exports = { getBearerToken };
