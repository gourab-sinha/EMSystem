import { Injectable } from "@angular/core";
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

    getEmployees(){
        return [...this.employees];
    }
}