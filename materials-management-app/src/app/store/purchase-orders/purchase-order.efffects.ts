import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadPurchaseOrders,
  loadPurchaseOrdersSuccess,
  loadPurchaseOrdersFailure,
  addPurchaseOrder,
  addPurchaseOrderSuccess,
  addPurchaseOrderFailure,
  updatePurchaseOrder,
  updatePurchaseOrderSuccess,
  updatePurchaseOrderFailure,
  deletePurchaseOrder,
  deletePurchaseOrderSuccess,
  deletePurchaseOrderFailure,
} from './purchase-order.actions';
import { ApiService } from '../../core/services/api.service';
import { PurchaseOrder } from '../../models/model';

@Injectable()
export class PurchaseOrderEffects {
  loadPurchaseOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPurchaseOrders),
      switchMap(() =>
        this.apiService.getOrders().pipe(
          map((response: PurchaseOrder[]) =>
            loadPurchaseOrdersSuccess({ purchaseOrders: response }),
          ),
          catchError((error: Error) => of(loadPurchaseOrdersFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  addPurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPurchaseOrder),
      switchMap((action: ReturnType<typeof addPurchaseOrder>) =>
        this.apiService.addOrder(action.purchaseOrder).pipe(
          map((response) =>
            addPurchaseOrderSuccess({
              successMessage: response.message,
              purchaseOrder: action.purchaseOrder,
            }),
          ),
          catchError((error: Error) => of(addPurchaseOrderFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  updatePurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePurchaseOrder),
      switchMap((action: ReturnType<typeof updatePurchaseOrder>) =>
        this.apiService.updateOrder(action.order_id, action.purchaseOrder).pipe(
          map((response) =>
            updatePurchaseOrderSuccess({
              successMessage: response.message,
              purchaseOrder: action.purchaseOrder,
            }),
          ),
          catchError((error: Error) => of(updatePurchaseOrderFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  deletePurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePurchaseOrder),
      switchMap((action: ReturnType<typeof deletePurchaseOrder>) =>
        this.apiService.deleteOrder(action.order_id).pipe(
          map((response) =>
            deletePurchaseOrderSuccess({
              order_id: action.order_id,
              successMessage: response.message,
            }),
          ),
          catchError((error: Error) => of(deletePurchaseOrderFailure({ error: error.message }))),
        ),
      ),
    ),
  );
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {}
}
