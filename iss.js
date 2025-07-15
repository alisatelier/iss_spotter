
const needle = require('needle');

// const fetchMyIP = function(callback) {
//   const url = `https://api.ipify.org?format=json`;

//   needle.get(url, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }

//     const ip = response.body.ip;
//     callback(null, ip);
//   });
// };

// const fetchCoordsByIP = function(ip, callback) {
//   const urlCoords = `http://ipwho.is/${ip}`;

//   needle.get(urlCoords, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     if (response.statusCode !== 200) {
//       callback(Error(`❌ HTTP error: Status Code ${response.statusCode} from ${urlCoords}`), null);
//       return;
//     }

//     const data = response.body;

//     // 3️⃣ API returned success: false (e.g., invalid IP)
//     if (!data.success) {
//       const message = `Success status was false. Server message: ${data.message} for IP ${data.ip}`;
//       callback(Error(message), null);
//       return;
//     }


//     const latitude = data.latitude;
//     const longitude = data.longitude;

//     if (latitude === undefined || longitude === undefined) {
//       callback(Error(`❌ Missing coordinates in response for IP ${ip}.`), null);
//       return;
//     }
//     const coords = { latitude, longitude };
//     callback(null, coords);
//   });
// };


fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;
  const issUrl = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  

  needle.get(issUrl, (error, response) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`❌ HTTP error: Status Code ${response.statusCode} from ${urlCoords}`), null);
      return;
    }
    const data = response.body;

    if (data.message !== "success") {
      callback(Error(`❌ API did not return success: ${JSON.stringify(data)}`), null);
      return;
    }

    const passes = data.response;
    callback(null, passes);

  });

};
module.exports = { fetchISSFlyOverTimes };