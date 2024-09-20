const express = require("express");
const { ethers, parseEther } = require("ethers");
const cors = require("cors");
const { exec } = require("child_process");

require("dotenv").config();

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

app.get("/tweet", async (req, res) => {
	const scriptPath = "scripts/python/tweet_lookup/find_keyword.py";
	const url = req.query.message || "https://x.com/blackstar_defi/status/1836007774893007235"; // Default URL if no argument is passed
	
	console.log("url from reactjs:", url)
	
	exec(`python ${scriptPath} "${url}"`, (error, stdout, stderr) => {
		if (error) {
			console.error(
				`Error executing Python script: ${error.message}`
			);
			return;
		}
		if (stderr) {
			console.error(`Python stderr: ${stderr}`);
			return;
		}
		let boolValue = false
		if (stdout.includes("True"))
			boolValue=true

		console.log(`Boolean value from Python: ${typeof stdout} ${boolValue}`);
		res.json({ verified: boolValue });
	});
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
