export class Urls {
  // API Endpoints
  static getMaterialLots = '/api/material_lots';
  static getMaterialLot = '/api/material_lots/:lot_number';
  static getMaterialLotOrders = '/api/material_lots/:lot_number/orders';
  static addMaterialLot = '/api/material_lots';
  static updateMaterialLot = '/api/material_lots/:lot_number';
  static deleteMaterialLot = '/api/material_lots/:lot_number';

  static getOrders = '/api/orders';
  static getOrder = '/api/orders/:order_id';
  static addOrder = '/api/orders';
  static updateOrder = '/api/orders/:order_id';
  static deleteOrder = '/api/orders/:order_id';
}
