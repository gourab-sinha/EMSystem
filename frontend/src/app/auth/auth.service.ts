import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth.model";

@Injectable({providedIn: "root"})
export class AuthService{
    private token: string;
    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();
    constructor(private http: HttpClient, private router: Router){}

    getToken(){
        return this.token;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    getIsAuth(){
        return this.isAuthenticated;
    }
    createUser(email: string, password: string){
        const authData: AuthData = {
            email: email,
            password: password
        }
        this.http.post<{message: string, result: any}>("http://localhost:3000/api/user/signup", authData).subscribe(response =>{
            console.log(response);
        });
    }

    login(email: string, password: string){
        const authData: AuthData = {
            email: email,
            password: password
        };
        this.http.post<{token: string}>("http://localhost:3000/api/user/login", authData).subscribe(response =>{
            this.token = response.token;
            if(this.token){
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                this.router.navigate(["/"]);
            }
        });
    }

    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(["/"]);
    }
}