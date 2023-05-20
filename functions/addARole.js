function addARole() {
  const departmentQuery = `SELECT name FROM departments`;
  connection.query(departmentQuery, (err, departmentResults) => {
    if (err) {
      console.error("Error retrieving departments:", err);
      startApp();
      return;
    }

    const departmentNames = departmentResults.map(
      (department) => department.name
    );

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the role?",
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
          choices: departmentNames,
        },
      ])
      .then((answers) => {
        const { title, salary, department } = answers;

        const departmentIdQuery = `SELECT id FROM departments WHERE name = ?`;
        connection.query(
          departmentIdQuery,
          [department],
          (err, departmentIdResults) => {
            if (err) {
              console.error("Error retrieving department ID:", err);
              startApp();
              return;
            }

            const departmentId = departmentIdResults[0].id;

            const roleQuery = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            connection.query(
              roleQuery,
              [title, salary, departmentId],
              (err, results) => {
                if (err) {
                  console.error("Error adding role:", err);
                } else {
                  console.log("Role added successfully!");
                }
                startApp();
              }
            );
          }
        );
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        startApp();
      });
  });
}

module.exports = addARole;