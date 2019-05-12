import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { throwError as observableThrowError, of } from 'rxjs';
import { catchError, tap, filter, map, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getData(source: string) {
    return this.http.get(source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  postData(source: string, data: any, isFormData?: any) {
    of(5,6,7).pipe(
      tap(el => console.log(`1st tap ${el}`)),
      filter(n => n % 2 === 0),
      tap(el => console.log(`2st tap ${el}`)),
      map(n => n + 10),
      tap(el => console.log(`3st tap ${el}`)),
      scan((sum, n) => sum + n),
      tap(el => console.log(`4st tap ${el}`))
    ).subscribe(result => console.log("Result: "+  result));
    let headers = new HttpHeaders();
    headers = this.apiHeaders(headers, isFormData);
    return this.http.post(source, data, { headers: headers }).pipe(
      tap((res: any) => {
        console.log(res);
         // return [null, res];
      }),
      catchError(this.handleError)
    );
  }
  putData(source: string, data: any) {
    let headers = new HttpHeaders();
    headers = this.apiHeaders(headers);
    return this.http.put(source, data, { headers: headers }).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  patchData(source: string, data: any) {
    let headers = new HttpHeaders();
    headers = this.apiHeaders(headers);
    return this.http.patch(source, data, { headers: headers }).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  deleteData(source: string, data: any) {
    const headers = new HttpHeaders();
    const httpOptions = {
      headers: this.apiHeaders(headers),
      body: data
  };
    return this.http.delete(source, httpOptions).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  apiHeaders(headers: any, isFormData?: any) {
    if (isFormData !== undefined) {
      headers = headers.append('mimeType', 'multipart/form-data');
    } else {
      headers = headers.append('Content-Type', 'application/json');
    }
    headers = headers.append('Authorization', 'acbmyui-234rv');
    console.log(headers);
    return headers;
  }

  private handleError(error: any) {
    return [observableThrowError(error.error || 'Server error'), null];
  }
}
