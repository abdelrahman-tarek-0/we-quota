const prompt = require("prompt-sync")({ sigint: true });
const app = require("./app/app.js")
const { weData, user } = app

if (user.checkUser()) {
    weData().then((data) => {
        console.log(data);
    })
} else {
    console.log("Please login , [1] for web login or [2] for cli login");
    const loginType = prompt("Enter your choice: ");
    if (loginType == 1) {
        user.login({ web: true }).then((data) => {
            console.log("Login successful");
        })
    }
    else if (loginType == 2) {
        const number = prompt("Enter your number: ");
        const password = prompt("Enter your password: ");
        user.login({ number, password }).then((data) => {
            console.log("Login successful");
        }).catch((err) => {
            console.log(err);
        })
    }

}
    

