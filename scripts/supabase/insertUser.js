const { supabase } = require("./supabaseClient.js");

async function insertUser(username, wallet) {
	const { data, error } = await supabase
		.from("users") // Table name
		.insert([
			{ username: username, wallet: wallet }, // Data to insert
		])
		.select();

	if (error) {
		console.error("Error inserting data:", error.message);
	} else {
		console.log("Data inserted successfully:", data);
		return true
	}
}

// // Example usage
// (async () => {
// 	await insertUser(
// 		"blackstar_defi",
// 		"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
// 	);
// })();

module.exports = {insertUser}