import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Urls } from '../config/urls';
import { MaterialLot, PurchaseOrder } from '../../models/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient: HttpClient = inject(HttpClient);

  public getData(apiUrl: string): Observable<any> {
    return this.httpClient.get(apiUrl).pipe(
      map((response: Object) => {
        return response;
      }),
      catchError(this.handleError),
    );
  }

  public postData(apiUrl: string, data: any): Observable<any> {
    return this.httpClient.post(apiUrl, data).pipe(
      map((response: Object) => {
        return response;
      }),
      catchError(this.handleError),
    );
  }

  public updateData(apiUrl: string, data: any): Observable<any> {
    return this.httpClient.put(apiUrl, data).pipe(
      map((response: Object) => {
        return response;
      }),
      catchError(this.handleError),
    );
  }

  public deleteData(apiUrl: string): Observable<any> {
    return this.httpClient.delete(apiUrl).pipe(
      map((response: Object) => {
        return response;
      }),
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    // process error and return a user-friendly message
    return throwError(() => {
      if (error.error.message instanceof Array) {
        return new Error(error.error.message.join(', '));
      }
      return new Error('Opps! Something went wrong. Please try again later.');
    });
  }

  public getMaterialLots() {
    return this.getData(Urls.getMaterialLots);
  }

  public getMaterialLot(lot_number: string) {
    const url = Urls.getMaterialLot.replace(':lot_number', lot_number);
    return this.getData(url);
  }

  public getMaterialLotOrders(lot_number: string): Observable<any> {
    const url = Urls.getMaterialLotOrders.replace(':lot_number', lot_number);
    return this.getData(url);
  }

  public addMaterialLot(data: any): Observable<any> {
    return this.postData(Urls.addMaterialLot, data);
  }

  public updateMaterialLot(lot_number: string, data: any): Observable<any> {
    const url = Urls.updateMaterialLot.replace(':lot_number', lot_number);
    return this.updateData(url, data);
  }

  public deleteMaterialLot(lot_number: string): Observable<any> {
    const url = Urls.deleteMaterialLot.replace(':lot_number', lot_number);
    return this.deleteData(url);
  }

  public getOrders() {
    return this.getData(Urls.getOrders);
  }

  public addOrder(data: any): Observable<any> {
    return this.postData(Urls.addOrder, data);
  }

  public getOrder(order_id: string) {
    let url = Urls.getOrder.replace(':order_id', order_id.toString());
    return this.getData(url);
  }

  public updateOrder(order_id: string, data: any): Observable<any> {
    let url = Urls.updateOrder.replace(':order_id', order_id);
    return this.updateData(url, data);
  }

  public deleteOrder(order_id: string): Observable<any> {
    let url = Urls.deleteOrder.replace(':order_id', order_id);
    return this.deleteData(url);
  }
}
