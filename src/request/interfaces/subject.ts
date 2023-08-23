
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

// 添加
// 响应接口
export interface AddSubjectRes {
  status: boolean;
  msg: string;
  data: Record<string, unknown>;
  code: number;
}
// 参数接口
export interface AddSubjectParams {
  name?: string;
  description?: string;
}