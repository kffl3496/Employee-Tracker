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
where (id = 3 or id = 5 or id = 9 or id = 10)

update employee set manager_id = 2 
where (id = 4)

update employee set manager_id = 4
where (id = 6 or id = 7 or id = 8)




-- insert into department (id, name) values (0, 'Level1'); 
-- insert into department (id, name) values (1, 'Level2'); 
-- insert into department (id, name) values (2, 'Level3'); 

-- insert into department (id, name) values (3, 'Level4'); 
-- insert into department (id, name) values (4, 'Level5'); 
-- insert into department (id, name) values (5, 'Level6'); 

-- insert into role (id, title, salary, department_id) values (0, 'Captain', 100000, 0);
-- insert into role (id, title, salary, department_id) values (1, 'Commander', 90000, 1);
-- insert into role (id, title, salary, department_id) values (2, 'Lt. Commander', 80000, 2);
-- insert into role (id, title, salary, department_id) values (3, 'Lieutenant', 70000, 3);
-- insert into role (id, title, salary, department_id) values (4, 'Ensign', 20000, 4);

-- insert into employee (id, first_name, last_name, role_id, manager_id) values (0, 'James', 'Kirk', 0, null);
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (1, 'Jean-Luc', 'Picard', 0, null);
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (2, 'Spock', 'Spock', 1, 0);
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (3, 'William', 'Riker', 1, 1);
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (4, 'Leonard', 'McCoy', 1, 0);
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (5, 'Data', 'Data', 2, 3);
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (6, 'Worf', 'Worf', 3, 3);
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (7, 'Wesley', 'Crusher', 4, 3);
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (8, 'Pavlov', 'Checkov', 4, 0);
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (9, 'Hikaru', 'Sulu', 3, 0);



