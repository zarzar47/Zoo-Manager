
class Manager {
    constructor(id, name, email, hire_data) {
        console.log("Constructor arguments:", id, name, email, hire_data);
      this.id = id;
      this.name = name;
      this.email = email;
      this.hire_data = hire_data;
    }
  }
  
  class Employee {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
    }
  }
  
  class Task {
    constructor(id, description, deadline, urgency, completed, employeeId) {
      this.id = id;
      this.description = description;
      this.deadline = deadline;
      this.urgency = urgency;
      this.completed = completed;
      this.employeeId = employeeId;
    }
  
    updateTaskStatus(status) {
      this.completed = status;
    }
  }
  
  class Owner {
    constructor(id, name, company) {
      this.id = id;
      this.name = name;
    }
  
    addManager(manager) {
      this.managers.push(manager);
    }
  
    removeManager(managerId) {
      this.managers = this.managers.filter(manager => manager.id !== managerId);
    }
  }
  
  class Project {
    constructor(id, description, startDate, endDate) {
      this.id = id;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  }
  
  export { Manager, Employee, Task, Owner, Project };
  