// Function to view all roles in the database with department and salary information
function viewAllRoles(connection, startApp) {
  const query = `
      SELECT r.id, r.title, d.name AS department, r.salary 
      FROM roles AS r 
      JOIN departments AS d ON r.department_id = d.id`; // SQL query to retrieve role details with department and salary information
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving roles:", err); // Error handling if the role retrieval fails
    } else {
      console.table(results); // Displaying the results in a table format
    }
    startApp(); // Restart the application
  });
}

module.exports = viewAllRoles;
