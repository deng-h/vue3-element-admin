import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { LoginForm } from './types';

export function loginApi(data: LoginForm): AxiosPromise<string> {
  return request({
    url: '/login',
    method: 'post',
    params: data,
    headers: {
      Authorization: 'Basic dnVlMy1lbGVtZW50LWFkbWluOnNlY3JldA==' // 客户端信息Base64明文：vue3-element-admin:secret
    }
  });
}

export function logoutApi() {
  return request({
    url: '/api/v1/auth/logout',
    method: 'delete'
  });
}

