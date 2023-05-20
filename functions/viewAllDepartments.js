function viewAllDepartments() {
  const query = `SELECT id, name FROM departments`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving departments:", err);
    } else {
      console.table(results);
    }
    startApp();
  });
}

module.exports = viewAllDepartments;
