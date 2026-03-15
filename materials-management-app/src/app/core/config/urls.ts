export class Urls {
  // API Endpoints
  static getMaterialLots = '/material_lots';
  static getMaterialLot = '/material_lots/:lot_number';
  static getMaterialLotOrders = '/material_lots/:lot_number/orders';
  static addMaterialLot = '/material_lots';
  static updateMaterialLot = '/material_lots/:lot_number';
  static deleteMaterialLot = '/material_lots/:lot_number';

  static getOrders = '/orders';
  static getOrder = '/orders/:order_id';
  static addOrder = '/orders';
  static updateOrder = '/orders/:order_id';
  static deleteOrder = '/orders/:order_id';
}
