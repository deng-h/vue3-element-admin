import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DeptForm, DeptQuery, Dept } from './types';

/**
 * 部门树形表格
 * @param queryParams
 */
export function listDepartments(queryParams?: DeptQuery): AxiosPromise<Dept[]> {
  return request({
    url: '/dept',
    method: 'get',
    params: queryParams
  });
}

/**
 * 部门下拉列表
 */
export function listDeptOptions(): AxiosPromise<OptionType[]> {
  return request({
    url: '/dept/options',
    method: 'get'
  });
}

/**
 * 获取部门详情
 *
 * @param id
 */
export function getDeptForm(id: string): AxiosPromise<DeptForm> {
  return request({
    url: '/dept/' + id + '/form',
    method: 'get'
  });
}

/**
 * 新增部门
 *
 * @param data
 */
export function addDept(data: DeptForm) {
  return request({
    url: '/dept',
    method: 'post',
    data: data
  });
}

/**
 *  修改部门
 *
 * @param id
 * @param data
 */
export function updateDept(id: string, data: DeptForm) {
  return request({
    url: '/dept/' + id,
    method: 'put',
    data: data
  });
}

/**
 * 删除部门
 *
 * @param ids
 */
export function deleteDept(ids: string) {
  return request({
    url: '/dept/' + ids,
    method: 'delete'
  });
}
