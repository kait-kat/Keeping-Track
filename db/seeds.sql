use employees;

INSERT INTO department
    (name)
VALUES
    ('HR'),
    ('Marketing'),
    ('Tech'),
    ('Accounting');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('HR Manager', 85000, 1),
    ('HR', 45000, 1),
    ('Marketing Executive', 120000, 2),
    ('Commercial Rep', 65000, 2),
    ('IT Director', 160000, 3),
    ('Tech Support', 75000, 3),
    ('Account Executive', 150000, 4),
    ('Accountant', 80000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
( )
