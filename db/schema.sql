DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

--Creates the departments table
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

--Creates the roles table
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    salary DECIMAL NOT NULL,
    Foreign Key (department_id) -- Define a foreign key constraint on the department_id column
    REFERENCES departments(id) -- Reference the id column of the departments table
    ON DELETE CASCADE -- Specify that if a department is deleted, all associated roles should be deleted as well
);


--Creates the employees table
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, -- Foreign key referencing the role of the employee
    manager_id INT, -- Foreign key referencing the manager of the employee
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE, -- Define a foreign key constraint on the role_id column referencing the id column of the roles table
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL -- Define a foreign key constraint on the manager_id column referencing the id column of the employees table, and set the manager_id to NULL if the manager is deleted
);