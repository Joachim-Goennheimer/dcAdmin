import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from './user-profile.model';

@Injectable()
export class UserProfileService {

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
                // responseType: 'arraybuffer' as 'json'
        };

        return this.http.get<ReturnObjectFormat>('https://webfileviewerproject.herokuapp.com/userInfo', httpOptions);
    }

    getUserProfilePicture() {

        const accessToken = this.authService.getToken();
        const headers = new HttpHeaders({
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': accessToken
                });
                // 'mimeType': 'multipart/form-data',
                // 'data': 'form'

        console.log("in getUserProfilePicture request");
        return this.http.get('https://webfileviewerproject.herokuapp.com/userPicture', {headers, responseType: 'blob'})
    }

    editUserProfilePicture(newUserPicture) {
        const accessToken = this.authService.getToken();
        const httpOptions = {
                headers: new HttpHeaders({
                // responseType:  'image/jpg',
                'x-access-token': accessToken,
                }),
        };

        const uploadData = new FormData();
        uploadData.append('image', newUserPicture, "userPicture.png");

        this.http.post('https://webfileviewerproject.herokuapp.com/updatePicture', uploadData, httpOptions)
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
        return this.http.put('https://webfileviewerproject.herokuapp.com/editUser', updateObject , httpOptions);
    }
}
