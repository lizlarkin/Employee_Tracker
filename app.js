const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// MySQL Connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB",
  });
  connection.connect((err) => {
    if (err) throw err;
    // Start App
    startApp();
  });

// Main Inquirer Structure
const startApp = () => {
    inquirer
        .prompt({
            name: "mainOptions",
            type: "list",
            message: "Select desired action:",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "View Departments",
                "View Roles",
                "View Employees",
                "Update Employee Roles",
                "End App",
            ],
        })
        .then((response) => {
            switch (response.mainOptions) {
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "View Departments":
                    viewDepartments();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "Update Employee Roles":
                    updateRoles();
                    break;
                case "End App":
                    endApp();
                    break;
                default:
                    endApp();
                    break;
            }
        });
};


// Functions that run depending on action selected by user
const addDepartment = () => {
    inquirer
    .prompt({
      name: "newDept",
      type: "input",
      message: "Add New Department Name",
    })
    .then((userInput) => {
      console.log(userInput.newDept);
      connection.query(`INSERT INTO department (name) VALUE ("${userInput.newDept}")`, (err) => {
          if (err) throw err;
          startApp();
      }) 
    }); 
}

const addRole = () => {
    console.log("add role works");
    startApp();
}

const addEmployee = () => {
    console.log("add employee works");
    startApp();
}

const viewDepartments = () => {
    const query =
    "SELECT * FROM department"
    connection.query(query, (err, data) => {
        if (err) throw err;
        let deptData = [];
        data.forEach((item) => {
            deptData.push([item.department_id, item.name]);
        })
        console.table(['ID', 'Department'], deptData);
    startApp();
    });
};

const viewRoles = () => {
    const query =
    "SELECT * FROM role"
    connection.query(query, (err, data) => {
        if (err) throw err;
        let roleData = [];
        data.forEach((item) => {
          roleData.push([item.role_id, item.title, item.salary])
        });
        console.table(['ID', 'Title', 'Salary'], roleData);
    startApp();
    });
};

// Need to add manager
const viewEmployees = () => {
    let query = "SELECT employee_id, first_name, last_name, name, salary, employee.role_id, role.role_id, manager_id, title, role.department_id, department.department_id FROM employee INNER JOIN role ON employee.role_id = role.role_id INNER JOIN department ON role.department_id = department.department_id;"
    connection.query(query, (err, data) => {
        if (err) throw err;
        let employeeData = [];
        data.forEach((item) => {
          employeeData.push([
                item.employee_id, 
                item.first_name, 
                item.last_name,
                item.title,
                item.salary,
                item.name])
        });
        console.table(['ID', 'First Name', 'Last Name', 'Title', 'Salary', 'Department'], employeeData);
    startApp();
});
};

const updateRoles = () => {
    console.log("update roles works");
    startApp();
}

const endApp = () => {
    console.log("Goodbye");
    connection.end();
    process.exit(0);
}
