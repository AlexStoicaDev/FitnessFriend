const Nexmo = require("nexmo");
module.exports = new Nexmo({
  apiKey: process.env.NEXMO_CLIENT_ID,
  apiSecret: process.env.NEXMO_CLIENT_KEY
});
