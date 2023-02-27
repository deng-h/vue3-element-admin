export interface UavCameraHangar{
  id: string;
  hangarCategory: string;
  gmtCreate: Date;
  gmtModified: Date;
}

//查询参数类型
export interface CameraHangarQuery extends PageQuery{
  keywords?: string;
}
export type CameraHangarPageResult = PageResult<UavCameraHangar[]>;
