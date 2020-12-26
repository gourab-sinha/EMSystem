import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeCreateComponent } from "./employee/employee-create/employee-create.component";
import { EmployeeListComponent } from "./employee/employee-list/employee-list.component";

const routes: Routes = [
    { path: '', component: EmployeeListComponent},
    { path: 'create', component: EmployeeCreateComponent},
    { path: 'edit/:employeeId', component: EmployeeCreateComponent}

];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}