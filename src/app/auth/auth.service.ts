import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    accessToken: string;


    constructor(private router: Router){}

    signupUser(email: string, password: string){
        // logic for sending signup request
    }

    signinUser(email: string, password: string){
        // logic for sending signin request

        // Promise.then((token: string) => this.token)

        if(email != null && password != null){
            console.log("In authservice");

            this.accessToken = "12345";
            this.router.navigate(['/overview']);
        }

    }

    logoutUser(){
        // send request to destroy token
        // stop displaying the document data
        this.accessToken = null;
    }

    isAuthenticated(){
        return this.accessToken != null;
    }
}