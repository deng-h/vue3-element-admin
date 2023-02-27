import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import {MidProdModel, MidProdModelPageResult, MidProdModelQuery} from "@/api/midproduct/model/types";

const api_name = '/midproduct/model'

// 分页查询
export function listMidProdModelPages(queryParams?: MidProdModelQuery):AxiosPromise<MidProdModelPageResult>{
  return request({
    url: `${api_name}/modelPages`,
    method: 'get',
    params: queryParams
  })
}

//获取详情
export function getMidProdModelDetail(id: string): AxiosPromise<MidProdModel>{
  return request({
    url: `${api_name}/` + id,
    method: 'get'
  });
}

// 添加
export function addMidProdModel(data: MidProdModel){
  return request({
    url: `${api_name}`,
    method: 'post',
    data: data
  });
}

// 更新
export function updateMidProdModel(data: MidProdModel){
  return request({
    url: `${api_name}`,
    method: 'put',
    data: data
  });
}

// 删除
export function deleteMidProdModel(ids: string){
  return request({
    url: `${api_name}/` + ids,
    method: 'delete'
  });
}

export function getModelAndCategoryNameByModel(model: string){
  return request({
    url: `${api_name}/modelAndCategoryNameByModel`,
    method: 'get',
    params: {model: model}
  });
}
