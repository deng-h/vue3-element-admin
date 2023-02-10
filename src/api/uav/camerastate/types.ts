// 分页列表项
export interface UavCameraState{
  id: string;
  categoryId: string;  // 分类id,与机库id相关联
  categoryName: string; // 分组名称,与机库hangar_category相关联
  cameraId: string;  // 对应摄像头编号
  cameraUrl: string; // 每个摄像头对应的url地址
  cameraAccessToken: string; // 每个摄像头对应的accesstoken一个账户的都是同个
  gmtCreate: Date;
  gmtModified: Date;
}


// 查询参数类型
export interface CameraStateQuery extends PageQuery{
  keywords?: string;
}

export interface CameraStateForm{
  id: string;
  categoryId: string;  // 分类id,与机库id相关联
  cameraId: string;  // 对应摄像头编号
  cameraUrl: string; // 每个摄像头对应的url地址
}

export type CameraStatePageResult = PageResult<UavCameraState[]>
