import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import {FixedParamPageResult, ParamQuery, RealParamPageResult} from "@/api/pedal/types";

/**
 * 获取踏板固定参数分页数据
 * @param queryParams
 */
export function listFixedParamPages(queryParams: ParamQuery): AxiosPromise<FixedParamPageResult> {
  return request({
    url: '/pedal/fixed/pages',
    method: 'get',
    params: queryParams
  });
}

/**
 * 获取踏板实时参数分页数据
 * @param queryParams
 */
export function listRealParamPages(queryParams: ParamQuery): AxiosPromise<RealParamPageResult> {
  return request({
    url: '/pedal/real/pages',
    method: 'get',
    params: queryParams
  });
}
