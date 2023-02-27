
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

//查询参数类型
export interface MidProdPlanQuery extends PageQuery{
  deviceAddr?: string;
}

export type MidProdPlanPageResult = PageResult<Plan[]>;
