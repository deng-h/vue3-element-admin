export interface MidProdCategory{
  id: string;
  name: string;
  category_id: string;
  gmt_create: Date;
  gmt_modified: Date;
}

//查询参数类型
export interface MidProdCategoryQuery extends PageQuery{
  categoryName?: string;
}

export type MidProdCategoryPageResult = PageResult<MidProdCategory[]>;
