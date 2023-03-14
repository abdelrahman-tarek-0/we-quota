const login = require("./modules/login");
const mainPage = require("./modules/mainPage");

const app = () => {
  return login()
    .then(mainPage)
    .then((data) => {
      console.log(data);
    })
};

app()
