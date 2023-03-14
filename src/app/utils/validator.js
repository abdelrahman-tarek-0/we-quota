module.exports = {
   usageBalance: (usageRes, balanceRes) => {
      if (
         !usageRes?.data?.body?.detailedLineUsageList ||
         !usageRes?.data?.body?.summarizedLineUsageList ||
         !balanceRes?.data?.body
      ) {
         return false
      }
      return true
   },
}
