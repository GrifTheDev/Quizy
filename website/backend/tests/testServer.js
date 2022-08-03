const { default: axios } = require("axios");

/* axios.get("http://localhost:3000").then(response => {
    console.log(response.data, response.headers);
}).catch(error => {
    console.log(error);a
}) */

// make a post request to the server
axios.post("http://192.168.1.5:3001", {
    firstName: "John",
    lastName: "Doe"
}).then(response => {
    console.log(response.data, response.headers);
}).catch(error => {
    console.log(error);
})
