import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Employee } from "./employee.model";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({providedIn: "root"})
export class EmployeeService{
    private employees: Employee[] = [];
    private employeesUpdated = new Subject<{employees: Employee[], totalCount: number}>();

    constructor(private router: Router, private http: HttpClient){}
    
    getEmployees(employeesPerPage: number, currentPage: number){
        const queryParams = `?pagesize=${employeesPerPage}&page=${currentPage}`;
        this.http.get<{message: string, employees: any, totalCount: number}>("http://localhost:3000/api/employees/" + queryParams).pipe(
            map(employeeData =>{
                return {
                    employees: employeeData.employees.map(employee=>{
                    return {
                        id: employee._id,
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        email: employee.email,
                        role: employee.role,
                        status: employee.status
                    };
                }), totalCount: employeeData.totalCount
                };
            })
        ).subscribe((transformedEmployeesData)=>{
            this.employees = transformedEmployeesData.employees;
            this.employeesUpdated.next({employees: [...this.employees], totalCount: transformedEmployeesData.totalCount});
        });
    }

    getEmployeeUpdateListener(){
        return this.employeesUpdated.asObservable();
    }

    getEmployee(employeeId: string){
        return this.http.get<{message: string, employee: Employee}>("http://localhost:3000/api/employees/" + employeeId);
    }    

    addEmployee(employee: Employee){
        this.http.post<{message: string, employee: Employee}>("http://localhost:3000/api/employees", employee).subscribe((response)=>{
            this.router.navigate(["/"]);
        });
        
    }

    updateEmployee(employeeInfo: Employee){
        console.log("Service udpate");
        console.log(employeeInfo.id);
        this.http.put<{message: string}>("http://localhost:3000/api/employees/" + employeeInfo.id, employeeInfo).subscribe(response =>{
            this.router.navigate(["/"]);
        });
    }

    deleteEmployee(employeeId: string){
        return this.http.delete("http://localhost:3000/api/employees/" + employeeId);
    }
}