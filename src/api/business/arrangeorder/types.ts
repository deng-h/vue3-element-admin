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
