const connection = require("./connection");

class employeeDB {

    constructor(connection) {
        this.connection = connection;
    }

    allEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last) AS manager FROM employee LEFT JOIN role on employee.role_id = role_id = LEFT JOIN department on role.department_id = department.id LEFT LEFT JOIN employee manager or manager.id = employee.manager_id; "
        );
    }

    addEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    allManagers(employeeId) {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }

    allRoles() {
        return this.connection.promise().query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department_id;"
        );
    }

    addrole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role
        );
    }

    allDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }

    addDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    }

}

module.exports = new employeeDB(connection);