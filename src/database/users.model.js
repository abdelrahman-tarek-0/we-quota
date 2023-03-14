const { login, loginWeb } = require('we-te-login')
const db = require("./manager.db")

module.exports = {
    number: db.read().number,
    password: db.read().password,
    getSession: () => db.read().session,
    setSession: function (token, customerId, customerName) {
       const iat = Math.floor(Date.now() / 1000)
       const exp = Math.floor(Date.now() / 1000) + 3.5 * 60 * 60
       db.write({
          password: this.password,
          number: this.number,
          browserPath: this.browserPath,
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
          data = await login(num, pswd,{skipEncryption:true})
       } else {
          data = await loginWeb()
       }
       this.number = data.number
       this.password = data.password
       this.setSession(data.token, data.customerId, data.customerName)
       return this
    },
 }