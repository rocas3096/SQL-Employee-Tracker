const inquirer = require("inquirer");

// Function to add an employee to the database
function addAnEmployee(connection, startApp) {
  const roleQuery = "SELECT title FROM roles"; // SQL query to retrieve role titles
  const managerQuery =
    'SELECT CONCAT(first_name, " ", last_name) AS manager FROM employees'; // SQL query to retrieve manager names

  connection.query(roleQuery, (err, roleResults) => {
    if (err) {
      console.error("Error retrieving roles:", err);
      startApp();
      return;
    }

    const roleTitles = roleResults.map((role) => role.title);

    connection.query(managerQuery, (err, managerResults) => {
      if (err) {
        console.error("Error retrieving managers:", err);
        startApp();
        return;
      }

      const managers = managerResults.map((manager) => manager.manager);

      // Add the "No Manager" option to the managers array
      managers.unshift("No Manager");

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
            choices: roleTitles,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: managers,
          },
        ])
        .then((answers) => {
          const { firstName, lastName, title, manager } = answers;

          const roleIdQuery = `SELECT id FROM roles WHERE title = ?`;
          connection.query(roleIdQuery, [title], (err, roleIdResults) => {
            if (err) {
              console.error("Error retrieving role ID:", err);
              startApp();
              return;
            }

            const roleId = roleIdResults[0].id;

            // Check if "No Manager" was selected
            let managerId = null;
            if (manager !== "No Manager") {
              const managerIdQuery = `SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name) = ?`;
              connection.query(
                managerIdQuery,
                [manager],
                (err, managerIdResults) => {
                  if (err) {
                    console.error("Error retrieving manager ID:", err);
                    startApp();
                    return;
                  }

                  managerId = managerIdResults[0].id;

                  // Insert the employee with the manager
                  insertEmployee(
                    connection,
                    firstName,
                    lastName,
                    roleId,
                    managerId,
                    startApp
                  );
                }
              );
            } else {
              // Insert the employee without a manager
              insertEmployee(
                connection,
                firstName,
                lastName,
                roleId,
                managerId,
                startApp
              );
            }
          });
        })
        .catch((err) => {
          console.error("Error occurred:", err);
          startApp();
        });
    });
  });
}

// Helper function to insert an employee into the database
function insertEmployee(
  connection,
  firstName,
  lastName,
  roleId,
  managerId,
  startApp
) {
  const addEmployeeQuery = `
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(
    addEmployeeQuery,
    [firstName, lastName, roleId, managerId],
    (err, results) => {
      if (err) {
        console.error("Error adding employee:", err);
      } else {
        console.log(`Added ${firstName} ${lastName} to the database`);
      }
      startApp();
    }
  );
}

module.exports = addAnEmployee;
