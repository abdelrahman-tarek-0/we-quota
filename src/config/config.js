const fs = require('fs')
require('dotenv').config()

const url = 'https://api-my.te.eg/api'
const preTokenUrl = `${url}/user/generatetoken?channelId=WEB_APP`
const loginUrl = `${url}/user/login?channelId=WEB_APP`
const usageUrl = `${url}/line/freeunitusage`
const balanceUrl = `${url}/line/balance`
const file = `${__dirname}/config.json`

const db = {
   read: () => {
      try {
         return JSON.parse(fs.readFileSync(file))
      } catch (error) {
         throw error
      }
   },
   write: (data) => {
      try {
         return fs.writeFileSync(file, JSON.stringify(data))
      } catch (error) {
         throw error
      }
   },
}
const { password, number } = db.read()
const userAuth = {
   number,
   password,
}

const getSession = () => db.read().session
const setSession = (token, customerId, customerName) => {
   const iat = Math.floor(Date.now() / 1000)
   const exp = Math.floor(Date.now() / 1000) + 3.5 * 60 * 60
   const { password } = userAuth
   const { number } = userAuth
   console.log(userAuth.browserPath)
   db.write({
      password,
      number,
      browserPath: userAuth.browserPath,
      session: {
         customerId,
         customerName,
         iat,
         exp,
         token,
      },
   })
}
// your_password
// 022123456

module.exports = { preTokenUrl, loginUrl, usageUrl, balanceUrl, db, userAuth }
