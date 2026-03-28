import { createAction, props } from '@ngrx/store';
import { PurchaseOrder } from '../../models/model';
export const loadPurchaseOrders = createAction(
  '[Purchase Order] Load Purchase Orders',
  props<{ lot_number: string }>(),
);

export const loadPurchaseOrdersSuccess = createAction(
  '[Purchase Order] Load Purchase Orders Success',
  props<{ purchaseOrders: PurchaseOrder[] }>(),
);

export const loadPurchaseOrdersFailure = createAction(
  '[Purchase Order] Load Purchase Orders Failure',
  props<{ error: string }>(),
);

export const selectPurchaseOrder = createAction(
  '[Purchase Order] Select Purchase Order',
  props<{ purchaseOrder: PurchaseOrder }>(),
);

export const addPurchaseOrder = createAction(
  '[Purchase Order] Add Purchase Order',
  props<{ purchaseOrder: PurchaseOrder }>(),
);

export const addPurchaseOrderSuccess = createAction(
  '[Purchase Order] Add Purchase Order Success',
  props<{ purchaseOrder: PurchaseOrder; successMessage: string; inserted_order_id: string }>(),
);

export const addPurchaseOrderFailure = createAction(
  '[Purchase Order] Add Purchase Order Failure',
  props<{ error: string }>(),
);

export const updatePurchaseOrder = createAction(
  '[Purchase Order] Update Purchase Order',
  props<{ order_id: string; purchaseOrder: PurchaseOrder }>(),
);

export const updatePurchaseOrderSuccess = createAction(
  '[Purchase Order] Update Purchase Order Success',
  props<{ purchaseOrder: PurchaseOrder; successMessage: string }>(),
);

export const updatePurchaseOrderFailure = createAction(
  '[Purchase Order] Update Purchase Order Failure',
  props<{ error: string }>(),
);

export const deletePurchaseOrder = createAction(
  '[Purchase Order] Delete Purchase Order',
  props<{ order_id: string }>(),
);

export const deletePurchaseOrderSuccess = createAction(
  '[Purchase Order] Delete Purchase Order Success',
  props<{ order_id: string; successMessage: string }>(),
);

export const deletePurchaseOrderFailure = createAction(
  '[Purchase Order] Delete Purchase Order Failure',
  props<{ error: string }>(),
);
