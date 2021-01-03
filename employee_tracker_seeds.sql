DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
	department_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(75) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE role (
	role_id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(75) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES department (department_id)
);

CREATE TABLE employee (
	employee_id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id) REFERENCES role (role_id),
    FOREIGN KEY (manager_id) REFERENCES employee (employee_id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Management"), ("Warehouse"), ("Administration");

INSERT INTO role (title, salary, department_id) VALUES ("Regional Manager", 100000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Assistant to the Regional Manager", 90000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Sales", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Secretary", 70000, 4);
INSERT INTO role (title, salary, department_id) VALUES  ("Forklift Operator", 60000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("HR", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Michael", "Scott", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dwight", "Schrute", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jim", "Halpert", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pam", "Beasley", 4, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Toby", "Flenderson", 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andy", "Bernard", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Stanley", "Hudson", 3, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Roy", "Anderson", 5);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

SELECT name, title
FROM department
INNER JOIN role
ON department.department_id = role.role_id;

SELECT employee_id, first_name, last_name, name, salary, employee.role_id, role.role_id, manager_id, title, role.department_id, department.department_id
FROM employee
INNER JOIN role
ON employee.role_id = role.role_id
INNER JOIN department
ON role.department_id = department.department_id;
 
SELECT a.employee_id, CONCAT(a.first_name, ' ', a.last_name) AS Employee, CONCAT(b.first_name, ' ', b.last_name) AS Manager 
FROM employee a
INNER JOIN employee b
ON b.employee_ID = a.manager_id;