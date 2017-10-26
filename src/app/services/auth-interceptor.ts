import { Injectable } from '@angular/core';
import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppService} from "./app.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private app: AppService, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('/oauth')) {
            const changeReg = req.clone();
            return next.handle(changeReg);
        } else {
                const token = this.app.getToken();
                const changeReg = req.clone({
                    headers: req.headers.set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .set('Authorization', token)
                });
                return next.handle(changeReg);
            }
    }
}
