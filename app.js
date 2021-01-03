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
      console.log(`${userInput.newDept} added`);
      connection.query(`INSERT INTO department (name) VALUE ("${userInput.newDept}")`, (err) => {
          if (err) throw err;
          startApp();
      }) 
    }); 
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Need to add escape

const addRole = () => {
    
    // Get department list
    const query =
    "SELECT * FROM department"
    connection.query(query, (err, data) => {
        if (err) throw err;
        let deptList = [];
        data.forEach((item) => {
            deptList.push([item.department_id, item.name]);
        });console.log(deptList);
    });


    // Gather User Data
    inquirer
    .prompt([
        {
        name: "newRole",
        type: "input",
        message: "Add New Title",
        },
        {
        name: "newSalary",
        type: "input",
        message: "Add New Salary",
        },
        // {
        // name: "deptAdd",
        // type: "list",
        // message: "Select Department to add Role to",
        // choices: [deptList]
        // }
    ])
    .then((userInput) => {
      console.log(userInput.newRole);
      console.log(userInput.newSalary);
    //   console.log(userInput.deptAdd);
    //   connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${userInput.newRole}","${userInput.newSalary}", "${userInput.deptID}")`, (err) => {
    //       if (err) throw err;
    //       startApp();
    //   }) 
    }); 
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

const viewEmployees = () => {
    let query =
    "SELECT a.employee_id, a.role_id, role.title, role.salary, role.role_id, department.name, department.department_id, CONCAT(a.first_name, ' ', a.last_name) AS Employee, CONCAT(b.first_name, ' ', b.last_name) AS Manager ";
    query += "FROM employee a "
    query += "LEFT JOIN role "
    query += "ON a.role_id = role.role_id "
    query += "LEFT JOIN department "
    query += "ON role.department_id = department.department_id "
    query += "LEFT JOIN employee b "
    query += "ON b.employee_ID = a.manager_id;"
    connection.query(query, (err, data) => {
        if (err) throw err;
        let employeeData = [];
        data.forEach((item) => {
          employeeData.push([
                item.employee_id, 
                item.Employee, 
                item.title,
                item.salary,
                item.Manager,
                item.name])
        });
        console.table(['ID', 'Name', 'Title', 'Salary', 'Manager', 'Department'], employeeData);
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
