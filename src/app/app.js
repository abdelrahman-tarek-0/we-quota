const login = require('./modules/login')
const mainPage = require('./modules/mainPage')
const user = require('./model/users.model')

const weData = async () => {
   const { headers, payload, customerName } = await login()
   const data = await mainPage({ headers, payload, customerName })
   
   return data
}

// export weData to preform the necessary requests to get the data from we te api
// export user to manipulate the user data stored in the db
module.exports = {weData, user}
