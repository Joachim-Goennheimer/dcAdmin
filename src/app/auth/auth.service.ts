import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthService {

    accessToken: string;


    constructor(private router: Router,
        private http: HttpClient){}

    signupUser(email: string, username: string, password: string){
        const userCredentials = {
            "email": email,
            "username": username,
            "password": password
        }

        this.http.post("https://webfileviewerproject.herokuapp.com/register", userCredentials)
        .subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        )
        // logic for sending signup request
    }

    signinUser(email: string, password: string){
        class loginResponse{
            loginStatus: boolean;
            token: string;
        }
        // logic for sending signin request

        // Promise.then((token: string) => this.token)

        const userCredentials = {
            "email": email,
            "username": email,
            "password": password
        }

        this.http.post("https://webfileviewerproject.herokuapp.com/login", userCredentials)
        .subscribe(
            (response: loginResponse) => {
                this.accessToken = response.token;
                console.log(response)
            },
            (error) => console.log(error)
        )

        this.router.navigate(['/overview']);


        

        // if(email != null && password != null){
        //     console.log("In authservice");

        //     this.accessToken = "12345";
        //     this.router.navigate(['/overview']);
        // }

    }

    logoutUser(){
        // send request to destroy token
        // stop displaying the document data
        this.accessToken = null;
    }

    isAuthenticated(){
        return this.accessToken != null;
    }

    getToken(){
        return this.accessToken;
    }
}