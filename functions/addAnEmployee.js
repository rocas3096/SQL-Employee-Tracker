function addAnEmployee() {
  const roleQuery = "SELECT title FROM roles";
  const managerQuery =
    'SELECT CONCAT(first_name, " ", last_name) AS manager FROM employees';

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

                const managerId = managerIdResults[0].id;

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
                      console.log("Employee added successfully!");
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

module.exports = addAnEmployee;
