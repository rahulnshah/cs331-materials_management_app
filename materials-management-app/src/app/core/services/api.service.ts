import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Urls } from '../config/urls';
import { MaterialLot, PurchaseOrder } from '../../models/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

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

  public getMaterialLots(): Observable<MaterialLot[]> {
    return this.getData(Urls.getMaterialLots);
  }

  public getMaterialLot(lot_number: string): Observable<MaterialLot> {
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
    return this.postData(url, data);
  }

  public deleteMaterialLot(lot_number: string): Observable<any> {
    const url = Urls.deleteMaterialLot.replace(':lot_number', lot_number);
    return this.deleteData(url);
  }

  public getOrders(): Observable<PurchaseOrder[]> {
    return this.getData(Urls.getOrders);
  }

  public getOrder(order_id: string): Observable<PurchaseOrder> {
    let url = Urls.getOrder.replace(':order_id', order_id.toString());
    return this.getData(url);
  }

  public updateOrder(order_id: string, data: any): Observable<any> {
    let url = Urls.updateOrder.replace(':order_id', order_id);
    return this.postData(url, data);
  }
}
