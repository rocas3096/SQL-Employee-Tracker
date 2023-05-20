const inquirer = require("inquirer");

// Function to add a role to the database
function addARole(connection, startApp) {
  const departmentQuery = `SELECT name FROM departments`; // SQL query to retrieve department names
  connection.query(departmentQuery, (err, departmentResults) => {
    if (err) {
      console.error("Error retrieving departments:", err); // Error handling if the department retrieval fails
      startApp();
      return;
    }

    const departmentNames = departmentResults.map(
      (department) => department.name
    ); // Extracting department names from the query results

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department",
          message: "What department does the role belong to?",
          choices: departmentNames, // Providing department names as choices for the user
        },
      ])
      .then((answers) => {
        const { title, salary, department } = answers;

        const departmentIdQuery = `SELECT id FROM departments WHERE name = ?`; // SQL query to retrieve the department ID based on the name
        connection.query(
          departmentIdQuery,
          [department],
          (err, departmentIdResults) => {
            if (err) {
              console.error("Error retrieving department ID:", err); // Error handling if the department ID retrieval fails
              startApp();
              return;
            }

            const departmentId = departmentIdResults[0].id; // Extracting the department ID from the query results

            const roleQuery = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            connection.query(
              roleQuery,
              [title, salary, departmentId], // Providing the role details for insertion
              (err, results) => {
                if (err) {
                  console.error("Error adding role:", err); // Error handling if the role insertion fails
                } else {
                  console.log(`Added ${title} to the database`); // Success message if the role is successfully added
                }
                startApp(); // Restart the application
              }
            );
          }
        );
      })
      .catch((err) => {
        console.error("Error occurred:", err); // Error handling if there is an issue with the prompt
        startApp(); // Restart the application
      });
  });
}

module.exports = addARole;
