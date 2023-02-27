import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import {InitProdStorage, MidProdInitProdPageResult, MidProdInitProdQuery} from "@/api/midproduct/initprodstorage/types";

const api_name = '/midproduct/initprodstorage'

// 分页查询
export function listMidProdInitProdPages(queryParams?: MidProdInitProdQuery): AxiosPromise<MidProdInitProdPageResult>{
  return request({
    url: `${api_name}/storagePages`,
    method: 'get',
    params: queryParams
  });
}


//获取详情
export function getMidProdInitProdDetail(id: string): AxiosPromise<InitProdStorage>{
  return request({
    url: `${api_name}/` + id,
    method: 'get'
  });
}

//修改
export function updateMidProdInitProd(data: InitProdStorage){
  return request({
    url: `${api_name}`,
    method: 'put',
    data: data
  });
}
