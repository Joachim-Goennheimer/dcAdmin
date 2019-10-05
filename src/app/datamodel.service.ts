import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable()
export class DataModelService {


    constructor(private http: HttpClient,
                private authService: AuthService){

    }

    someMethod(){}
}