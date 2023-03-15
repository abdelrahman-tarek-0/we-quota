const login = require('./modules/login')
const mainPage = require('./modules/mainPage')

const userAuth = require('../database/users.model')

const app = () =>
   login()
      .then(mainPage)
      .then((data) => {
         console.log(data)
      })

if (!userAuth.number || !userAuth.password) {
   console.log('please login ')
   userAuth.login().then((user) => {
      console.log("your current session: ");
      console.log(user.getSession());
      app()
   })
} else {
   console.log("your current session: ");
   console.log(userAuth.getSession());   
   app()
}
