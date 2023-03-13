use employees;

INSERT INTO department
    (dept)
VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Tech'),
    ('Accounting');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('HR Manager', 85000, 1),
    ('Conflict Resolver', 45000, 1),
    ('Sales Executive', 120000, 2),
    ('Commercial Rep', 65000, 2),
    ('IT Director', 160000, 3),
    ('Computer Support', 75000, 3),
    ('Account Executive', 150000, 4),
    ('Accountant', 80000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
('Tanjiro', 'Kamado', 4, NULL),
('Zenitsu', 'Agatsuma', 3, NULL),
('Inosuke', 'Hashibara', 2, NULL),
('Kanao', 'Tsuyuri', 1, NULL),
('Giyu', 'Tomioka', 2, 1),
('Shinobu', 'Kocho', 1, 2),
('Nezuko', 'Kamado', 3, 3),
('Kyojuro', 'Rengoku', 4, 1);