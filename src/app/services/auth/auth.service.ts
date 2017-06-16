import { Injectable } from '@angular/core';
import { Http, Response} from "@angular/http";
import { Observable} from "rxjs";
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthService {
    private profile: any;
    private redirectURL: string;
    constructor(private http: Http) {
        this.profile = JSON.parse(localStorage.getItem('profile_current'));
    }

    setRedirectURL (url: string) {
        this.redirectURL = url;
    }
    getRedirectURL() {
        return (this.redirectURL ? this.redirectURL : '/m/admin');
    }

    login(username: string, password: string) : Observable<boolean> {
        return this.http.post('/api/authenticate', {
            accountId: username,
            password: password
        }).map((response: Response) => {
            let token = response.json() && response.json().token;
            if (token) {
                localStorage.setItem('id_token', token);
                localStorage.setItem('profile_current', JSON.stringify(response.json()));
                return true;
            } else {
                return false;
            }
        }).catch(this.handleError);
    };
    isLoggedIn() {
        return tokenNotExpired('id_token');
    };
    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile_current');
    }


    private handleError(err: Response | any) {
        let errMsg: string;
        if (err instanceof Response) {
            const body = err.json();
            const error = body.message || JSON.stringify(body);
            errMsg = `${err.status} - ${err.statusText || ''} ${error}`;
        } else {
            try {
                errMsg = JSON.parse(err).message;
            } catch (e) {
                //noop
                errMsg = err.message ? err.message : err.toString();
            }

        }
        return Observable.throw(errMsg);
    }
}
