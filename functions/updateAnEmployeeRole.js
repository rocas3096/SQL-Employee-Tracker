function updateAnEmployeeRole() {
  const employeeQuery = `SELECT CONCAT(first_name, " ", last_name) AS employee FROM employees`;
  const roleQuery = "SELECT title FROM roles";

  connection.query(employeeQuery, (err, employeeResults) => {
    if (err) {
      console.error("Error retrieving employees:", err);
      startApp();
      return;
    }

    const employees = employeeResults.map((employee) => employee.employee);

    connection.query(roleQuery, (err, roleResults) => {
      if (err) {
        console.error("Error retrieving roles:", err);
        startApp();
        return;
      }

      const roleTitles = roleResults.map((role) => role.title);

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update?",
            choices: employees,
          },
          {
            type: "list",
            name: "title",
            message: "What role do you want to assign the selected employee?",
            choices: roleTitles,
          },
        ])
        .then((answers) => {
          const { employee, title } = answers;

          const roleIdQuery = `SELECT id FROM roles WHERE title = ?`;
          connection.query(roleIdQuery, [title], (err, roleIdResults) => {
            if (err) {
              console.error("Error retrieving role ID:", err);
              startApp();
              return;
            }

            const roleId = roleIdResults[0].id;

            const employeeIdQuery = `SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name) = ?`;
            connection.query(
              employeeIdQuery,
              [employee],
              (err, employeeIdResults) => {
                if (err) {
                  console.error("Error retrieving employee ID:", err);
                  startApp();
                  return;
                }

                const employeeId = employeeIdResults[0].id;

                const updateEmployeeQuery = `
                UPDATE employees SET role_id = ? WHERE id = ?
              `;

                connection.query(
                  updateEmployeeQuery,
                  [roleId, employeeId],
                  (err, results) => {
                    if (err) {
                      console.error("Error updating employee role:", err);
                    } else {
                      console.log("Employee role updated successfully!");
                    }
                    startApp();
                  }
                );
              }
            );
          });
        })
        .catch((err) => {
          console.error("Error occurred:", err);
          startApp();
        });
    });
  });
}

module.exports = updateAnEmployeeRole;
