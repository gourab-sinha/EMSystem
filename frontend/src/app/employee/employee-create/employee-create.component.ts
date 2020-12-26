import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Routes } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Role } from '../role.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  private employeeId: string;
  private mode = 'create';
  employee: Employee;
  form: FormGroup;
  roles: Role[] = [
    {value: 'Software Developer', viewValue:'Software Developer'},
    {value: 'Product Manager', viewValue:'Product Manager'},
    {value: 'Project Manager', viewValue:'Project Manager'},
    {value: 'Finance Head', viewValue:'Finance Head'},
    {value: 'Team Lead', viewValue:'Team Lead'},
    {value: 'Technical Architech', viewValue:'Technical Architech'},
  ];
  constructor(public employeeService: EmployeeService, public route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      lastName: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      role: new FormControl(null, {validators: [Validators.required]}),
      status: new FormControl(false,{validators: [Validators.required]}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('employeeId')){
        this.mode = 'edit';
        this.employeeId = paramMap.get('employeeId');
        console.log(this.employeeId);
        this.employeeService.getEmployee(this.employeeId).subscribe(employeeData=>{
          this.employee = employeeData.employee;
          // console.log(employeeData.employee);
        });
        console.log("OnInit");
        console.log(this.employee);
      }
      else{
        this.mode = 'create';
        this.employeeId = null;
      }
    });
  }

  onSaveEmployee(){
    if(this.form.invalid){
      return;
    }
    
    console.log(this.mode);
    const employee :Employee = {
      id: null,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      role: this.form.value.role,
      status: Boolean(this.form.value.status)
    };

    if(this.mode === 'create'){
      this.employeeService.addEmployee(employee);

    }
    else{
      console.log("Edit employee");
      employee.id = this.employeeId;
      this.employeeService.updateEmployee(employee);
    }
    
    // this.form.reset();
  }

}
