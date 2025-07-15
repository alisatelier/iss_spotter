const needle = require('needle');

//fetches your current IP Address
const fetchMyIP = function(callback) {
  const url = `https://api.ipify.org?format=json`;

  needle.get(url, (error, response) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response.body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = response.body.ip;
    callback(null, ip);
  });
};

//fetches your current Coordinates (Lat & Lon)
const fetchCoordsByIP = function(ip, callback) {
  const urlCoords = `http://ipwho.is/${ip}`;

  needle.get(urlCoords, (error, response) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`HTTP error: Status Code ${response.statusCode} from ${urlCoords}`), null);
      return;
    }

    const data = response.body;

    if (!data.success) {
      const message = `Success status was false. Server message: ${data.message} for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }

    const latitude = data.latitude;
    const longitude = data.longitude;

    if (latitude === undefined || longitude === undefined) {
      callback(Error(`Missing coordinates in response for IP ${ip}.`), null);
      return;
    }

    const coords = { latitude, longitude };
    callback(null, coords);
  });
};

//fetches flyover times for the ISS
const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;
  const issUrl = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  needle.get(issUrl, (error, response) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`HTTP error: Status Code ${response.statusCode} from ${issUrl}`), null);
      return;
    }

    if (!response.body) {
      callback(Error(`No response body received from ${issUrl}`), null);
      return;
    }

    const data = response.body;

    if (data.message !== "success") {
      callback(Error(`API did not return success: ${JSON.stringify(data)}`), null);
      return;
    }

    if (!Array.isArray(data.response)) {
      callback(Error(`Unexpected response format: 'response' field is missing or not an array.`), null);
      return;
    }

    const passes = data.response;
    callback(null, passes);
  });
};

//chains functions together
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, flyoverTimes) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, flyoverTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
