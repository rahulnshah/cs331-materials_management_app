export interface PurchaseOrder {
  order_id: string;
  name: string;
  lot_number: string;
  quantity: number;
  unit_price: number;
  order_date: string;
  shipping_address: string;
}

export interface MaterialLot {
  lot_number: string;
  material_id: string;
}
