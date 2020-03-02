import { Injectable } from '@angular/core';
import { DataModel } from './material-contact/datamodel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialSaveService {
  public editDataTitle = '';
  private url_MaterialFormSave = 'https://chatnodejsappdemo.herokuapp.com/enroll';
  // 'http://localhost:3000/enroll'
  private url_MaterialFormRead = 'https://chatnodejsappdemo.herokuapp.com/materialContactRead';
  // 'http://localhost:3000/materialContactRead';
  private url_MaterialFormEdit = 'https://chatnodejsappdemo.herokuapp.com/editt';     // 'http://localhost:3000/editt';
  private url_MaterialFormDelete = 'https://chatnodejsappdemo.herokuapp.com/deleteEmployee';

  //private url = 'http://localhost:3000';
  private url = 'https://chatnodejsappdemo.herokuapp.com/';

  dataModel: DataModel;
  constructor(private http: HttpClient) { }
  onSubmit(datamodel: DataModel) {
    return this.http.post<any> (this.url_MaterialFormSave, datamodel);
   }
   onRead() {
    return this.http.get<any> (this.url_MaterialFormRead).pipe(
      tap(data => console.log('node data ' + data)),
      catchError(this.errorhandler)
    );
  }
  getEditData() {
    return this.dataModel;
  }
  setEditData(data: any) {
   this.dataModel = data;
  }
  onContactEdit(dataModel: DataModel) {
    console.log(' data model api '+ dataModel.key);
    return this.http.post<DataModel> (this.url_MaterialFormEdit, dataModel);
  }
  onContactDelete(key) {
    console.log('key ' + key);
    return this.http.post <any> (this.url_MaterialFormDelete, key);
  }
  errorhandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error');
  }
}
