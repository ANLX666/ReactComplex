//导入我们封装好的axios
import service from './index';
import {
  messageParams,
  message,
  DeleteSubjectsRes,
  AddSubjectRes,
  AddSubjectParams,
} from './interfaces/subject';
export function apiArticleEdit(): Promise<message> {
  return service.get(`messageList/messagelist`);
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

//添加课程
export function addSubject(params: AddSubjectParams): Promise<AddSubjectRes> {
  return service.post(`/subject/addSubject`, params);
}

// // 查询课程
// export function selectByCondition(pageNum: number, pageSize: number, params: SelectByConditionParams): Promise<SelectByConditionRes> {
//   return service.post(`/subject/selectByCondition?pageNum=${pageNum}&pageSize=${pageSize}`, params);
// }
