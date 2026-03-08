export interface PurchaseOrder {
  order_id: number;
  name: string;
  lot_number: number;
  quantity: number;
  unit_price: number;
  order_date: string;
  shipping_address: string;
}

export interface MaterialLot {
  lot_number: number;
  material_id: string;
}
