const inquirer = require("inquirer");

// Function to add an employee to the database
function addAnEmployee(connection, startApp) {
  const roleQuery = "SELECT title FROM roles"; // SQL query to retrieve role titles
  const managerQuery =
    'SELECT CONCAT(first_name, " ", last_name) AS manager FROM employees'; // SQL query to retrieve manager names

  connection.query(roleQuery, (err, roleResults) => {
    if (err) {
      console.error("Error retrieving roles:", err); // Error handling if the role retrieval fails
      startApp();
      return;
    }

    const roleTitles = roleResults.map((role) => role.title); // Extracting role titles from the query results

    connection.query(managerQuery, (err, managerResults) => {
      if (err) {
        console.error("Error retrieving managers:", err); // Error handling if the manager retrieval fails
        startApp();
        return;
      }

      const managers = managerResults.map((manager) => manager.manager); // Extracting manager names from the query results

      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "title",
            message: "What is the employee's role?",
            choices: roleTitles, // Providing the role titles as choices for the user
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: managers, // Providing the manager names as choices for the user
          },
        ])
        .then((answers) => {
          const { firstName, lastName, title, manager } = answers;

          const roleIdQuery = `SELECT id FROM roles WHERE title = ?`; // SQL query to retrieve the role ID based on the title
          connection.query(roleIdQuery, [title], (err, roleIdResults) => {
            if (err) {
              console.error("Error retrieving role ID:", err); // Error handling if the role ID retrieval fails
              startApp();
              return;
            }

            const roleId = roleIdResults[0].id; // Extracting the role ID from the query results

            const managerIdQuery = `SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name) = ?`; // SQL query to retrieve the manager ID based on the name
            connection.query(
              managerIdQuery,
              [manager],
              (err, managerIdResults) => {
                if (err) {
                  console.error("Error retrieving manager ID:", err); // Error handling if the manager ID retrieval fails
                  startApp();
                  return;
                }

                const managerId = managerIdResults[0].id; // Extracting the manager ID from the query results

                const addEmployeeQuery = `
                INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)
              `;

                connection.query(
                  addEmployeeQuery,
                  [firstName, lastName, roleId, managerId], // Providing the employee details for insertion
                  (err, results) => {
                    if (err) {
                      console.error("Error adding employee:", err); // Error handling if the employee insertion fails
                    } else {
                      console.log(
                        `Added ${firstName} ${lastName} to the database` // Success message if the employee is successfully added
                      );
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

module.exports = addAnEmployee;
