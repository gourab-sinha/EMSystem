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
  totalEmployees = 10;
  employeesPerPage = 1;
  pageSizeOptons = [1,2,5,10];
  currentPage = 0;
  isLoading = false;
  employees: Employee[] = [];
  private employeesSubs: Subscription;
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.employeeService.getEmployees(this.employeesPerPage, 1);
    this.employeesSubs = this.employeeService.getEmployeeUpdateListener().subscribe((employees: Employee[])=>{
      this.employees = employees;
      this.isLoading = false;
    });
    console.log(this.employees);
  }

  ngOnDestroy(): void{
    // prevents memory leaks
    this.employeesSubs.unsubscribe();
  }

  onDelete(employeeId: string){
    this.employeeService.deleteEmployee(employeeId);
  }

  onChangedPage(pageEvent: PageEvent){
    this.currentPage = pageEvent.pageIndex+1;
    this.employeesPerPage = pageEvent.pageSize;
    this.employeeService.getEmployees(this.employeesPerPage, this.currentPage);
  }
}
