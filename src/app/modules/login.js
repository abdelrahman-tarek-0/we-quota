const { userAuth } = require('../../config/config')

module.exports = async () => {
   const session = userAuth.checkSession() 
   const { token, customerId, customerName } = session
      ? session
      : (await userAuth.login(userAuth.number, userAuth.password)).getSession()

   const payload = {
      body: {},
      header: {
         msisdn: userAuth.number,
         customerId,
         numberServiceType: 'FBB',
         locale: 'en',
      },
   }
   const headers = {
      Jwt: token,
      'User-Agent':
         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      Host: 'api-my.te.eg',
      Origin: 'https://my.te.eg',
      Referer: 'https://my.te.eg/',
   }

   return { headers, payload, customerName }
}
