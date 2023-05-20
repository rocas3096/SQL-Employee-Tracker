const inquirer = require("inquirer");

// Function to add a department to the database
function addADepartment(connection, startApp) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      const { departmentName } = answers;
      const query = `INSERT INTO departments (name) VALUES (?)`; // SQL query to insert the department name
      connection.query(query, [departmentName], (err, result) => {
        if (err) {
          console.error("Error adding department:", err); // Error handling if the department insertion fails
        } else {
          console.log(`Added ${departmentName} to the database`); // Success message if the department is successfully added
        }
        startApp(); // Restart the application
      });
    })
    .catch((err) => {
      console.error("Error occurred:", err); // Error handling if there is an issue with the prompt
      startApp(); // Restart the application
    });
}

module.exports = addADepartment;
