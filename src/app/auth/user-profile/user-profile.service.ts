import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from './user-profile.model';

/**
 * Service that manages communication of user data with server.
 */
@Injectable()
export class UserProfileService {

    serverUrl = 'http://localhost:3000';

    constructor(private http: HttpClient, private authService: AuthService) {}

    getUserProfileData() {
        class ReturnObjectFormat {
            username: string;
            firstName: string;
            lastName: string;
            email: string;
            lastLoggedIn: string;
            todoCount: number;
            documentCount: number;

        }
        const accessToken = this.authService.getToken();
        const httpOptions = {
                headers: new HttpHeaders({
                'x-access-token': accessToken
                }),
        };

        return this.http.get<ReturnObjectFormat>(this.serverUrl + '/userInfo', httpOptions);
    }

    getUserProfilePicture() {

        const accessToken = this.authService.getToken();
        const headers = new HttpHeaders({
                'x-access-token': accessToken
                });

        return this.http.get(this.serverUrl + '/userPicture', {headers, responseType: 'blob'});
    }

    editUserProfilePicture(newUserPicture) {
        const accessToken = this.authService.getToken();
        const httpOptions = {
                headers: new HttpHeaders({
                'x-access-token': accessToken,
                }),
        };

        const uploadData = new FormData();
        uploadData.append('image', newUserPicture, 'userPicture.png');

        this.http.put(this.serverUrl + '/updatePicture', uploadData, httpOptions)
        .subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );

    }

    editUser(updateProfile: UserProfile) {
        const accessToken = this.authService.getToken();
        const httpOptions = {
                headers: new HttpHeaders({
                  responseType:  'application/json',
                  'x-access-token': accessToken
                })
            };

        const updateObject = {
            firstName: updateProfile.firstName,
            lastName: updateProfile.lastName,
            email: updateProfile.email
        };
        return this.http.put(this.serverUrl + '/editUser', updateObject , httpOptions);
    }
}
