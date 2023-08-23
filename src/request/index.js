//在index.js中引入axios
import axios from 'axios';

//保存环境变量
const isPrd = process.env.NODE_ENV == 'production';

//区分开发环境还是生产环境基础URL
const basciUrl = isPrd
  ? 'https://www.fastmock.site/mock/2a33ce9b80a4beec7cbd38ebc613f1a1/'
  : 'https://www.fastmock.site/mock/2a33ce9b80a4beec7cbd38ebc613f1a1/';
const basciUrl2 = `
http://eas-api.edu.koobietech.com/`;

const basicJie = `http://localhost:3000/`;
//设置axios基础路径
const service = axios.create({
  baseURL: basicJie,
  // +'ProductService/'
});

// 响应拦截器
service.interceptors.response.use((response) => {
  //根据返回不同的状态码做不同的事情
  // 这里一定要和后台开发人员协商好统一的错误状态码
  if (response.status) {
    switch (response.status) {
      case 200:
        return response.data;
      case 401:
        //未登录处理方法
        break;
      case 403:
        //token过期处理方法
        break;
      default:
        message.error(response.data.msg);
    }
  } else {
    return response;
  }
});

//最后把封装好的axios导出
export default service;
