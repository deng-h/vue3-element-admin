import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import {MidProdPlanPageResult, MidProdPlanQuery} from "@/api/midproduct/plansetting/types";
const api_name = '/midproduct/plansetting'


export function listMidProdPlanPages(queryParams?: MidProdPlanQuery): AxiosPromise<MidProdPlanPageResult>{
  return request({
    url: `${api_name}/planPages`,
    method: 'get',
    params: queryParams
  });
}
