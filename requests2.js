const axios = require('axios')
const https = require('https')
const FormData = require('form-data')
const utils = require("./utilities")
const strftime = require('strftime')
const _ = require("lodash")
const fs = require('fs');
const { faker } = require('@faker-js/faker');

//use axios as you normally would, but specify httpsAgent in the config
//curl --proxy "http://118.69.134.0:80" http://api-prod.diemdaochieu.com/api/v1/data/search-stock?code=HSG

const prepPostArgs = (url, formData) => {
  let headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    'Platform': 'WEB'
  }

  const proxy =  {
    protocol: 'http',
    host: '118.69.134.0',
    port: 80
  };


  return {
    method: "post", url, data: formData, headers, proxy,
    validateStatus: function (status) { return false }
  }
}

const signUp = () => {
  let url = `http://api-prod.diemdaochieu.com/auth/signup`

  const randomName = faker.person.fullName(); // Rowan Nikolaus
  const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
  const phoneNumber = faker.phone.number('09########')
  let formData = {
    "fullName": randomName,
    "email": randomEmail,
    "password": phoneNumber,
    "phoneNumber": phoneNumber
  };

  let args = prepPostArgs(url, formData)
  return axios(args)
}

const loginApple = () => {
  let url = `http://api-prod.diemdaochieu.com/auth/login/apple`

  let formData = {
    "identityToken": faker.phone.imei(),
    "authorizationCode": faker.phone.imei(),
    "userIdentifier": faker.phone.imei(),
    "email": faker.internet.email()
  };
  let args = prepPostArgs(url, formData)
  return axios(args)
}


const addContact = () => {
  let url = `http://api-prod.diemdaochieu.com/notification/client/add-contact`

  let formData = {
    "fullName": faker.person.fullName(),
    "phoneNumber": faker.phone.number('09########'),
    "email": faker.internet.email(),
    "title": faker.phone.imei(),
    "content": faker.phone.imei()
  };

  let args = prepPostArgs(url, formData)
  return axios(args)
}

// {"fullName":"afaf","phoneNumber":"0999111111","email":"hfgsd2323@gmail.com","title":"vvv","content":"vvvvvvv"}
// https://api-prod.diemdaochieu.com/notification/client/add-contact

const REQUESTS2 = (() => {
  return [
    signUp,loginApple
  ]
})()

module.exports = REQUESTS2