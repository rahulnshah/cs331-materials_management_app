import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PurchaseOrderState } from './purchase-order.state';

export const selectPurchaseOrderState = createFeatureSelector<PurchaseOrderState>('purchaseOrders');

export const selectAllPurchaseOrders = createSelector(
  selectPurchaseOrderState,
  (state) => state.purchaseOrders,
);

export const selectSelectedPurchaseOrder = createSelector(
  selectPurchaseOrderState,
  (state) => state.selectedPurchaseOrder,
);

export const selectPurchaseOrderLoading = createSelector(
  selectPurchaseOrderState,
  (state) => state.loading,
);

export const selectPurchaseOrderError = createSelector(
  selectPurchaseOrderState,
  (state) => state.error,
);

export const selectPurchaseOrderSuccessMessage = createSelector(
  selectPurchaseOrderState,
  (state) => state.successMessage,
);
