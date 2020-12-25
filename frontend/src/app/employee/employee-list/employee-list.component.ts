import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  private employeesSubs: Subscription;
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees();
    this.employeesSubs = this.employeeService.getEmployeeUpdateListener().subscribe((employees: Employee[])=>{
      this.employees = employees;
    });
    console.log(this.employees);
  }

  ngOnDestroy(): void{
    // prevents memory leaks
    this.employeesSubs.unsubscribe();
  }

}
