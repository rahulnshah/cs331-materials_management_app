import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
/* import all actions */
import {
  addPurchaseOrder,
  deletePurchaseOrder,
  loadPurchaseOrders,
  selectPurchaseOrder,
  updatePurchaseOrder,
} from '../app/store/purchase-orders/purchase-order.actions';

/* import all selectors */
import {
  selectAllPurchaseOrders,
  selectPurchaseOrderError,
  selectPurchaseOrderLoading,
  selectPurchaseOrderSuccessMessage,
  selectSelectedPurchaseOrder,
} from '../app/store/purchase-orders/purchase-order.selectors';
import { PurchaseOrder } from '../app/models/model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-order-editor',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './purchase-order-editor.html',
  styleUrl: './purchase-order-editor.css',
  standalone: true,
})
export class PurchaseOrderEditor {
  private formBuilder = inject(FormBuilder);
  private purchaseOrderStore = inject(Store);
  private activatedRoute = inject(ActivatedRoute);

  lot_number = '';

  purchaseOrder$ = this.purchaseOrderStore.select(selectSelectedPurchaseOrder);
  purchaseOrders$ = this.purchaseOrderStore.select(selectAllPurchaseOrders);
  purchaseOrderLoading$ = this.purchaseOrderStore.select(selectPurchaseOrderLoading);
  purchaseOrderSuccessMessage$ = this.purchaseOrderStore.select(selectPurchaseOrderSuccessMessage);
  purchaseOrderError$ = this.purchaseOrderStore.select(selectPurchaseOrderError);

  purchaseOrderForm = this.formBuilder.group({
    order_id: [''],
    lot_number: [''],
    name: [''],
    shipping_address: [''],
    quantity: [''],
    unit_price: [''],
    order_date: [''],
  });

  onSelectPurchaseOrder(purchaseOrder: PurchaseOrder) {
    this.purchaseOrderStore.dispatch(selectPurchaseOrder({ purchaseOrder }));
  }

  onSubmit() {
    this.purchaseOrderStore.dispatch(
      addPurchaseOrder({
        purchaseOrder: {
          order_id: this.purchaseOrderForm.value.order_id!,
          lot_number: this.purchaseOrderForm.value.lot_number!,
          name: this.purchaseOrderForm.value.name!,
          shipping_address: this.purchaseOrderForm.value.shipping_address!,
          quantity: this.purchaseOrderForm.value.quantity!,
          unit_price: this.purchaseOrderForm.value.unit_price!,
          order_date: this.purchaseOrderForm.value.order_date!,
        },
      }),
    );
  }

  onUpdate() {
    this.purchaseOrderStore.dispatch(
      updatePurchaseOrder({
        order_id: this.purchaseOrderForm.value.order_id!,
        purchaseOrder: {
          order_id: this.purchaseOrderForm.value.order_id!,
          lot_number: this.purchaseOrderForm.value.lot_number!,
          name: this.purchaseOrderForm.value.name!,
          shipping_address: this.purchaseOrderForm.value.shipping_address!,
          quantity: this.purchaseOrderForm.value.quantity!,
          unit_price: this.purchaseOrderForm.value.unit_price!,
          order_date: this.purchaseOrderForm.value.order_date!,
        },
      }),
    );
  }

  onDelete(purchaseOrder: PurchaseOrder) {
    this.purchaseOrderStore.dispatch(deletePurchaseOrder({ order_id: purchaseOrder.order_id }));
  }

  ngOnInit() {
    // get the lot_number from the url
    console.log('Activated Route Snapshot:', this.activatedRoute.snapshot);
    this.lot_number = this.activatedRoute.snapshot.params['lot_number'];
    this.purchaseOrderStore.dispatch(loadPurchaseOrders({ lot_number: this.lot_number }));
    this.purchaseOrder$.subscribe((purchaseOrder) => {
      if (purchaseOrder) {
        this.purchaseOrderForm.patchValue({
          order_id: purchaseOrder.order_id,
          lot_number: purchaseOrder.lot_number,
          name: purchaseOrder.name,
          shipping_address: purchaseOrder.shipping_address,
          quantity: purchaseOrder.quantity,
          unit_price: purchaseOrder.unit_price,
          order_date: purchaseOrder.order_date,
        });
      } else {
        this.purchaseOrderForm.reset();
      }
    });
  }
}
