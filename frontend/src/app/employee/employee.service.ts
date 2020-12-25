import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Employee } from "./employee.model";
import { Subject } from 'rxjs';

@Injectable({providedIn: "root"})
export class EmployeeService{
    private employees: Employee[] = [];
    private employeesUpdated = new Subject<Employee[]>();
    constructor(private router: Router){}
    getEmployees(){
        return [...this.employees];
    }

    getEmployeeUpdateListener(){
        return this.employeesUpdated.asObservable();
    }

    addEmployee(employee: Employee){
        this.employees.push(employee);
        this.employeesUpdated.next([...this.employees]);
        this.router.navigate(["/"]);
    }
}