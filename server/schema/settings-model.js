const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
  biswapfee: { type: Number, default: 0 },
  siteswapfee: { type: Number, default: 0 },
  pancakeswapfee: { type: Number, default: 0 },
  level1: { type: Number, default: 0 },
  level2: { type: Number, default: 0 },
  level3: { type: Number, default: 0 },
  level4: { type: Number, default: 0 },
  level5: { type: Number, default: 0 },
  bnbpriceusd: { type: Number, default: 0 },
  usdcpriceusd: { type: Number, default: 0 },
  busdpriceusd: { type: Number, default: 0 },
  tokenprice: { type: Number, default: 0 },
  secretKey: { type: String, default: "" },
  authKey: { type: String, default: "" },
  adminaddress: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('settings', SchemaFormat, 'settings');

