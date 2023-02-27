import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import {TeamDefaultTime} from "@/api/midproduct/teamdefaulttime/types";

const api_name = '/midproduct/teamdefaulttime'

export function getDataByTeamType(teamType: string): AxiosPromise<TeamDefaultTime>{
  return request({
    url: `${api_name}/`+teamType,
    method: 'get'
  });
}

// 更新
export function updateTeamDefaultTime(data: TeamDefaultTime){
  return request({
    url: `${api_name}`,
    method: 'put',
    data: data
  });
}
