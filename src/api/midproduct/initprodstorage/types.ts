export interface InitProdStorage{
  id: string;
  productId: string;
  model: string;
  name: string;
  cname: string;
  stocks: string;
  adminName: string;
  gmtCreate: string;
  gmtModified: string;
}

//查询参数类型
export interface MidProdInitProdQuery extends PageQuery{
  model?: string;
}

export type MidProdInitProdPageResult = PageResult<InitProdStorage[]>;
