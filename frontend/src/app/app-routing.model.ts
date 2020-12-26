import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { EmployeeCreateComponent } from "./employee/employee-create/employee-create.component";
import { EmployeeListComponent } from "./employee/employee-list/employee-list.component";

const routes: Routes = [
    { path: '', component: EmployeeListComponent},
    { path: 'create', component: EmployeeCreateComponent},
    { path: 'edit/:employeeId', component: EmployeeCreateComponent},
    { path: 'login', component: LoginComponent }

];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}