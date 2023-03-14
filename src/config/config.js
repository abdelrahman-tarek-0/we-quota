require('dotenv').config()

const url = 'https://api-my.te.eg/api'
const preTokenUrl = `${url}/user/generatetoken?channelId=WEB_APP`
const loginUrl = `${url}/user/login?channelId=WEB_APP`
const usageUrl = `${url}/line/freeunitusage`
const balanceUrl = `${url}/line/balance`

module.exports = { preTokenUrl, loginUrl, usageUrl, balanceUrl }
