
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

const fetchCoordsByIP = function(ip, callback) {
  const urlCoords = `http://ipwho.is/${ip}`;

  needle.get(urlCoords, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`❌ HTTP error: Status Code ${response.statusCode} from ${urlCoords}`), null);
      return;
    }

    const data = response.body;

    // 3️⃣ API returned success: false (e.g., invalid IP)
    if (!data.success) {
      const message = `Success status was false. Server message: ${data.message} for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }


    const latitude = data.latitude;
    const longitude = data.longitude;
    const coords = { latitude, longitude };
    callback(null, coords);
  });
};

module.exports = { fetchCoordsByIP };