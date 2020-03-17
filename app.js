var mysql = require('mysql');
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

function mainLoop() {
  inquirer.prompt([
    {
    type: "list",
    name: "main",
    message: "Please choose from the selection",
    choices: [
      'View all Employees', 
      'View all Departments', 
      'View all Roles', 
      'Add Employee', 
      'Add Department', 
      'Update Employee', 
      'Quit'
      ]
    }
  ])
    .then(answers => {
      switch (answers.main) {

        case "View all Employees":
          showEmployees();
        break;

        case 'View all Departments':
          showDepartments()
        break;

        case 'View all Roles':
          showRoles();
        break;

        case 'Add Employee':
          addEmployeeInquery();
        break;

        case 'Add Department':
          addDepartmentInquery();
        break;

        case 'Update Employee':
          updateEmployeeInquery();
          // updateEmployee()
        break;

        case 'Quit':
          process.exit();
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
}

function updateEmployeeInquery() {

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

      inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the id of the employee you wish to edit: '
        }
      ]).then(answers => {
        // console.log('answers', answers);

        getEmployeeById(answers.id).then(emp => {
          // console.log('emp', emp);

          const employee = JSON.parse(JSON.stringify(emp));
          // console.log('employee', employee);

          getAllManagers().then(managers => {
            const managerList = [];
            this.managers = managers;
            this.managers.forEach(x => {
              managerList.push(`${x.first_name} ${x.last_name}`);
            });

            const managerObject = managers.find(x => x.id === employee[0].manager_id);
            const managerDefault = `${managerObject.first_name} ${managerObject.last_name}`;


            getAllRoles().then(roles => {
              const roleList = [];
              roles.forEach(x => {
                roleList.push(x.title);
              });

              const roleDefault = roles.find(x => x.id === employee[0].role_id).title;
              // console.log('employee[0]', employee[0], roleDefault, managerDefault);
              // console.log('still employee is', employee);

              inquirer.prompt([
                {
                  type: 'input',
                  name: 'first_name',
                  message: 'Enter first name',
                  default: employee[0].first_name
                },
                {
                  type: 'input',
                  name: 'last_name',
                  message: 'Enter last name',
                  default: employee[0].last_name
                },
                {
                  type: 'list',
                  name: 'role_id',
                  choices: roleList,
                  default: roleDefault //employee[0].role_id
                },
                {
                  type: 'list',
                  name: 'manager_id',
                  choices: managerList,
                  default: managerDefault //employee[0].manager_id
                },
              ]).then(answers => {
                answers.id = employee[0].id;
                // console.log('answers', answers);
                answers.role_id = roles.find(x => x.title === answers.role_id).id;
                answers.manager_id = managers.find(x => `${x.first_name} ${x.last_name}` === answers.manager_id).id;
                // console.log('answers', answers);
                updateEmployee(answers);

              });            
            });
          });
        });
      });
  });
}

 function addEmployeeInquery() {
    getAllManagers().then(managers => {
      const managerList = [];
      this.managers = managers;
      this.managers.forEach(x => {
        managerList.push(`${x.first_name} ${x.last_name}`);
      });
      getAllRoles().then(roles => {
        const roleList = [];
        roles.forEach(x => {
          roleList.push(x.title);
        });
        inquirer.prompt([
          {
            type: 'input',
            name: 'first_name',
            message: 'Enter first name'
          },
          {
            type: 'input',
            name: 'last_name',
            message: 'Enter last name'
          },
          {
            type: 'list',
            name: 'role_id',
            choices: roleList
          },
          {
            type: 'list',
            name: 'manager_id',
            choices: managerList
          },

        ]).then(answers => {
          answers.role_id = roles.find(x => x.title === answers.role_id).id;
          answers.manager_id = managers.find(x => `${x.first_name} ${x.last_name}` === answers.manager_id).id;
          addNewEmployee(answers);
        });
      });
    });
  }

  function addDepartmentInquery() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter deparment name'
      },
    ]).then(answers => {
      addNewDepartment(answers);
    });

  }

  ///////////////////////////////////////////////////////////////////

function getAllRoles() {
  return new Promise ((resolve, reject) => {
    connection.query('select * from role;', (err, res) => {
      if (err) {
        throw error;
      }
      const ret = JSON.parse(JSON.stringify(res));
      resolve(ret);
    });
  });
}

function getAllManagers() {
  return new Promise ((resolve, reject) => {
    connection.query('select * from employee;', (err, res) => {
      if (err) {
        throw error;
      }
      const ret = JSON.parse(JSON.stringify(res));
      resolve(ret);
    });
  });
}

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
      mainLoop();
  });
}

function showDepartments() {
  const query = `
  select id, name as departments from department
  `;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.table(results);
    mainLoop();
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
    mainLoop();
  });
}

function addNewDepartment(department) {
  const query = `
    insert into department (name) values ('${department.name}');
  `;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    mainLoop();
  });
}

function getEmployeeById(id) {
  return new Promise((resolve, reject) => {
    const query = `select * from employee where id = ('${id}')`;
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
    mainLoop();
  });
}

function addNewEmployee(employee) {
  const query = `
    insert into employee (first_name, last_name, role_id, manager_id) values ('${employee.first_name}', '${employee.last_name}', ${employee.role_id}, ${employee.manager_id});
  `;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    mainLoop();
  });  
}

mainLoop();

