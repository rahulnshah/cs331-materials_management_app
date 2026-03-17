export interface PurchaseOrder {
  order_id: string;
  name: string;
  lot_number: string;
  quantity: string;
  unit_price: string;
  order_date: string;
  shipping_address: string;
}

export interface MaterialLot {
  lot_number: string;
  material_id: string;
}
