import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { EmployeeCreateComponent } from "./employee/employee-create/employee-create.component";
import { EmployeeListComponent } from "./employee/employee-list/employee-list.component";

const routes: Routes = [
    { path: '', component: EmployeeListComponent},
    { path: 'create', component: EmployeeCreateComponent, canActivate: [AuthGuard]},
    { path: 'edit/:employeeId', component: EmployeeCreateComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent}

];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule{}