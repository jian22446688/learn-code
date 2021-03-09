/*
 * @Description: 文件及简介
 * @Author: Cary
 * @Date: 2020-12-16 09:08:57
 * @FilePath: \excel-to-jsone:\work\node-project\learn-code\js\test.js
 */
const fs = require('fs');
 const http = require('./http');


//  async function indexAction() {
//   const res = await http.post('/index.php?m=Api&agency=3&test_show', {

//   })
//   console.log('res', res)
// }


// http://ucollege.china-cbi.net/index.php?m=Api&agency=3&class_list&act=class_list&pn=999999&pg=1&col=class_hour&order=desc&grouping_id1=0&grouping_id2=0&no_package=1&u_token=-1

// - 课程详情

// get
// http://ucollege.china-cbi.net/index.php?m=Api&agency=3&class_catalog&act=class_catalog&cid=249&u_token=-1

// let list = require('./data/allclass.json').list
// let typeList = require('./data/typeclass.json').list
let list = []
let typeList =[]
// let typeList = require('./data/typeclass.json').list
const path = require('path')
let file = path.resolve(__dirname, './file.txt')

let reqIndex = 0

let resList = []

/**
 * 获取分类
 */
function getCategoryList() {
  http.get(`/index.php?m=Api&agency=3&category_list&act=category_list&pn=500&u_token=-1`).then(res => {
    typeList = res.list || []
    
     http.get(`/index.php?m=Api&agency=3&class_list&act=class_list&pn=899999&pg=1&u_token=-1`).then(res => {
      list = res.list || []
      console.log(list.length)
      request()
    })
  })
}

https://peixun.amac.org.cn/

function request() {
  let item = list[reqIndex]
  if (reqIndex + 1 >= list.length || !item) {
    // 异步写入数据到文件
    fs.writeFile(file, JSON.stringify(resList, null, 4), { encoding: 'utf8' }, err => {})
  }
  let id = item.id
  http.get(`/index.php?m=Api&agency=3&class_catalog&act=class_catalog&cid=${id}&u_token=-1`).then(res => {
    console.log(res)
    resList.push({
      id: id,
      name: item.name,
      price: item.price,
      class_id: item.class_id,
      class_hour: item.class_hour,
      class_type_id: item.grouping_id,
      class_time: item.class_time,
      class_group: item.class_group,
      class_cata_name: getTypeStr(item.grouping_id),
      video_number: getVideoNumber(res)
    })

    reqIndex++
    request()
  })
  
}

function getTypeStr(id) {
  let item = typeList.find(e => e.id == id)
  if(!item) return '无分类' 
  return item.name
}

function getVideoNumber(res) {
  let arr = res.list
  let num = 0
  Object.keys(arr).map(e => {
    Object.keys(arr[e].sub_art)
  })
  return num
}

// request(list[0].id)

getCategoryList()
