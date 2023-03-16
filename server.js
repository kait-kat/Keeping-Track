const db = require('./db/connection.js');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, updateEmployeeRole, updateManager } = require('/.utils/prompts.js');
const inquirer = require('inquirer');
const connection = require('./db/connection.js');

inquirer;
const questionnaire = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please make a selection',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Update manager', 'Quit']
        },

    ]);
};

init = () => {
    questionnaire()
        .then(choiceData => {

            switch (choiceData.choice) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles()
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Update manager':
                    updateManager();
                    break;
                case 'Quit':
                    connection.end();
                    break;
            }
        })

}

module.exports = {
    init
};