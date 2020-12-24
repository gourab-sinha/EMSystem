import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    {value: 'software developer', viewValue:'Software Developer'},
    {value: 'product manager', viewValue:'Product Manager'},
    {value: 'project manager', viewValue:'Project Manager'},
    {value: 'finance head', viewValue:'Finance Head'},
    {value: 'team lead', viewValue:'Team Lead'},
    {value: 'technical architech', viewValue:'Technical Architech'},
  ];
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  onSaveEmployee(){
    if(this.form.invalid){
      return;
    }

    const employee :Employee = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      role: this.form.value.role,
      status: this.form.value.status
    };

    this.employeeService.addEmployee(employee);
    this.form.reset();
  }

}
