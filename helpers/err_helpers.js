const _ = require("lodash")

const ERRORS = {
  BAD_GATEWAY: "BAD_GATEWAY",
  FORCED_ERR: "FORCED_ERR",
  UNKNOWN: "UNKNOWN"
}

const parseErr = (errReponse) => {
  let status = _.get(errReponse, "response.status")
  if (status == 200) return ERRORS.FORCED_ERR

  let respData = _.get(errReponse, "response.data", "")
  if ((/bad gateway/i).test(respData)) return ERRORS.BAD_GATEWAY

  return ERRORS.UNKNOWN
}

module.exports = { parseErr, ERRORS }