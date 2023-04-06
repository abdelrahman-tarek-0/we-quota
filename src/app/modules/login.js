const userAuth = require('../model/users.model')
const constructor = require('../utils/reqConstructor')

module.exports = async () => {
   const { token, customerId, customerName } = userAuth.checkSession() || (await userAuth.login()).getSession();

   return {
      headers: constructor.headers(token),
      payload: constructor.payload({
         number: userAuth.getNumber(),
         customerId,
      }),
      customerName,
   }
}
