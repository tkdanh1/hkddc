const axios = require('axios')
const https = require('https')
const FormData = require('form-data')
const utils = require("./utilities")
const strftime = require('strftime')
const _ = require("lodash")
const fs =  require ( 'fs' );
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJpZFwiOjE3MSxcInNlc3Npb25JZFwiOjI0MTE2LFwidXNlcm5hbWVcIjpcImh1bmd2dG0wMEBnbWFpbC5jb21cIixcInJvbGVDb2Rlc1wiOltcIlVTRVJcIl0sXCJwZXJtaXNzaW9uc1wiOltdfSIsInNjb3BlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoiaHR0cHM6Ly9kaWVtZGFvY2hpZXUuY29tIiwiaWF0IjoxNjkxNjA4MjUyLCJleHAiOjIwMDY5NjgyNTJ9.GcNpb0Wl2HqCkBa4dZfpGsfwnsm4AhlZziqn1OdajOd02022tuv8ZZp2kHY1PD4i1_5X9rXbWCIPSpYqIsn1Gw';

const random = (min, max) => {
    return parseInt(Math.random() * (max - min) + min)
  }

const prepPostArgs = (url, formData) => {
    let headers = {"x-ddc-token": token}

    return { method: "post", url, data: formData, headers, 
        validateStatus: function(status) {return false}}
    }

const prepGetArgs = (url) => {
    let headers = {"x-ddc-token": token}

    return { method: "get", url, headers, 
        validateStatus: function(status) {return false}}
    }

const getNotification1 = () => {
    let size = 30 + random(0, 9)
    let url = `http://api-prod.diemdaochieu.com/notification/list?page=0&type=GENERAL&size=${size}`
    let args = prepGetArgs(url)
    return axios(args)
  }
  const getNotification2 = () => {
    let size = 30 + random(0, 9)
    let url = `http://api-prod.diemdaochieu.com/notification/list?page=0&type=REALTIME&size=${size}`
    let args = prepGetArgs(url)
    return axios(args)
  }
  const getNotification3 = () => {
    let size = 30 + random(0, 9)
    let url = `http://api-prod.diemdaochieu.com/notification/list?page=0&type=BUY_SALE&size=${size}`
    let args = prepGetArgs(url)
    return axios(args)
  }
const groupByType = () => {
    let url = `http://api-prod.diemdaochieu.com/notification/group-by-type`
    let args = prepGetArgs(url)
    return axios(args)
  }

//   const markRead = () => {
//     let url = `http://api-prod.diemdaochieu.com/notification/mark-all-read`
//     let args = prepPostArgs(url, {})
//     return axios(args)
//   }  

const REQUESTS2 = (() => {
    return [
    getNotification1,
    getNotification3,
    getNotification2,
    groupByType,
    ]
  })()
  
  module.exports = REQUESTS2