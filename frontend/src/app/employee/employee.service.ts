import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Employee } from "./employee.model";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({providedIn: "root"})
export class EmployeeService{
    private employees: Employee[] = [];
    private employeesUpdated = new Subject<Employee[]>();
    constructor(private router: Router, private http: HttpClient){}
    getEmployees(){
        this.http.get<{message: string, employees: any}>("http://localhost:3000/api/employees").pipe(
            map(employeeData =>{
                return employeeData.employees.map(employee=>{
                    return {
                        id: employee._id,
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        email: employee.email,
                        role: employee.role,
                        status: employee.status
                    };
                });
            })
        ).subscribe((transformedEmployeesData)=>{
            this.employees = transformedEmployeesData;
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

    deleteEmployee(employeeId: string){
        this.http.delete("http://localhost:3000/api/employees/" + employeeId).subscribe(()=>{
            console.log("Deleted");
            const updatedEmployees = this.employees.filter(employee=> employee.id !== employeeId);
            this.employees= updatedEmployees;
            this.employeesUpdated.next([...this.employees]);
        });
    }
}