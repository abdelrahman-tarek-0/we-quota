const login = require('./modules/login')
const mainPage = require('./modules/mainPage')

const { userAuth } = require('../config/config')

const app = () =>
   login()
      .then(mainPage)
      .then((data) => {
         console.log(data)
      })

if (!userAuth.number || !userAuth.password) {
   console.log('please login ')
   userAuth.weLogin().then((user) => {
      console.log(`thanks ${user.getSession().customerName} for login in`)
   })
} else {
   app()
}
