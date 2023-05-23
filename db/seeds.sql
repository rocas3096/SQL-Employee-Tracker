-- Insert sample data into the department table
INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('Marketing');
INSERT INTO departments (name) VALUES ('Engineering');
INSERT INTO departments (name) VALUES ('Finance');
INSERT INTO departments (name) VALUES ('Legal');

-- Insert sample data into the role table
INSERT INTO roles (title, department_id, salary) VALUES ('Sales Lead', 1, 80000);
INSERT INTO roles (title, department_id, salary) VALUES ('Salesperson', 1, 150000);
INSERT INTO roles (title, department_id, salary) VALUES ('Lead Engineer', 3, 120000);
INSERT INTO roles (title, department_id, salary) VALUES ('Software Engineer', 3, 160000);
INSERT INTO roles (title, department_id, salary) VALUES ('Account Manager', 4, 125000);
INSERT INTO roles (title, department_id, salary) VALUES ('Accountant', 4, 250000);
INSERT INTO roles (title, department_id, salary) VALUES ('Legal Team Lead', 5, 190000);
INSERT INTO roles (title, department_id, salary) VALUES ('Lawyer', 5, 100000);

-- Insert sample data into the employee table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Mike', 'Chan', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Ashley', 'Rodriguez', 3, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Kevin', 'Tupik', 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Kunal', 'Singh', 5, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Malia', 'Brown', 6, 5);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Lourd', 7, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Tom', 'Allen', 8, 7);
