const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employees_db",
});

function startApp() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      const { action } = answers;

      switch (action) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addADepartment();
          break;
        case "Add a role":
          addARole();
          break;
        case "Add an employee":
          addAnEmployee();
          break;
        case "Update an employee role":
          updateAnEmployeeRole();
          break;
        case "Exit":
          console.log("Exiting the application");
          connection.end();
          break;
      }
    })
    .catch((err) => {
      console.error("Error occurred:", err);
      connection.end(); // Close the database connection in case of an error
    });
}

function viewAllDepartments() {
  const query = `SELECT id, name FROM departments`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving departments:", err);
    } else {
      console.table(results);
    }
    startApp();
  });
}

function viewAllRoles() {
  const query = `
    SELECT r.id, r.title, r.salary, d.name AS department 
    FROM roles AS r 
    JOIN departments AS d ON r.department_id = d.id`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving roles:", err);
    } else {
      console.table(results);
    }
    startApp();
  });
}

function viewAllEmployees() {
  const query = `
    SELECT 
    e.id, 
    e.first_name, 
    e.last_name, 
    r.title, 
    d.name AS department, 
    r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees AS e
    JOIN roles AS r ON e.role_id = r.id
    JOIN departments AS d ON r.department_id = d.id
    LEFT JOIN employees AS m ON e.manager_id = m.id`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving employees:", err);
    } else {
      console.table(results);
    }
    startApp();
  });
}

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
