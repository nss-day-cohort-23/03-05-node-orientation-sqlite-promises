const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("company.sqlite", err => {
  if (err) return console.log("oops");

  console.log("Connected!");
  require("./create-table")()
    .then(() => {
      return populateEmployees();
    })
    .then(() => {
      getEmployeesAndDoStuff();
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
  })

};

// yuck
// const getEmployeesAndDoStuff = () => {
//   db.all(`SELECT * FROM employees`, (err, allRows) => {
//     if(err) return console.log(err, err.toString());
//     console.log('all rows', allRows);
//     allRows.sort( (a,b) => a.first.localeCompare(b.first))
//     .filter( (employee) => employee.salary > 50000)
//     .map( (emp) => `${emp.first} ${emp.last}'s salary: ${emp.salary}`)
//     .forEach( (emp) => console.log(emp));
//   });
// };

// yum
const getEmployeesAndDoStuff = () => {
  db.each(`SELECT first ||" "|| last as name, salary
    FROM employees
    WHERE salary > 50000
    ORDER BY first`
    , (err, emp) => {
    if(err) return console.log(err, err.toString());
    console.log(`${emp.name}'s salary: ${emp.salary}`);
  });
};


