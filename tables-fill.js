const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("company.sqlite", err => {
  if (err) return console.log("oops");

  populateEmployees().then(() => {
    populateProjects().then(() => {
      return populateJoinTable();
    });
  })
  .then(() => {
    console.log("Tables populated");
  });
});

const populateEmployees = () => {
  const { list } = require("./employees.json");
  return new Promise((resolve, reject) => {
    list.forEach(({ id, firstName, lastName, salary, dept }) => {
      db.run(
        `INSERT INTO employees
        VALUES (${id}, "${firstName}", "${lastName}", ${salary}, "${dept}")`
      );
    });
    resolve();
  });
};

const populateProjects = () => {
  const { projects } = require("./projects.json");
  return new Promise((resolve, reject) => {
    projects.forEach(({ id, proj_name, due_date, budget, client_id }) => {
      db.run(
        `INSERT INTO projects
        VALUES (${id}, "${proj_name}", "${due_date}", ${budget}, "${client_id}")`
      );
    });
    resolve();
  });
};

const populateJoinTable = () => {
  const { emprojects } = require("./emp_proj.json");
  return new Promise((resolve, reject) => {
    emprojects.forEach(({ employee_id, project_id }) => {
      db.run(
        `INSERT INTO employees_projects
        VALUES (${employee_id}, ${project_id})`
      );
    });
    resolve();
  });
};
