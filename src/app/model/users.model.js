const { login: weLogin, loginWeb } = require('we-te-login')
const db = require('../../database/manager.db.js')

// you could fix performance by tracking the state of the user instead of reading from the db every time
class User {
   #password
   #number
   #session = {}

   constructor() {
      this.load()
   }

   getNumber = () => this.#number
   getPassword = () => this.#password
   getSession = () => this.#session
   getUser = () => {
      return {
         password: this.#password,
         number: this.#number,
         session: this.#session,
      }
   }
   checkUser = () => {
      this.load()
      return !!(this.#number && this.#password)
   }

   setNumber = (number) => {
      this.#number = number
      this.save()
      return this
   }
   setPassword = (password) => {
      this.#password = password
      this.save()
      return this
   }
   setSession = (token, customerId, customerName) => {
      const iat = Math.floor(Date.now() / 1000)
      const exp = Math.floor(Date.now() / 1000) + 3.5 * 60 * 60
      this.#session = {
         token,
         customerId,
         customerName,
         iat,
         exp,
      }
      this.save()
   }
   setUser = (number, password) => {
      this.#password = password || this.#password
      this.#number = number || this.#number
      this.save()
      return this
   }

   checkSession = () => {
      const { exp, token, customerId, customerName } = this.#session
      if (
         exp > Math.floor(Date.now() / 1000) &&
         token &&
         customerId &&
         customerName
      )
         return this.#session
      return null
   }

   flushSession = () => {
      this.#session = {}
      this.save()
   }

   login = async (opts = { web: false, number: '', password: '' }) => {
      let data
      if (opts.web) {
         data = await loginWeb()
         this.setNumber(data.number)
         this.setPassword(data.password)
      } else if (opts.number && opts.password) {
         data = await weLogin(opts.number, opts.password)
         this.setNumber(opts.number)
         this.setPassword(opts.password)
      } else {
         data = await weLogin(this.#number, this.#password, {
            skipEncryption: true,
         })
      }
      const { token, customerId, customerName } = data
      this.setSession(token, customerId, customerName)
      return this
   }

   load = () => {
      const u = db.read()
      this.#password = u?.password
      this.#number = u?.number
      this.#session = u?.session
      return this
   }

   save = () => {
      db.write({
         password: this.#password,
         number: this.#number,
         session: this.#session,
      })
      return this.load()
   }
}

module.exports = new User()
