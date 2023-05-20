const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const viewAllDepartments = require("./functions/viewAllDepartments");
const viewAllRoles = require("./functions/viewAllRoles");
const viewAllEmployees = require("./functions/viewAllEmployees");
const addADepartment = require("./functions/addADepartment");
const addARole = require("./functions/addARole");
const addAnEmployee = require("./functions/addAnEmployee");
const updateAnEmployeeRole = require("./functions/updateAnEmployeeRole");

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

startApp();
