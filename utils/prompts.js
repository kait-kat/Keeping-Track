
const connection = require('../db/connection.js');
const inquirer = require('inquirer'); 


viewDepartments = () => {
    const { init } = require('../server');
    connection.promise().query('SELECT * FROM department ORDER BY id ASC')
        .then(([rows, fields]) => {
            console.table(rows);
            init();
        })
        .catch(console.log)
};


viewRoles = () => {
    const { init } = require('../server');
    connection.promise().query('SELECT role.id AS ID,title AS Title,department.name AS Department,salary AS Salary FROM role INNER JOIN department ON department.id = department_id ORDER BY id ASC;')
        .then(([rows, fields]) => {
            console.table(rows);
            init();
        })
        .catch(console.log)
};


viewEmployees = () => {
    const { init } = require('../server');
    connection.promise().query('SELECT e.id,e.first_name,e.last_name,title AS Role,department.name AS Department,salary AS Salary,CONCAT(m.first_name,m.last_name) Manager FROM employee e LEFT JOIN employee m ON (m.id = e.manager_id) INNER JOIN role ON role.id = e.role_id INNER JOIN department ON department.id = department_id ORDER BY e.id;')
        .then(([rows, fields]) => {
            console.table(rows);
            init();
        })
        .catch(console.log)
};

addDepartment = () => {
    const { init } = require('../server');
    inquirer;
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department_info',
            message: 'Provide department name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please input a department name');
                    return false;
                }
            },
        }
    ])
        .then(deptName => {
            connection.promise().query('INSERT INTO department SET ?', { "name": deptName.department_info })
                .then(([rows, fields]) => {
                    console.log(rows.affectedRows + ' department added!\n');
                    init();
                })
                .catch(err => {
                    console.log(err.code);

                })
        });

};



addRole = () => {
    const { init } = require('../server');
    let arrayRes = [];
    var resId;


    connection.query('SELECT name FROM department', function (err, res) {
        if (err) throw err;
        res.forEach(element => arrayRes.push(element.name))
    });
    inquirer;
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Provide role name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please input a role name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Provide salary',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please input a salary');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does this role belong to',
            choices: arrayRes
        }

    ])
        .then(dept => {
            connection.promise().query('SELECT id FROM department WHERE ?', { name: dept.department })
                .then(([rows, fields]) => {
                    resId = rows[0].id;
                    return (resId)
                })
                .catch(err => {
                    console.log(err);

                })
                .then((Id) => {
                    connection.promise().query('INSERT INTO role SET ?', { "title": dept.title, "salary": dept.salary, "department_id": Id })
                        .then(([rows, fields]) => {
                            console.log(rows.affectedRows + ' role added !\n');
                            init();
                        })
                        .catch(err => {
                            console.log(err);

                        })
                })

        });

};


addEmployee = () => {
    const { init } = require('../server');
    let arrayFirst = [];
    let arrayLast = [];
    let arrayRole = [];
    let arrayCombined = [];
    var roleID;
    var managerID;

    connection.query('SELECT first_name,last_name FROM employee', function (err, res) {
        if (err) throw err;
        res.forEach(element => arrayFirst.push(element.first_name));
        res.forEach(element => arrayLast.push(element.last_name));
        res.forEach(element => arrayCombined.push(element.first_name + ' ' + element.last_name));
        arrayCombined.push('No Manager');
    });
    connection.query('SELECT title FROM role', function (err, res) {
        if (err) throw err;
        res.forEach(element => arrayRole.push(element.title))
    });

    inquirer;
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter first name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter first name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter last name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter last name');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: 'Employee role',
            choices: arrayRole
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Employee Manager',
            choices: arrayCombined
        }

    ])
        .then(choice => {
            connection.promise().query('SELECT id FROM role WHERE ?', { "title": choice.role })
                .then(([rows, fields]) => {
                    roleID = rows[0].id;
                    return (roleID);
                })
                .catch(err => {
                    console.log(err);

                })

                .then((id) => {

                    let choiceNew = choice.manager;
                    let choiceNewArray = choiceNew.split(' ');
                    connection.promise().query('SELECT id FROM employee WHERE first_name = ? AND last_name = ?', [choiceNewArray[0], choiceNewArray[1]])
                        .then(([rows, fields]) => {
                            managerID = rows[0].id;
                            return ([id, managerID]);
                        })
                        .catch(err => {
                            managerID = null;
                            return ([id, managerID]);

                        })
                        .then(([rid, mid]) => {

                  
                            connection.promise().query('INSERT INTO employee SET ?', { "first_name": choice.first_name, "last_name": choice.last_name, "role_id": rid, "manager_id": mid })
                                .then(([rows, fields]) => {
                                    console.log(rows.affectedRows + ' added!\n');
                                    init();
                                })
                                .catch(err => {
                                    console.log(err);

                                })
                        })


                })
        });

};

updateEmployeeRole = () => {
    const { init } = require('../server');
    let arrayFirst = [];
    let arrayLast = [];
    let arrayRole = [];
    let arrayCombined = [];
    var roleID;

    connection.promise().query('SELECT first_name,last_name FROM employee')
        .then(([rows, fields]) => {
            rows.forEach(element => arrayFirst.push(element.first_name));
            rows.forEach(element => arrayLast.push(element.last_name));
            rows.forEach(element => arrayCombined.push(element.first_name + ' ' + element.last_name));


        })
        .catch(console.log)
        .then(() => {
            connection.promise().query('SELECT title FROM role')
                .then(([rows, fields]) => {
                    rows.forEach(element => arrayRole.push(element.title))

                })
                .catch(console.log)
                .then(() => {
                    inquirer;
                    return inquirer.prompt([

                        {
                            type: 'list',
                            name: 'employee',
                            message: 'Employee',
                            choices: arrayCombined
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'Employee role',
                            choices: arrayRole
                        }

                    ])

                        .then(choice => {
                            connection.promise().query('SELECT id FROM role WHERE ?', { "title": choice.role })
                                .then(([rows, fields]) => {
                                    roleID = rows[0].id;
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                                .then(() => {
                                    let choiceNew = choice.employee;
                                    let choiceNewArray = choiceNew.split(' ');
                                    connection.query('UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?', [roleID, choiceNewArray[0], choiceNewArray[1]], function (err, res) {
                                        if (err) throw err;
                                        console.log(res.affectedRows + ' employee updated!\n');
                                        init();

                                    })

                                })
                                .catch(err => {
                                    console.log(err);

                                });
                        })
                });
        });
};


updateManager = () => {
    const { init } = require('../server');
    connection.promise().query('SELECT first_name,last_name,id FROM employee',)
        .then(([rows, fields]) => {
            let arrayFirst = [];
            let arrayLast = [];
            let arrayCombined = [];
            let arrayManagerId = [];
            rows.forEach(element => arrayManagerId.push(element.id));
            rows.forEach(element => arrayFirst.push(element.first_name));
            rows.forEach(element => arrayLast.push(element.last_name));
            rows.forEach(element => arrayCombined.push(element.first_name + ' ' + element.last_name));
            return ([arrayFirst, arrayLast, arrayCombined, arrayManagerId]);
        })
        .catch(err => {
            console.log(err);

        })
        .then(([aF, aL, aC, aM]) => {
            inquirer;
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Select an Employee',
                    choices: aC
                }
            ])
                .then((choices) => {
                    mid = aC.findIndex((element) => element == choices.employee);
                    console.log("mid " + mid);
                    let choiceNew = choices.employee;
                    let choiceNewArray = choiceNew.split(' ');
                    connection.promise().query('SELECT first_name,last_name FROM employee WHERE first_name != ? && last_name != ? && (manager_id != ?|| manager_id IS NULL)', [choiceNewArray[0], choiceNewArray[1], aM[mid]])
                        .then(([rows, fields]) => {
                            let arrayFirst = [];
                            let arrayLast = [];
                            let arrayCombined = [];
                            rows.forEach(element => arrayFirst.push(element.first_name));
                            rows.forEach(element => arrayLast.push(element.last_name));
                            rows.forEach(element => arrayCombined.push(element.first_name + ' ' + element.last_name));
                            arrayCombined.push('No Manager');
                            return ([choiceNewArray[0], choiceNewArray[1], arrayCombined, aM[mid]]);
                        })
                        .catch(err => {
                            console.log(err);

                        })
                        .then(([fName, lName, aC, mid]) => {

                            inquirer;
                            return inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: 'Select Manager',
                                    choices: aC
                                }
                            ])
                                .then((choices) => {

                                    let choiceNew = choices.manager;
                                    let choiceNewArray = choiceNew.split(' ')
                                    connection.promise().query('SELECT id FROM employee WHERE first_name = ? AND last_name = ?', [choiceNewArray[0], choiceNewArray[1]])
                                        .then(([rows, fields]) => {
                                            return (rows[0].id);
                                        })
                                        .catch(err => {
                                            return null;
                                        })
                                        .then((manId) => {
                                            connection.query('UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?', [manId, fName, lName], function (err, res) {
                                                if (err) throw err;
                                                console.log(res.affectedRows + ' manager updated!\n');
                                                init();
                                            })
                                        });


                                });
                        });
                });

        });

};

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateManager
};