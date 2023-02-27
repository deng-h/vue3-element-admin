
export interface MidProdModel{
  id: string;
  model: string;
  name: string;
  categoryId: string;
  categoryName: string;  // 自己加的 数据库里只有categoryId 得到categoryId后自己填categoryName
  gmtCreate: string;
  gmtModified: string;
}

export interface MidProdModelQuery extends PageQuery{
  category?: string;
  model?: string;
}

export type MidProdModelPageResult = PageResult<MidProdModel[]>;
