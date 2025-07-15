const { fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// const myIP = '142.59.180.210';

// fetchCoordsByIP(myIP, (error, data) => {
//    if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned coordinates:', data);
// });

const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(exampleCoords, (err, flyovers) => {
  if (err) {
    console.log("Error:", err.message);
  } else {
    console.log("Upcoming ISS flyovers:");
    for (const pass of flyovers) {
      const datetime = new Date(pass.risetime * 1000);
      console.log(`- ${datetime} for ${pass.duration} seconds`);
    }
  }
});