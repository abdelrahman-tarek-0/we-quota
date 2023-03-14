const axios = require("axios");
const { usageUrl, balanceUrl } = require("../../config/config");

module.exports = async ({ headers, payload, customerName }) => {
  try {
    let usageRes = await axios.post(usageUrl, payload, { headers });
    
    let balanceRes = await axios.post(balanceUrl, payload, { headers });
    // let balanceRes = { data: { body: { balance: null, msisdn: null } } }; 

    if (
      !usageRes?.data?.body?.detailedLineUsageList ||
      !usageRes?.data?.body?.summarizedLineUsageList ||
      !balanceRes?.data?.body
    )
      throw new Error("Error happened getting usage info please re login");

    return {
      balance: {
        ...balanceRes?.data?.body,
        customerName,
      },
      supInfos: usageRes?.data?.body?.detailedLineUsageList,
      summery: usageRes?.data?.body?.summarizedLineUsageList,
    };
  } catch (error) {
    throw error;
  }
};
