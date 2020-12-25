import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Routes } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Role } from '../role.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  form: FormGroup;
  roles: Role[] = [
    {value: 'Software Developer', viewValue:'Software Developer'},
    {value: 'Product Manager', viewValue:'Product Manager'},
    {value: 'Project Manager', viewValue:'Project Manager'},
    {value: 'Finance Head', viewValue:'Finance Head'},
    {value: 'Team Lead', viewValue:'Team Lead'},
    {value: 'Technical Architech', viewValue:'Technical Architech'},
  ];
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      lastName: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      role: new FormControl(null, {validators: [Validators.required]}),
      status: new FormControl(false,{validators: [Validators.required]}),
    });
  }

  onSaveEmployee(){
    if(this.form.invalid){
      return;
    }

    const employee :Employee = {
      id: null,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      role: this.form.value.role,
      status: Boolean(this.form.value.status)
    };
    console.log(employee);
    this.employeeService.addEmployee(employee);
    this.form.reset();
  }

}
