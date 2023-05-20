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

module.exports = viewAllEmployees;