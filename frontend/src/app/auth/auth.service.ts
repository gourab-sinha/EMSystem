import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth.model";
import { User } from "./user.model";

@Injectable({providedIn: "root"})
export class AuthService{
    private token: string;
    private isAuthenticated = false;
    private user: User;
    private authStatusListener = new Subject<boolean>();
    private tokenTimer: any;
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
            this.login(authData.email, authData.password);
        });
    }

    login(email: string, password: string){
        const authData: AuthData = {
            email: email,
            password: password
        };
        this.http.post<{token: string, expiresIn: number, userData: User}>("http://localhost:3000/api/user/login", authData).subscribe(response =>{
            this.token = response.token;
            if(this.token){
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                console.log(response.userData);
                this.user = {
                    email: response.userData.email,
                    userId: response.userData.userId
                };
                this.authStatusListener.next(true);
                const expirationDate = new Date((new Date()).getTime() + expiresInDuration *1000);
                this.saveAuthData(this.token,expirationDate, this.user);
                this.router.navigate(["/"]);
            }
        });
    }

    authoAuthUser(){
        const authInformation = this.getAuthData();
        if(!authInformation){
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if(expiresIn > 0){
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.user = {
                userId: authInformation.userId,
                email: authInformation.email
            };
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.user = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/"]);

    }

    getUserData(){
        return this.user;
    }

    private saveAuthData(token: string, expirationData: Date, user: User){
        localStorage.setItem("token", token);
        localStorage.setItem('expiration', expirationData.toISOString());
        localStorage.setItem('userId', user.userId);
        localStorage.setItem('email', user.email);
    }

    private clearAuthData(){
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
    }

    private getAuthData(){
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        const email = localStorage.getItem("email");
        if(!token && expirationDate){
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId,
            email: email

        };
    }

    private setAuthTimer(duration: number){
        console.log("Timer :" + duration);
        this.tokenTimer = setTimeout(()=>{
            this.logout();
        }, duration * 1000);
    }
}