import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class PolicyService {

    /**
    * @type {string}
   */
    private BASE_URL: string = 'http://localhost:56492/api/';

    constructor(private http: HttpClient) { }

    verifyPolicyNumber(Id: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        return this.http.get(this.BASE_URL + "Policy/Validate/" + Id, httpOptions)
            .pipe(catchError(this.handleError));
    }

    verifyBillDetails(billDetails: any) {
        debugger;
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
        };
        return this.http.post<any>(this.BASE_URL + "Claim/ClaimPolicy", billDetails, httpOptions)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error);
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    };

    verifyPolicyNumberOld(policyNumberModel: string): Observable<any> {
        let response: { status: boolean; message: string; };
        if (policyNumberModel == "12345") {
            response = { status: false, message: "Invalid policy number" };
        }
        else {
            response = { status: true, message: "" };
        }
        return Observable.create(observer => {
            observer.next(response)
            observer.complete()
        });
    }

    verifyBillDetailsOld(billDetails: string): Observable<any> {
        let response;
        if (!billDetails) {
            response = { status: false, message: "Unable to claim your policy number" };
        }
        else {
            response = { status: true, message: "", totalAmount: "12,0300", claimedAmount: "15,6000", balanceAmount: "5,6000" };
        }
        return Observable.create(observer => {
            observer.next(response)
            observer.complete()
        });
    }
}