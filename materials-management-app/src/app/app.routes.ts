import { Routes } from '@angular/router';
import { PurchaseOrderEditor } from '../purchase-order-editor/purchase-order-editor';
import { MaterialLotEditor } from '../material-lot-editor/material-lot-editor';

export const routes: Routes = [
  { path: 'orders/:lot_number', component: PurchaseOrderEditor, title: 'Purchase Orders' },
  { path: '', component: MaterialLotEditor, pathMatch: 'full' },
];
