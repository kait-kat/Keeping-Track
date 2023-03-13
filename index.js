const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

function init() {
    runPrompts();
}

//this index will contain all the prompts to be able to update the employee info and view it//

function runPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "Please make a selection",
            choices: [
                {
                    name: "View departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update employee role",
                    value: "UPDATE_EMPLOYEE"
                },
                {
                    name: "Exit",
                    value: "QUIT"
                }
            ]
        }
    ]),then(res => {
        let choice = res.choice;
        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "VIEW_ROLES":
                viewAllRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "ADD_DEPARTMENT":
                createDepartment();
                break;
            case "ADD_ROLE":
                createRole();
                break;
            case "ADD_EMPLOYEE":
                createEmployee();
                break;
            case "UPDATE_EMPLOYEE":
                updateEmployee();
                break;
                default:
                    quit();
        }
    })
}

//these functions will pertain to the view choices in the prompts//

function viewAllEmployees() {
    db.allEmployees()
    .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
    })
    .then(() => runPrompts());
}
function viewAllRoles() {
    db.allRoles()
    .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
    })
    .then(() => runPrompts());
}
function createRole() {
    db.allDepartments()
        .then(([rows]) => {
            let department = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));
            prompt([
                {
                    name: "title",
                    message: "Enter the name of the role."
                },
                {
                    name: "salary",
                    message: "Enter salary."
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Select a department.",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.addRole(role)
                        .then(() => console.log('Added ${role.title} to the database'))
                        .then(() => runPrompts())
                    })
                })
        }
function createDepartment() {
    prompt([
        {
            name: "name",
            message: "Please input department name."
        }
    ])
        .then(res => {
            let name = res;
            db.addDepartment(name)
            .then(() => console.log('Added ${name.name} to the database'))
            .then(() => runPrompts())
        })
}
function createEmployee() {
    prompt([
        {
            name: "first_name",
            message: "Please input the first name."
        },
        {
            name: "last_name",
            message: "Please input the last name."
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;
                db.allRoles()
                    .then(([rows]) => {
                        let roles = rows;
                        const roleChoices = roles.map(({ id, title}) => ({
                            name: title,
                            value: id
                        }));

                    })
        })
}