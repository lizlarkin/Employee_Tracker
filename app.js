const inquirer = require("inquirer");
const mysql = require("mysql");

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
                    connection.end();
                    process.exit(1);
                    break;
            }
        });
};



// Functions that run depending on action selected by user
const addDepartment = () => {
    console.log("add department works");
    startApp();
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
    console.log("view departments works");
    startApp();
}

const viewRoles = () => {
    console.log("view roles works");
    startApp();
}

const viewEmployees = () => {
    console.log("view employees works");
    startApp();
}

const updateRoles = () => {
    console.log("update roles works");
    startApp();
}

const endApp = () => {
    console.log("Goodbye");
}
