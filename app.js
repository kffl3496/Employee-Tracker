var mysql      = require('mysql');
const cTable = require('console.table');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'employeetracker_db',
  port: 3306
});
 
connection.connect();

// addNewDepartment('Star Wars'); // don't call again or it will add another record

// this is a promise because it gets data back from the database
// const promise = getEmployeeById(1);
// promise.then((data) => {
//   console.log('data', data);
// });


// const employee = {
//   first_name: 'Dianna',
//   last_name: 'Troy',
//   role_id: 4,
//   manager_id: 2
// }

// addNewEmployee(employee);

// const promise1 = getEmployeeById(8);
// promise1.then((data) => {
//   const employee = JSON.parse(JSON.stringify(data[0]));
//   console.log('employee', employee);
//   employee.first_name = 'Wesley';
//   console.log('wes', employee);
//   updateEmployee(employee)
//   showEmployees();
// });

// showDepartments();
// showEmployees();
// showRoles();
 
// connection.end();

inquirer.prompt([
    {
    type: "list",
    name: "main",
    message: "Please choose from the selection",
    choices: ['View all Employees', 'View all Departments', 
        'View all Roles', 'Add Employee', 'Add Department', 
        'Get Employee (by id)', 'Update Employee']
    }
  ])
    .then(answers => {
      switch (answers.main) {

        case "View all Employees":
        showEmployees()
        break;

        case 'View all Departments':
        showDepartments()
        break;

        case 'View all Roles':
        showRoles()
        break;

        case 'Add Employee':
        addNewEmployee()
        break;

        case 'Add Department':
        addNewDepartment()
        break;

        case 'Get Employee (by id)':
        getEmployeeById()
        break;

        case 'Update Employee':
        updateEmployee()
        break;
      }
  })
    .catch(error => {
      if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });

  ///////////////////////////////////////////////////////////////////

function showEmployees() {
  const query = `
  select e.id, e.first_name, e.last_name, r.title, r.salary, concat(m.first_name, ' ', m.last_name) as manager, d.name as department
  from employee e
  inner join role r on r.id = e.role_id
  left join employee m on m.id = e.manager_id
  inner join department d on d.id = r.department_id
  `;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.table(results);

  });
}

function showDepartments() {
  const query = `
  select id, name as departments from department
  `;
    
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.table(results);
  });
}

function showRoles() {
  const query = `
  select r.id, title, salary, d.name as department 
  from role r
  inner join department d on d.id = r.department_id
  `;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.table(results);
  });
}

function addNewDepartment(departmentName) {
  const query = `
    insert into department (name) values ('${departmentName}');
  `;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.table(results);
  });
}

function getEmployeeById(id) {
  return new Promise((resolve, reject) => {
    const query = `
      select * from employee where id = '${id}'
    `;
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      resolve(results);
    });
  });
}

function updateEmployee(employee) {
  const query = `
    update employee set first_name = '${employee.first_name}', last_name = '${employee.last_name}', role_id = ${employee.role_id}, manager_id = ${employee.manager_id} where id = ${employee.id}
  `;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
  });
}

function addNewEmployee(employee) {
  const query = `
    insert into employee (first_name, last_name, role_id, manager_id) values ('${employee.first_name}', '${employee.last_name}', ${employee.role_id}, ${employee.manager_id});
  `;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
  });  
}



