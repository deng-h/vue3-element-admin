import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import {MidProdCategory, MidProdCategoryPageResult, MidProdCategoryQuery} from "@/api/midproduct/category/types";
const api_name = '/midproduct/category'


// 分页查询
export function listMidProdCategoryPages(queryParams?: MidProdCategoryQuery): AxiosPromise<MidProdCategoryPageResult>{
  return request({
    url: `${api_name}/categoryPages`,
    method: 'get',
    params: queryParams
  });
}

//获取详情
export function getMidProdCategoryDetail(id: string): AxiosPromise<MidProdCategory>{
  return request({
    url: `${api_name}/` + id,
    method: 'get'
  });
}

// 更新
export function updateMidProdCategory(id: string, data: string){
  return request({
    url: `${api_name}/` + id,
    method: 'put',
    params:{
      categoryName: data
    }
  });
}

// 添加
export function addMidProdCategory(data: string){
  return request({
    url: `${api_name}`,
    method: 'post',
    params:{
      categoryName: data
    }
  });
}

// 删除
export function deleteMidProdCategory(ids: string){
  return request({
    url: `${api_name}/` + ids,
    method: 'delete'
  });
}

export function getMidProdCategoryNameList(){
  return request({
    url: `${api_name}/categoryNameList`,
    method: 'get',
  });
}
