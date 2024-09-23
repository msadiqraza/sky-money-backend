const {supabase} = require("./supabaseClient.js")

// Function to check if a user exists by username or wallet
const findUser = async (username, wallet) => {
	try {
		// Query the users table to find a user by username or wallet
		const { data, error } = await supabase
			.from("users")
			.select("*")
			.or(
				`username.eq.${username}, wallet.eq.${wallet}`
			);

		if (error) {
			console.error(
				"Error fetching user:",
				error.message
			);
			return false;
		}

		// Check if any users were found
		if (data.length > 0) {
			console.log("User found:", data);
			return true; // Return the first matched user
		} else {
			console.log(
				"No user found with the provided username or wallet."
			);
			return false; // No user found
		}
	} catch (error) {
		console.error("Error during user search:", error);
		return false;
	}
};

// (async () => {
//    await findUser("abc", "0x")
// })()

module.exports = {findUser}