import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthResponse} from "app/models/auth.response";

@Injectable()
export class AuthService {


    private basicAuthHeader = 'Basic ' + btoa('webapp:123456');
    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<AuthResponse> {
        const headers = new HttpHeaders({
            'Authorization': this.basicAuthHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        const options = {headers: headers};
        return this.http.post<AuthResponse>('/oauth/token',
            'grant_type=password&scope=read%20write&username=' + username + '&password=' + password,
            options);
    }


}
