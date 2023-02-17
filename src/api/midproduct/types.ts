export interface MidProCategory{
  id: string;
  category_id: string;
  name: string;
  is_deleted: string;
  gmt_create: string;
  gmt_modified: string;
}

export interface MidProModel{
  id: string;
  model: string;
  name: string;
  categoryId: string;
  isDeleted: string;
  gmtCreate: string;
  gmtModified: string;
}

export interface TeamDefaultTime{
  id: string;
  teamType: string;
  startTime: string;
  endTime: string;
  isDeleted: string;
  gmtCreate: string;
  gmtModified: string;
}

export interface WorkSituation{
  id: string;
  deviceId: string;
  monitor: string;
  startTime: string;
  endTime: string;
  productId: string;
  model: string;
  name: string;
  cname: string;
  orderStartTime: string;
  orderEndTime: string;
  shiftProQuantity: string;
  shiftOutput: string;
  unqualifiedQuantity: string;
  enConsumption: string;
  qualifiedQuantity: string;
  gmtCreate: string;
  gmtModified: string;
}

export interface Plan{
  id: string;
  deviceId: string;
  productId: string;
  model: string;
  name: string;
  cname: string;
  scheQuantity: string;
  startTime: string;
  endTime: string;
  gmtCreate: string;
  gmtModified: string;
}
