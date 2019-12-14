import { DataSummaryModel } from './data-summary.model';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataSummaryService {

    dataSummary: DataSummaryModel;
    constructor(private http: HttpClient, private authService: AuthService) {
        this.dataSummary = new DataSummaryModel();

    }

    getDataSummary() {

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
            responseType:  'application/json',
            'x-access-token': accessToken
            })
        };
        return this.http.get<ReturnObjectFormat>('https://webfileviewerproject.herokuapp.com/userInfo', httpOptions);
    }
}
