USE employeetracker_db;

select e.first_name, e.last_name, r.title, r.salary, concat(m.first_name, ' ', m.last_name) as manager, d.`name` as department
from employee e
inner join `role` r on r.id = e.role_id
left join employee m on m.id = e.manager_id
inner join department d on d.id = r.department_id


select * from department;

select * from role;

select title, salary, d.name as department 
from role r
inner join department d on d.id = r.department_id;


insert into department (name) values ('Star Wars');

update employee set first_name, last_name, role_id, manager_id 
where id = 

select * from employee where id = 1;

