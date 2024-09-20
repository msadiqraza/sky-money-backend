const fs = require("fs");

 function saveToJsonFile(filename, newObject) {
	// Check if the file exists
	if (fs.existsSync(filename)) {
		// File exists, read the content

		// Write the updated array back to the file
		const jsonString = JSON.stringify(newObject, null, 2);

		fs.writeFile(filename, jsonString, (err) => {
			if (err) {
				console.error(
					"Error writing to file:",
					err
				);
			} else {
				console.log(
					"New object added to existing JSON file."
				);
			}
		});
	} else {
		// File doesn't exist, create a new one
		const jsonArray = [newObject]; // Initialize array with the new object
		const jsonString = JSON.stringify(jsonArray, null, 2);

		fs.writeFile(filename, jsonString, (err) => {
			if (err) {
				console.error(
					"Error writing to file:",
					err
				);
			} else {
				console.log(
					"JSON file created and object added."
				);
			}
		});
	}
}

module.exports = saveToJsonFile;
