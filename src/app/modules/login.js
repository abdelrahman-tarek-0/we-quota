const { login } = require('we-te-login')
const { userAuth } = require('../../config/config')

module.exports = async () => {
   let token,customerId,customerName;

   let session = userAuth.getSession();
   if (
      session?.exp > Math.floor(Date.now() / 1000) &&
      session?.customerId &&
      session?.token &&
      session?.customerName
   ) {
      token = session?.token
      customerId = session?.customerId
      customerName = session?.customerName
   }else{
      console.log("logging");
      const res = await login(userAuth.number, userAuth.password)
      token = res.token
      customerId = res.customerId
      customerName = res.customerName
      userAuth.setSession(token,customerId,customerName)
   }

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
