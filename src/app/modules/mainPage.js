const axios = require('axios')
const validator = require('../utils/validator')
const { usageUrl, balanceUrl } = require('../../config/config')

module.exports = async ({ headers, payload, customerName }) => {
   const usageRes = await axios.post(usageUrl, payload, { headers })
   const balanceRes = await axios.post(balanceUrl, payload, { headers })

   if (!validator.usageBalance(usageRes,balanceRes))
      throw new Error('Error happened getting usage info please re login')
   
   return {
      balance: {
         ...balanceRes?.data?.body,
         customerName,
      },
      supInfos: usageRes?.data?.body?.detailedLineUsageList,
      summery: usageRes?.data?.body?.summarizedLineUsageList,
   }
}
