// Function to view all employees in the database with additional information
function viewAllEmployees(connection, startApp) {
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
      LEFT JOIN employees AS m ON e.manager_id = m.id`; // SQL query to retrieve employee details with role, department, salary, and manager information
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving employees:", err); // Error handling if the employee retrieval fails
    } else {
      console.table(results); // Displaying the results in a table format
    }
    startApp(); // Restart the application
  });
}

module.exports = viewAllEmployees;
