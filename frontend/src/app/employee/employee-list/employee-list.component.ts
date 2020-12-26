import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  totalEmployees = 0;
  employeesPerPage = 2;
  pageSizeOptons = [1,2,5,10];
  currentPage = 1;
  isLoading = false;
  employees: Employee[] = [];
  userIsAuthenticated = false;
  private employeesSubs: Subscription;
  private statusSub: Subscription; 

  constructor(public employeeService: EmployeeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.employeeService.getEmployees(this.employeesPerPage, 1);
    this.employeesSubs = this.employeeService.getEmployeeUpdateListener().subscribe(
      (employeeData:{employees: Employee[], totalCount: number})=>{
      this.employees = employeeData.employees;
      this.totalEmployees = employeeData.totalCount;
      this.isLoading = false;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.statusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });
    console.log(this.employees);
  }

  ngOnDestroy(): void{
    // prevents memory leaks
    this.employeesSubs.unsubscribe();
    this.statusSub.unsubscribe();
  }

  onDelete(employeeId: string){
    this.isLoading = true;
    this.employeeService.deleteEmployee(employeeId).subscribe(()=>{
      this.employeeService.getEmployees(this.employeesPerPage, this.currentPage);
    });
  }

  onChangedPage(pageEvent: PageEvent){
    this.isLoading = true;
    this.currentPage = pageEvent.pageIndex + 1;
    this.employeesPerPage = pageEvent.pageSize;
    console.log(this.totalEmployees);
    this.employeeService.getEmployees(this.employeesPerPage, this.currentPage);
  }
}
