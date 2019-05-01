import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ICooking } from './icooking';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CookingServiceService {
  public search = '';
  apiKey = '6d755d24940fe3faca22412c957b01a6';
  url = 'https://www.food2fork.com/api/search?key=' + this.apiKey +  '&q=shredded%20chicken&count=30';

  constructor(private http: HttpClient) {}

  getRecipe(): Observable <ICooking[]> {
      return this.http.get <ICooking[]>( 'assets/cooking-api.json' )  // 'assets/cooking-api.json '
      .pipe(
        tap(data => { console.log('Server data', data );
                    } ),
        catchError(this.errorhandler)
      );
  }
  searchByItemName( searchString: string ) {
    this.search = searchString;
  }
  getSearchByItemName() {
    return this.search;
  }
  errorhandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }
}
