import { Injectable } from '@angular/core';
import {AuthHttpError} from "angular2-jwt";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {Router} from "@angular/router";

@Injectable()
export class BaseService {
    protected router: Router
    constructor(router: Router) {
        this.router = router;
    }
    protected error(error: Response | any) {
        console.log("Error", error);
        if (error instanceof AuthHttpError) {
            this.router.navigate(['/login']);
        } else {
            let errMsg: string;
            if (error instanceof Response) {
                const body = error.json();
                const err = body.message || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            } else {
                errMsg = error.message ? error.message : error.toString();
            }
            return Observable.throw(errMsg);
        }
    }
}
