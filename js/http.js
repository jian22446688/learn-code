/*
 * @Description: 所有文件
 * @Author: Cary
 * @Date: 2020-12-16 09:18:27
 * @FilePath: \excel-to-jsone:\work\node-project\learn-code\js\http.js
 */

const { default: Axios } = require('axios');
Axios.default.withCredentials = true;
// http://ucollege.china-cbi.net/index.php?m=Api&agency=3&test_show
const Config = {
  url: 'http://ucollege.china-cbi.net',
  timeout: 10000 // request timeout
}

const service = Axios.create({
  baseURL: Config.url,
  timeout: Config.timeout
})

// interceptors

// 请求前拦截
service.interceptors.request.use(config => {
  if (config.method.toLocaleLowerCase() == 'post') {
    // config.headers =  {'Content-Type': 'application/x-www-form-urlencoded'}
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  return config
}, error => {
  console.error('request error')
  return Promise.reject(error)
})

// 请求后拦截
service.interceptors.response.use(response => {
  const { data } = response
  return data
}, error => {
  console.error('res error')
  return Promise.reject(error)
})

/**
 * post 请求
 */
// modules.export.post = (url, data) => {
//   return service({
//     url: url,
//     method: 'post',
//     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//     data
//   })
// }

// /**
//  * get 请求
//  */
// modules.export.get = (url, data) => {
//   return service({
//     url,
//     method: 'get',
//     data
//   })
// }

module.exports = service
