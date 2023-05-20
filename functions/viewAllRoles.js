function viewAllRoles() {
  const query = `
      SELECT r.id, r.title, r.salary, d.name AS department 
      FROM roles AS r 
      JOIN departments AS d ON r.department_id = d.id`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving roles:", err);
    } else {
      console.table(results);
    }
    startApp();
  });
}

module.exports = viewAllRoles;
