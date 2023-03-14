module.exports  = {
   headers: (token) => {
      return {
         Jwt: token,
         'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
         Host: 'api-my.te.eg',
         Origin: 'https://my.te.eg',
         Referer: 'https://my.te.eg/',
      }
   },
   payload: ({ number, customerId }) => {
      return {
         body: {},
         header: {
            msisdn: number,
            customerId,
            numberServiceType: 'FBB',
            locale: 'en',
         },
      }
   },
}