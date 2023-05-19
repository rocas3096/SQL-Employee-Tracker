-- Insert sample data into the department table
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Engineering');

-- Insert sample data into the role table
INSERT INTO role (title, salary, department_id) VALUES ('Sales Representative', 5000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Coordinator', 4000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 6000, 3);

-- Insert sample data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Johnson', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Alice', 'Williams', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Charlie', 'Brown', 2, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Eva', 'Davis', 3, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Frank', 'Wilson', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Grace', 'Anderson', 2, 7);