DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

-- Create the departments table
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Department ID
    name VARCHAR(30) NOT NULL -- Department name
);

-- Create the roles table
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Role ID
    title VARCHAR(30) NOT NULL, -- Role title
    department_id INT NOT NULL, -- Department ID (foreign key)
    salary DECIMAL NOT NULL, -- Salary for the role
    Foreign Key (department_id) REFERENCES departments(id) ON DELETE CASCADE -- Foreign key to link to the departments table
);

-- Create the employees table
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Employee ID
    first_name VARCHAR(30) NOT NULL, -- First name of the employee
    last_name VARCHAR(30) NOT NULL, -- Last name of the employee
    role_id INT NOT NULL, -- Role ID (foreign key)
    manager_id INT, -- Manager ID (foreign key)
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE, -- Foreign key to link to the roles table
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL -- Foreign key to link to the employees table for manager relationship (can be null)
);
