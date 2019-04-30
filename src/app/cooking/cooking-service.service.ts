import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ICooking } from './icooking';
import { Observable, throwError } from 'rxjs';
import { catchError, tap  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CookingServiceService {
  apiKey = '6d755d24940fe3faca22412c957b01a6';
  url = 'https://www.food2fork.com/api/search?key=' + this.apiKey +  '&q=shredded%20chicken&count=10';

  constructor(private http: HttpClient) {}

  getRecipe(): Observable <ICooking[]> {
      return this.http.get <ICooking[]>( this.url)
      .pipe(
        tap(data => console.log('Server data', data ) ),
        catchError(this.errorhandler)
      );
  }

  errorhandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }
}
