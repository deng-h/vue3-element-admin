export interface DevAddrQuery extends PageQuery{
  keywords?: string;
}

export interface ArrangeOrder{
  devid: string;
  devname: string;
  scheQuantity: string;
  startDate: string;
  endDate: string;
}

export interface DeviceStatus{
  devid: string;
  powerstatus: string;
}

export interface Order{
  orderNum: string;
  status: string;
  devid: string;
  specAndModels: string;
  company: string;
  contactPerson: string;
  contactPhonenum: string;
  deliveryDates: string;
  orderQuantity: string;
  queueTime: string;
  responsible: string;
  respPhonenum: string;
  rawMaterial: string;
  lenAndWeight: string;
  thickness: string;
  useStocks: string;
  remark: string;
}

export interface Stock{
  id: string;
  totalModel: string;
  stocks: string;
  adminName: string;
  updatetime: Date;
  recordtime: Date;
}

export interface WorkSituation{
  devid: string;
  monitor: string;
  startTime: Date;
  endTime: Date;
  orderNum: string;
  orderStartTime: string;
  orderEndTime: string;
  unqualifiedQuantity: string;
  shiftProQuantity: string;
  qualifiedQuantity: string;
  shiftOutput: string;
  enConsumption: string;
}
