import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

/**
 * Manages the user identification.
 */
@Injectable()
export class AuthService {

    accessToken: string;
    signInSuccessSubject = new Subject();


    constructor(private router: Router, private http: HttpClient) {}

    signupUser(email: string, username: string, password: string, firstName: string, lastName: string) {
        const userCredentials = {
            email,
            username,
            password,
            firstName,
            lastName
        };

        this.http.post('https://webfileviewerproject.herokuapp.com/register', userCredentials)
        .subscribe(
            (response) => {
                console.log(response)
                this.router.navigate(['/login']);
            },
            (error) => {
                console.log(error)
                this.router.navigate(['/login']);
            }
        );
    }

    /**
     * login request. If login successful access token is returned.
     * The token is sent with later requests in order to authenticate the user.
     */
    signinUser(email: string, password: string) {
        class LoginResponse {
            loginStatus: boolean;
            token: string;
        }

        const userCredentials = {
            userIdentifier: email,
            password
        };

        this.http.post('https://webfileviewerproject.herokuapp.com/login', userCredentials)
        .subscribe(
            (response: LoginResponse) => {
                this.accessToken = response.token;
                this.router.navigate(['/overview']);
                console.log(response);
            },
            (error) => {
                console.log(error)
                this.signInSuccessSubject.next(false);
            }
        );
    }

    logoutUser() {
        this.accessToken = null;
    }

    isAuthenticated() {
        return this.accessToken != null;
    }

    getToken() {
        return this.accessToken;
    }
}
