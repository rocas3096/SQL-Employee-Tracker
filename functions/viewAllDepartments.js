// Function to view all departments in the database
function viewAllDepartments(connection, startApp) {
  const query = `SELECT id, name FROM departments`; // SQL query to retrieve department IDs and names
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving departments:", err); // Error handling if the department retrieval fails
    } else {
      console.table(results); // Displaying the results in a table format
    }
    startApp(); // Restart the application
  });
}

module.exports = viewAllDepartments;
