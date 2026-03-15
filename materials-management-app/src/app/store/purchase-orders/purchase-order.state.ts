import { PurchaseOrder } from '../../models/model';

export interface PurchaseOrderState {
  purchaseOrders: PurchaseOrder[];
  selectedPurchaseOrder: PurchaseOrder | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  successMessage: string | null;
}

export const initialPurchaseOrderState: PurchaseOrderState = {
  purchaseOrders: [],
  selectedPurchaseOrder: null,
  loading: false,
  loaded: false,
  error: null,
  successMessage: null,
};
