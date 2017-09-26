import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProgressBarService} from "../progress-bar.service";

@Injectable()
export class AuthService {
    private redirectURL: string;

    private basicAuthHeader = 'Basic ' + btoa('webapp:123456');
    constructor(private http: HttpClient, private _progress: ProgressBarService) {}

    setRedirectURL (url: string) {
        this.redirectURL = url;
    }
    getRedirectURL() {
        return (this.redirectURL ? this.redirectURL : '/main');
    }


    login(username: string, password: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': this.basicAuthHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        const options = {headers: headers};
        return this.http.post('/oauth/token',
            'grant_type=password&scope=read%20write&username=' + username + '&password=' + password,
            options);
    }

    store(profile: any): void {
        localStorage.setItem('currentUser', profile);
    }

    logout(): void {
        localStorage.removeItem('currentUser');
    }

    isLoggedIn(): boolean {
        try {
            const profile = JSON.parse(localStorage.getItem('currentUser'));
            return profile != null;
        } catch (e) {
            console.log("error", e);
        }
        return false;
    }
}
