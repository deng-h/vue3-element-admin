import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import {CameraStateQuery, CameraStatePageResult, CameraStateForm} from "./types";

const api_name = '/uav/pathplan'

// 获取注册过的摄像头,分页
export function listCameraStatePages(queryParams?: CameraStateQuery): AxiosPromise<CameraStatePageResult>{
  return request({
    url: `${api_name}/camerasPages`,
    method: 'get',
    params: queryParams
  });
}

// 批量删除，多个以英文逗号(,)分割
export function deleteCameraState(ids: string){
  return request({
    url: `${api_name}/deleteCameraState/` + ids,
    method: 'delete'
  });
}

// 添加操作
export function addCameraState(data: CameraStateForm){
  return request({
    url: `${api_name}/addCameraState`,
    method: 'post',
    data: data
  });
}

export function updateCameraState(data: CameraStateForm){
  return request({
    url: `${api_name}/updateCameraState`,
    method: 'put',
    data: data
  });
}
