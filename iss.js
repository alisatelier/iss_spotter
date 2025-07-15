
const needle = require('needle');

const fetchMyIP = function(callback) {
  const url = `https://api.ipify.org?format=json`;

  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = response.body.ip;
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };