const fs = require('fs')
require('dotenv').config()

const { loginWeb } = require('we-te-login')

const url = 'https://api-my.te.eg/api'
const preTokenUrl = `${url}/user/generatetoken?channelId=WEB_APP`
const loginUrl = `${url}/user/login?channelId=WEB_APP`
const usageUrl = `${url}/line/freeunitusage`
const balanceUrl = `${url}/line/balance`
const file = `${__dirname}/config.json`

const db = {
   read: () => JSON.parse(fs.readFileSync(file)),
   write: (data) => fs.writeFileSync(file, JSON.stringify(data)),
}
const { password, number } = db.read()
const userAuth = {
   number,
   password,
   getSession: () => db.read().session,
   setSession: (token, customerId, customerName) => {
      const iat = Math.floor(Date.now() / 1000)
      const exp = Math.floor(Date.now() / 1000) + 3.5 * 60 * 60
      const { password: pswd } = userAuth
      const { number: num } = userAuth
      db.write({
         password: pswd,
         number: num,
         browserPath: userAuth.browserPath,
         session: {
            customerId,
            customerName,
            iat,
            exp,
            token,
         },
      })
   },
   weLogin: async function () {
      const data = await loginWeb()

      this.number = data.number
      this.password = data.password
      this.setSession(data.token, data.customerId, data.customerName)
      return this
   },
}

// your_password
// 022123456

module.exports = { preTokenUrl, loginUrl, usageUrl, balanceUrl, db, userAuth }
