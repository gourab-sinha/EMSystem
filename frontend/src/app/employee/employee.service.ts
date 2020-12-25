import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Employee } from "./employee.model";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: "root"})
export class EmployeeService{
    private employees: Employee[] = [];
    private employeesUpdated = new Subject<Employee[]>();
    constructor(private router: Router, private http: HttpClient){}
    getEmployees(){
        this.http.get<{message: string, employees: Employee[]}>("http://localhost:3000/api/employees").subscribe((employeesData)=>{
            this.employees = employeesData.employees;
            this.employeesUpdated.next([...this.employees]);
        });
        return [...this.employees];
    }

    getEmployeeUpdateListener(){
        return this.employeesUpdated.asObservable();
    }

    addEmployee(employee: Employee){
        this.http.post<{message: string, employee: Employee}>("http://localhost:3000/api/employees", employee).subscribe((response)=>{
            console.log(response);
            this.employees.push(employee);
            this.employeesUpdated.next([...this.employees]);
            this.router.navigate(["/"]);
        });
        
    }
}