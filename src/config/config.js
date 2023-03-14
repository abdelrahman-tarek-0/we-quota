const fs = require("fs");
require("dotenv").config();

const url = "https://api-my.te.eg/api";
const preTokenUrl = `${url}/user/generatetoken?channelId=WEB_APP`;
const loginUrl = `${url}/user/login?channelId=WEB_APP`;
const usageUrl = `${url}/line/freeunitusage`;
const balanceUrl = `${url}/line/balance`
const file = `${__dirname}/config.json`;

const db = {
  read: () => {
    try {
      return JSON.parse(fs.readFileSync(file));
    } catch (error) {
      throw error;
    }
  },
  write: (data) => {
    try {
      return fs.writeFileSync(file, JSON.stringify(data));
    } catch (error) {
      throw error;
    }
  },
};
const { password, number } = db.read();
const userAuth = {
    number,
    password
}
// your_password
// 022123456



module.exports = { preTokenUrl, loginUrl, usageUrl,balanceUrl,db,userAuth};
