import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import {CameraHangarPageResult, CameraHangarQuery} from "./types";

const api_name = '/uav/pathplan'

// 获取CameraHangar分页数据
export function listCameraHangarPages(queryParams?: CameraHangarQuery): AxiosPromise<CameraHangarPageResult>{
  return request({
    url: `${api_name}/hangarsPages`,
    method: 'get',
    params: queryParams
  });
}

//获取机库分组数组
export function getHangarCategory(): AxiosPromise{
  return request({
    url: `${api_name}/hangarCategory`,
    method: 'get',
  })
}

// 批量删除，多个以英文逗号(,)分割
export function deleteCameraHangars(ids: string){
  return request({
    url: `${api_name}/deleteCameraHangars/` + ids,
    method: 'delete'
  });
}

// 添加
export function addHangarCategory(data: string){
  return request({
    url: `${api_name}/addHangarCategory`,
    method: 'post',
    params:{
      hangarCategory: data
    }
  });
}

export function updateCameraHangar(id: string, data: string){
  return request({
    url: `${api_name}/updateCameraHangar` + id,
    method: 'put',
    params:{
      hangarCategory: data
    }
  });
}
