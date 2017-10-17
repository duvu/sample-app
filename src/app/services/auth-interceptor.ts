import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('URL', req.url);

        if (req.url.startsWith('/oauth')) {
            const changeReg = req.clone();
            return next.handle(changeReg);
        } else {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                const token1 = currentUser && currentUser.access_token;
                const token = 'Bearer ' + token1;
                const changeReg = req.clone({
                    headers: req.headers.set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .set('Authorization', token)
                });
                return next.handle(changeReg);
            }
    }
}
