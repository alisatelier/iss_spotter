const { nextISSTimesForMyLocation } = require("./iss_promised.js");
const { printPassTimes } = require("./index.js");

nextISSTimesForMyLocation()
  .then((passtimes) => {
    printPassTimes(passtimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
