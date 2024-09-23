const express = require("express");
const { ethers, parseEther } = require("ethers");
const cors = require("cors");
const { exec } = require("child_process");

require("dotenv").config();
const { searchKeyword, scrapeTweets } = require("./modules/puppeteer.js");

const app = express();
app.use(express.json());
app.use(cors()); // Allow requests from frontend

// Developer's private key (securely stored in environment variables)
const privateKey = process.env.PRIVATE_KEY;

// Ethereum provider (Infura or Alchemy)
const provider = new ethers.getDefaultProvider(
	"sepolia",
	process.env.INFURA_PROJECT_ID
);
const wallet = new ethers.Wallet(privateKey, provider);

app.get("/", async (req, res) => {
	res.send("Hello World")
})

app.get("/tweet", async (req, res) => {
	const url =
		req.query.message ||
		"https://x.com/blackstar_defi/status/1836007774893007235"; // Default URL if no argument is passed

	console.log("url from frontend:", url);

	const tweets = await scrapeTweets(url, 5); // Scrape the top 5 tweets
	const keyword = "Sky";

	const foundStrings = searchKeyword(tweets, keyword);
	console.log("Strings containing the keyword:", foundStrings);

	res.json({ verified: foundStrings });
});

app.post("/send-eth", async (req, res) => {
	const { recipient, amount } = req.body;
	const amountInWei = parseEther(String(amount));

	try {
		// Construct the transaction
		const tx = {
			to: recipient,
			value: amountInWei.toString(),
		};

		console.log(
			"fine before txn:",
			amountInWei.toString(),
			recipient
		);

		// Send the transaction
		const transaction = await wallet.sendTransaction(tx);
		console.log("fine after txn:", transaction.hash);

		res.json({ transactionHash: transaction.hash });
	} catch (error) {
		console.error("Error sending ETH:", error);
		res.status(500).json({
			error: "Transaction failed",
			err: error,
		});
	}
});

app.listen(5000, () => {
	console.log("Server is running on port 5000");
});
