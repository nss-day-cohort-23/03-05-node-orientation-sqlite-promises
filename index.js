const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("company.sqlite", err => {
  if (err) return console.log("oops");
});

console.log("Connected!");
db.all(
  `SELECT project_name AS project, group_concat(first ||" "|| last, ", ") AS employees
  FROM employees_projects ep
  JOIN employees e ON ep.employee_id = e.id
  JOIN projects p ON ep.project_id = p.id
  GROUP BY p.id`,
  (err, stuff) => {
    if (err) return console.log(err, err.toString());
    console.log(stuff);
  }
);
