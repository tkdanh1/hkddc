const axios = require('axios')

const random = (min, max) => {
  return parseInt(Math.random() * (max - min) + min)
}

const parseCookie = (response) => {
  let headerCookie = response.headers['set-cookie']
  let cookie = headerCookie.find((item) => item.startsWith("PHPSESSID"))
  let sid = cookie.split("=")[1].split(";")[0]
  
  return `PHPSESSID=${sid};`
}

const fetchCookie = () => {
  return new Promise((resolve, reject) => {
    axios.get("https://www.proxysite.com").then((resp) => {
      let cookie = parseCookie(resp)

      resolve(cookie)
    })
  })
}

const prepCookie = (currentCookie) => {
  return new Promise((resolve, reject) => {
    if (currentCookie) {
      resolve(currentCookie)
    }
    else {
      fetchCookie().then((newCookie) => {
        resolve(newCookie)
      })
    }
  })
}

const utils = {random, parseCookie, fetchCookie, prepCookie}

module.exports = utils