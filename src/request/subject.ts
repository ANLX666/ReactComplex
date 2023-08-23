//导入我们封装好的axios
import service from './index';

// 参数接口
export interface messageParams {
  id?: number;
  key2?: string;
  children?: [];
  label?: string;
  checked?: string;
}

// 响应接口
export interface message {
  status: string;
  msg: string;
  data: messageParams[];
}
export interface DeleteSubjectsRes {
  status: boolean;
  msg: string;
  data: Record<string, unknown>;
  code: number;
}
export function apiArticleEdit(): Promise<message> {
  return service.get(`messageList/messagelist`);
}

// 参数接口
export interface SelectByConditionParams {
  id?: number;
  name?: string;
  description?: string;
  categoryId?: number;
  createTime?: Record<string, unknown>;
  modifyTime?: Record<string, unknown>;
  createUid?: number;
  disabled?: string;
}

// 查询课程
export function selectByCondition(
  pageNum: number,
  pageSize: number,
  params: any
): Promise<message> {
  return service.post(
    `subject/selectByCondition?pageNum=${pageNum}&pageSize=${pageSize}`,
    params
  );
}

// 删除课程
export function deleteSubjects(id: number): Promise<DeleteSubjectsRes> {
  return service.delete(`/subject/deleteSubjects/${id}`);
}
