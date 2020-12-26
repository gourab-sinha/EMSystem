import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

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
  private employeesSubs: Subscription;
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.employeeService.getEmployees(this.employeesPerPage, 1);
    this.employeesSubs = this.employeeService.getEmployeeUpdateListener().subscribe(
      (employeeData:{employees: Employee[], totalCount: number})=>{
      this.employees = employeeData.employees;
      this.totalEmployees = employeeData.totalCount;
      this.isLoading = false;
    });
    console.log(this.employees);
  }

  ngOnDestroy(): void{
    // prevents memory leaks
    this.employeesSubs.unsubscribe();
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
