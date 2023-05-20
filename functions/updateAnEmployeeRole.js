const inquirer = require("inquirer");

// Function to update an employee's role in the database
function updateAnEmployeeRole(connection, startApp) {
  const employeeQuery = `SELECT CONCAT(first_name, " ", last_name) AS employee FROM employees`; // SQL query to retrieve employee names
  const roleQuery = "SELECT title FROM roles"; // SQL query to retrieve role titles

  connection.query(employeeQuery, (err, employeeResults) => {
    if (err) {
      console.error("Error retrieving employees:", err); // Error handling if the employee retrieval fails
      startApp();
      return;
    }

    const employees = employeeResults.map((employee) => employee.employee); // Extracting employee names from the query results

    connection.query(roleQuery, (err, roleResults) => {
      if (err) {
        console.error("Error retrieving roles:", err); // Error handling if the role retrieval fails
        startApp();
        return;
      }

      const roleTitles = roleResults.map((role) => role.title); // Extracting role titles from the query results

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update?",
            choices: employees, // Providing employee names as choices for the user
          },
          {
            type: "list",
            name: "title",
            message: "What role do you want to assign the selected employee?",
            choices: roleTitles, // Providing role titles as choices for the user
          },
        ])
        .then((answers) => {
          const { employee, title } = answers;

          const roleIdQuery = `SELECT id FROM roles WHERE title = ?`; // SQL query to retrieve the role ID based on the title
          connection.query(roleIdQuery, [title], (err, roleIdResults) => {
            if (err) {
              console.error("Error retrieving role ID:", err); // Error handling if the role ID retrieval fails
              startApp();
              return;
            }

            const roleId = roleIdResults[0].id; // Extracting the role ID from the query results

            const employeeIdQuery = `SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name) = ?`; // SQL query to retrieve the employee ID based on the name
            connection.query(
              employeeIdQuery,
              [employee],
              (err, employeeIdResults) => {
                if (err) {
                  console.error("Error retrieving employee ID:", err); // Error handling if the employee ID retrieval fails
                  startApp();
                  return;
                }

                const employeeId = employeeIdResults[0].id; // Extracting the employee ID from the query results

                const updateEmployeeQuery = `
                UPDATE employees SET role_id = ? WHERE id = ?
              `; // SQL query to update the employee's role

                connection.query(
                  updateEmployeeQuery,
                  [roleId, employeeId], // Providing the role ID and employee ID for the update
                  (err, results) => {
                    if (err) {
                      console.error("Error updating employee role:", err); // Error handling if the role update fails
                    } else {
                      console.log("Employee role updated successfully!"); // Success message if the role update is successful
                    }
                    startApp(); // Restart the application
                  }
                );
              }
            );
          });
        })
        .catch((err) => {
          console.error("Error occurred:", err); // Error handling if there is an issue with the prompt
          startApp(); // Restart the application
        });
    });
  });
}

module.exports = updateAnEmployeeRole;
