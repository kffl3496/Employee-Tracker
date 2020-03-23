DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE department (
	id mediumint not null auto_increment,
    primary key (id),
--     id INT PRIMARY KEY
	name VARCHAR(30) NOT NULL
);

CREATE TABLE `role` (
	id mediumint not null auto_increment,
    primary key (id),
	title VARCHAR(30) NOT NULL,
    salary DECIMAL(11) NOT NULL,
    department_id INT NOT NULL
    -- id INT PRIMARY KEY
);

CREATE TABLE employee (
	id mediumint not null auto_increment,
    primary key (id),
	first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL
--     id INT PRIMARY KEY
);


-- select * from department;
-- select * from employee;

insert into department (name) values ('Star Trek'); 

insert into role (title, salary, department_id) values ('Captain', 100000, 1);
insert into role (title, salary, department_id) values ('Commander', 90000, 1);
insert into role (title, salary, department_id) values ('Lt. Commander', 80000, 1);
insert into role (title, salary, department_id) values ('Lieutenant', 70000, 1);
insert into role (title, salary, department_id) values ('Ensign', 20000, 1);

insert into employee (first_name, last_name, role_id, manager_id) values ('James', 'Kirk', 1, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Jean-Luc', 'Picard', 1, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Spock', 'Spock', 2, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('William', 'Riker', 2, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Leonard', 'McCoy', 2, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Data', 'Data', 3, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Worf', 'Worf', 4, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Wesley', 'Crusher', 5, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Pavlov', 'Checkov', 5, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Hikaru', 'Sulu', 4, null);


-- Run these after you run the top part to rebuild

update employee set manager_id = 1 
where (id = 3 or id = 5 or id = 9 or id = 10);

update employee set manager_id = 2 
where (id = 4);

update employee set manager_id = 4
where (id = 6 or id = 7 or id = 8);