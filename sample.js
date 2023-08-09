const axios = require('axios')
const https = require('https')
const FormData = require('form-data')
const REQUESTS = require('./requests')
const utils = require("./utilities")
const { parseErr, ERRORS } = require("./helpers/err_helpers") 
const _ = require("lodash")

const DELAY = 1*1000
const BG_DELAY = 60*1000

const recurRequest = (server, currentCookie, request) => {
	//console.clear()
	console.log(`Start recurring ${request.name} for ${server}`)
	utils.prepCookie(currentCookie).then((cookie) => {
		request(server, cookie).then((resp) => {
			//console.log(resp)
			console.log("success")
			setTimeout(() => {recurRequest(server, cookie, request)}, DELAY)
		}).catch((err) => {
			let errType = parseErr(err)
			if (errType == ERRORS.FORCED_ERR) {
				setTimeout(() => {recurRequest(server, cookie, request)}, DELAY)
			}
			else {
				console.log({err})
				setTimeout(() => {recurRequest(server, "", request)}, BG_DELAY)
			}
		})
	}).catch(err => {
		setTimeout(() => {recurRequest(server, "", request)}, DELAY)
	})
}

const doProxy = (server) => {
	console.log("Start server ", server)
	utils.prepCookie().then(cookie => {
		REQUESTS.forEach((request) => {
			recurRequest(server, cookie, request)
		})
	})
}

servers = []
for (let i = 1; i <= 18; i++) servers.push(`eu${i}`) 
for (let i = 1; i <= 18; i++) servers.push(`us${i}`)

servers.forEach((server) => doProxy(server))
//doProxy(servers[0])