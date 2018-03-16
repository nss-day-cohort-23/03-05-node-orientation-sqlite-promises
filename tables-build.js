const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("company.sqlite", err => {
  console.log("connected, createTable");
  db.run(`DROP TABLE IF EXISTS employees`);
  db.run(`DROP TABLE IF EXISTS projects`);
  db.run(`DROP TABLE IF EXISTS employees_projects`);

  db.run(
    `CREATE TABLE IF NOT EXISTS employees (id INTEGER, first TEXT, last TEXT, salary INTEGER, department TEXT)`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS projects (id INTEGER, project_name TEXT, due_date TEXT, budget INTEGER, client_id INTEGER)`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS employees_projects (
      employee_id INTEGER NOT NULL,
      project_id  INTEGER NOT NULL,
      PRIMARY KEY(employee_id, project_id),
      FOREIGN KEY(employee_id) REFERENCES employees(id) ON DELETE CASCADE,
      FOREIGN KEY(project_id)  REFERENCES projects(id) ON DELETE CASCADE
  )`,
    () => {
      console.log("Tables made");
    }
  );
});
