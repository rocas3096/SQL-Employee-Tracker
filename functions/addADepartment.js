function addADepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the department",
      },
    ])
    .then((answers) => {
      const { departmentName } = answers;
      const query = `INSERT INTO departments (name) VALUES (?)`;
      connection.query(query, [departmentName], (err, result) => {
        if (err) {
          console.error("Error adding department:", err);
        } else {
          console.log("Department added successfully!");
        }
        startApp();
      });
    })
    .catch((err) => {
      console.error("Error occurred:", err);
      startApp();
    });
}

module.exports = addADepartment;
