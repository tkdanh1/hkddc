const axios = require('axios')
const https = require('https')
const FormData = require('form-data')
const utils = require("./utilities")
const strftime = require('strftime')
const _ = require("lodash")
const fs =  require ( 'fs' ) ;

const prepProxyUrl = (proxyCode) => {
  return `https://${proxyCode}.proxysite.com/includes/process.php?action=update`
}

const prepFormData = (proxyCode, dest) => {
  let formData = new FormData()
  formData.append("server-option", proxyCode)
  formData.append("d", dest)
  formData.append("allowCookies", "on")

  return formData
}

const prepAxiosArgs = (proxyCode, currentCookie, formData) => {
  let url = prepProxyUrl(proxyCode)

  let headers = {"Content-Type": "multipart/form-data", 'Cookie': currentCookie}


  return { method: "POST", url, data: formData, headers, 
    validateStatus: function(status) {return false}}
}

const getArticles = (proxyCode, cookie) => {
  let size = 30 + utils.random(0, 9)
  let dest = `https://api-prod.diemdaochieu.com/article/client/recent-posts?size=${size}`
  let formData = prepFormData(proxyCode, dest)
  let args = prepAxiosArgs(proxyCode, cookie, formData)

  return axios(args)
}

const getMarketNews = (proxyCode, cookie) => {
  let size = 30 + utils.random(0, 9)
  let dest = `https://api-prod.diemdaochieu.com/market/news?size=${size}`
  let formData = prepFormData(proxyCode, dest)
  let args = prepAxiosArgs(proxyCode, cookie, formData)

  return axios(args)
}

const getCommunityComments = (proxyCode, cookie) => {
  let size = 30 + utils.random(0, 9)
  let dest = `https://api-prod.diemdaochieu.com/client/data/community?limit=${size}`
  let formData = prepFormData(proxyCode, dest)
  let args = prepAxiosArgs(proxyCode, cookie, formData)

  return axios(args)
}

const getDdcNews = (proxyCode, cookie) => {
  let size = 30 + utils.random(0, 9)
  let dest = `https://api-prod.diemdaochieu.com/market/ddc-news?size=${size}`
  let formData = prepFormData(proxyCode, dest)
  let args = prepAxiosArgs(proxyCode, cookie, formData)

  return axios(args)
}

const getImage = (proxyCode, cookie) => {
  let size = 1900 + utils.random(10, 199)
  let dest = "https://api-prod.diemdaochieu.com/assets/images/8678cf94-c0e9-460f-b86b-f541c63db564.png"
  let formData = prepFormData(proxyCode, dest)
  let args = prepAxiosArgs(proxyCode, cookie, formData)

  return axios(args)
}

const getRawStocksData = (proxyCode, cookie) => {
  let from = (() => {
    let baseStart = new Date(2018, 0, 1)
    let randStart = Math.random(1, 100)
    let temp = baseStart.setDate(baseStart.getDate() + randStart)
    return strftime('%Y-%m-%d', new Date(temp))
  })()

  let to = (() => {
    let baseEnd = new Date()
    let randEnd = Math.random(1, 100)
    let temp1 = baseEnd.setDate(baseEnd.getDate() + randEnd)
    return strftime('%Y-%m-%d', new Date(temp1))
  })()

  let stocks = fs.readFileSync("./datasource/stock_list.txt", {  encoding :  'utf8'  }).toString().split("\n")
  let code = _.sample(stocks).trim();
  let dest = `https://api-prod.diemdaochieu.com/api/v1/file/data/raw?code=${code}&from=${from}&to=${to}`

  let formData = prepFormData(proxyCode, dest)
  let args = prepAxiosArgs(proxyCode, cookie, formData)

  return axios(args)
}

const getIndex3Y = (proxyCode, cookie) => {
  let stocks = fs.readFileSync("./datasource/index.txt", {  encoding :  'utf8'  }).toString().split("\n")
  let ticket = _.sample(stocks).trim();
  let dest = `https://api-prod.diemdaochieu.com/market/indicators/index?timeStage=_3Y&ticker=${ticket}`
  let formData = prepFormData(proxyCode, dest)
  let args = prepAxiosArgs(proxyCode, cookie, formData)

  return axios(args)
}

const getIndex1Y = (proxyCode, cookie) => {
  let stocks = fs.readFileSync("./datasource/index.txt", {  encoding :  'utf8'  }).toString().split("\n")
  let ticket = _.sample(stocks).trim();
  let dest = `https://api-prod.diemdaochieu.com/market/indicators/index?timeStage=_1Y&ticker=${ticket}`
  let formData = prepFormData(proxyCode, dest)
  let args = prepAxiosArgs(proxyCode, cookie, formData)

  return axios(args)
}

const getIndex3M = (proxyCode, cookie) => {
  let stocks = fs.readFileSync("./datasource/index.txt", {  encoding :  'utf8'  }).toString().split("\n")
  let ticket = _.sample(stocks).trim();
  let dest = `https://api-prod.diemdaochieu.com/market/indicators/index?timeStage=_3M&ticker=${ticket}`
  let formData = prepFormData(proxyCode, dest)
  let args = prepAxiosArgs(proxyCode, cookie, formData)

  return axios(args)
}

const getIndex1M = (proxyCode, cookie) => {
  let stocks = fs.readFileSync("./datasource/index.txt", {  encoding :  'utf8'  }).toString().split("\n")
  let ticket = _.sample(stocks).trim();
  console.log(ticket)
  let dest = `https://api-prod.diemdaochieu.com/market/indicators/index?timeStage=_1M&ticker=${ticket}`
  let formData = prepFormData(proxyCode, dest)
  let args = prepAxiosArgs(proxyCode, cookie, formData)

  return axios(args)
}
const REQUESTS = (() => {
  return [
      getArticles,
      getMarketNews,
      getCommunityComments,
      getDdcNews,
      getArticles,
      getMarketNews,
      getCommunityComments,
      getDdcNews,
     getIndex1M,
     getIndex3Y,
     getIndex1Y,
     getIndex3M,
     getIndex1M,
     getIndex3Y,
     getIndex1Y,
     getIndex3M,
     
    //getImage,
    //getRawStocksData
  ]
})()

module.exports = REQUESTS