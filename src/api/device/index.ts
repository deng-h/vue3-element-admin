import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import {GxPe3Host1PageResult, GxPe3HostQuery} from "@/api/device/types";

const api_name = '/device/gxpe63_host1'

/**
 * 获取分页列表
 * @param queryParams
 */
export function listGxPe3Host1Pages(queryParams: GxPe3HostQuery): AxiosPromise<GxPe3Host1PageResult>{
  return request({
    url: `${api_name}/gxpe63Host1Pages`,
    method: "get",
    params: queryParams

  });
}
