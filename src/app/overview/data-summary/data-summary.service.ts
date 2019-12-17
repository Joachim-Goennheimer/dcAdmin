import { DataSummaryModel } from './data-summary.model';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Service that retrieves summary data from server.
 */
@Injectable()
export class DataSummaryService {

    serverUrl = 'http://localhost:3000';

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
        return this.http.get<ReturnObjectFormat>(this.serverUrl + '/userInfo', httpOptions);
    }
}
