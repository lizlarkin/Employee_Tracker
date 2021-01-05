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
      console.log(`Added ${userInput.newDept} Department!`);
      connection.query(`INSERT INTO department (name) VALUE ("${userInput.newDept}")`, (err) => {
          if (err) throw err;
          startApp();
      }) 
    }); 
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Need to add escape

const addRole = () => {
    
    // Get department list for use in department choices inquiry
    let deptList = [];

    const query =
    "SELECT * FROM department"
    connection.query(query, (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            deptList.push(data[i].department_id + " " + data[i].name); }
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
        {
        name: "deptAdd",
        type: "list",
        message: "Select Department to add Role to",
        choices: deptList,
        }
    ])
    .then((userInput) => {
      console.log(`Added ${userInput.newRole} Role!`);
      let deptID = userInput.deptAdd[0];
      connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${userInput.newRole}","${userInput.newSalary}", "${deptID}")`, (err) => {
          if (err) throw err;
          startApp();
      }) 
    }); 
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Need to add escape

const addEmployee = () => {
    
    // Get role list for use in title choices inquiry
    let roleList = [];

    const queryA =
    "SELECT * FROM role"
    connection.query(queryA, (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            roleList.push(data[i].role_id + " " + data[i].title); }
        });

    // Get employee list for use in manager choices inquiry
    let employeeList = [];

    const queryB =
    "SELECT * FROM employee"
    connection.query(queryB, (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            employeeList.push(data[i].employee_id + " " + data[i].first_name + " " + data[i].last_name); }
        });

    // Gather User Data
    inquirer
    .prompt([
        {
        name: "newFirst",
        type: "input",
        message: "Add New First Name",
        },
        {
        name: "newLast",
        type: "input",
        message: "Add New Last Name",
        },
        {
        name: "roleAdd",
        type: "list",
        message: "Select Employee Title",
        choices: roleList,
        }, 
        {
        name: "addManager",
        type: "confirm",
        message: "Add Manager?",
        },
        {
        name: "managerName",
        type: "list",
        message: "Select Manager",
        choices: employeeList,
        when: (response) => response.addManager === true,
        }, 
    ])
    .then((userInput) => {
      console.log(`Added ${userInput.newFirst} ${userInput.newLast}!`);
      let roleID = userInput.roleAdd[0];
      console.log(roleID);
      let managerID = userInput.managerName[0];
      console.log(managerID);
      connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${userInput.newFirst}","${userInput.newLast}", "${roleID}", "${managerID}")`, (err) => {
          if (err) throw err;
    startApp();
      }) 
    }); 
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Need to add escape

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
