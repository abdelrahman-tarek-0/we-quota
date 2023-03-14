const fs = require('fs')
require('dotenv').config()

const { login, loginWeb } = require('we-te-login')

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
const userAuth = {
   number: db.read().number,
   password: db.read().password,
   getSession: () => db.read().session,
   setSession: function (token, customerId, customerName) {
      const iat = Math.floor(Date.now() / 1000)
      const exp = Math.floor(Date.now() / 1000) + 3.5 * 60 * 60
      db.write({
         password: this.password,
         number: this.number,
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
   checkSession: function () {
      const session = this.getSession()
      if (
         session?.exp > Math.floor(Date.now() / 1000) &&
         session?.customerId &&
         session?.token &&
         session?.customerName
      ) {
         return session
      }
      return null
   },
   login: async function (num, pswd) {
      let data = {}
      if (num && pswd) {
         data = await login(num, pswd)
      } else {
         data = await loginWeb()
      }
      this.number = data.number
      this.password = data.password
      this.setSession(data.token, data.customerId, data.customerName)
      return this
   },
}

// your_password
// 022123456

module.exports = { preTokenUrl, loginUrl, usageUrl, balanceUrl, db, userAuth }
