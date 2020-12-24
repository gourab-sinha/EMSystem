import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Employee } from "./employee.model";

@Injectable({providedIn: "root"})
export class EmployeeService{
    private employees: Employee[] = [
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
    ];
    constructor(private router: Router){}
    getEmployees(){
        return [...this.employees];
    }

    addEmployee(employee: Employee){
        this.employees.push(employee);
        this.router.navigate(["/"]);
    }
}