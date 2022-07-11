import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators'; 
import { SessionService } from './modules/user/services/session-.service';
import { LoaderService } from './modules/interface/services/loader.service';
 
@Injectable()
export class Interceptor implements HttpInterceptor {
 
    private totalRequests = 0;

    constructor(
        private loadingService: LoaderService,
        private sessionService: SessionService
    ) { }
 
    intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
        let request = httpRequest;
        const token = this.sessionService.getToken();
        if (token) {
            request = httpRequest.clone({ headers: httpRequest.headers.set('Authorization', 'Bearer ' + token) });
        }
        this.totalRequests++;
        this.loadingService.setLoading(true);
        
        return httpHandler.handle(request)
        .pipe(
            map((event: HttpEvent<any>) => {
                /*
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                */
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                //console.log('error--->>>', error);
                return throwError(error);
            }),
            finalize(() => {
                this.totalRequests--;
                if (this.totalRequests == 0) {
                this.loadingService.setLoading(false);
                }
            })
        );
    }
}
 
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
];