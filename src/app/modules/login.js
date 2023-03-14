const { userAuth } = require('../../config/config')
const constructor = require('../utils/reqConstructor')

module.exports = async () => {
   const session = userAuth.checkSession()
   const { token, customerId, customerName } =
      session ||
      (await userAuth.login(userAuth.number, userAuth.password)).getSession()

   return {
      headers: constructor.headers(token),
      payload: constructor.payload({ number: userAuth.number, customerId }),
      customerName,
   }
}
