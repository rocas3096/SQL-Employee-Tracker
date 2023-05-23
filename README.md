# SQL Employee Tracker

## Description

SQL Employee Tracker is a command-line application that allows users to manage and track employee information using a SQL database. The application utilizes inquirer and SQL to provide a user-friendly interface for creating and modifying databases. By using prompts for user input, this project enables the creation of tables, insertion and deletion of table data, handling different data types, schema and seed files for database population, and establishing foreign relationships between tables.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributions](#contributions)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To deploy this code locally, follow these steps:
1. Clone the repository by visiting the GitHub repository (provide link) and copying the repository's link.
2. Open Git Bash and navigate to the desired directory where you want to clone the code.
3. Type `git clone` followed by the copied link and press Enter.
4. Navigate into the cloned directory.
5. Install the required dependencies by typing `npm install` in the terminal.
6. Create the database by running the provided schema file. In the terminal, enter the following command: `mysql -u your_username -p < db/schema.sql` (replace `your_username` with your MySQL username).
7. Populate the database with sample data by running the provided seeds file. In the terminal, enter the following command: `mysql -u your_username -p < db/seeds.sql` (replace `your_username` with your MySQL username).
8. Start the application by running `node index.js` in the terminal.

## Usage

Upon starting the application, users are presented with various options to choose from. These options include:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role

When selecting the "View all departments" option, a formatted table is displayed, presenting the department names and corresponding IDs. Similarly, choosing the "View all roles" option presents a table with details such as job titles, role IDs, associated departments, and salaries. Opting to view all employees results in a formatted table containing employee data including IDs, first names, last names, job titles, departments, salaries, and their respective managers.

To add a department, users are prompted to enter the department's name, which is then added to the database. Similarly, adding a role involves providing the role's name, salary, and department, which are subsequently added to the database. When adding an employee, users are prompted to enter the employee's first name, last name, role, and manager. Once the information is submitted, the employee is added to the database.

If users choose to update an employee's role, they are prompted to select the employee to update and provide the new role. The employee's role is then updated accordingly in the database.

A demo video is available to demonstrate the functionality:

[![Demo of Note taker demonstrating functionality](https://drive.google.com/thumbnail?id=1gKnWbwgsXT-7bdLU4NTTJRe1l0NdwhpQ)](https://drive.google.com/uc?id=1gKnWbwgsXT-7bdLU4NTTJRe1l0NdwhpQ)

## License

This project does not have any specific license.

## Contributions

Contributions to this project are welcome. To contribute, please follow these steps:

1. Follow the installation instructions to set up the project locally.
2. Create a feature branch with your name as the branch name.
3. Implement your desired changes in the feature branch.
4. Commit your changes and push the branch to the remote repository.
5. Submit a pull request, and your changes will be reviewed for merging into the main branch.

## Tests

No tests have been deployed for this project at this time.

## Questions

If you have any questions or need further assistance, feel free to reach out:

- GitHub Profile: [Oscar Zavala](https://github.com/rocas3096)
- GitHub Username: rocas3096
- Email: ozavala3096@gmail.com
