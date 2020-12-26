DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(75) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(75) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
	employeeID INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT,
    roleID INT DEFAULT '' NOT NULL,
    PRIMARY KEY (employeeID),
    FOREIGN KEY (roleID) REFERENCES role (roleID),
    FOREIGN KEY (manager_id) REFERENCES employee (employeeID)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Management"), ("Warehouse"), ("HR");

INSERT INTO role (title, salary) VALUES ("Regional Manager", 100000);
INSERT INTO role (title, salary) VALUES ("Assistant to the Regional Manager", 90000);
INSERT INTO role (title, salary) VALUES ("Sales", 80000);
INSERT INTO role (title, salary) VALUES ("Secretary", 70000);
INSERT INTO role (title, salary) VALUES  ("Forklift Operator", 60000);
INSERT INTO role (title, salary) VALUES ("HR", 80000);

INSERT INTO employee (first_name, last_name) VALUES ("Michael", "Scott");
INSERT INTO employee (first_name, last_name) VALUES ("Dwight", "Schrute");
INSERT INTO employee (first_name, last_name) VALUES ("Jim", "Halpert");
INSERT INTO employee (first_name, last_name) VALUES ("Pam", "Beasley");
INSERT INTO employee (first_name, last_name) VALUES ("Toby", "Flenderson");
INSERT INTO employee (first_name, last_name) VALUES ("Andy", "Bernard");
INSERT INTO employee (first_name, last_name) VALUES ("Stanley", "Hudson");
INSERT INTO employee (first_name, last_name) VALUES ("Roy", "Anderson");

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;