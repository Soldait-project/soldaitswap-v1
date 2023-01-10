// import packages
import express from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import methodoveride from "method-override";
import config from "./config/config";

import frontroutes from "./routes/front.routes"
import adminroutes from "./routes/admin.routes"


const CoinMarketCap = require('coinmarketcap-api')
const apiKey = 'ec80bed3-8f55-46b5-b0a3-8394981d5b1c'
const client = new CoinMarketCap(apiKey)

test()
async function test() {
  var currencies = ["ETH", "FIL", "DOGE", "LTC", "XRP", "BTC"]
  var resp = await client.getQuotes({ symbol: currencies })
  //console.log(resp.data['ETH'].quote, 'resprespresp')
  for (var c = 0; c < currencies.length; c++) {

    var usdprice = resp.data[currencies[c]].quote

    //console.log(usdprice, 'usdpriceusdpriceusdprice')

  }
  // client.getGlobal().then(console.log).catch(console.error)
  //client.getQuotes({ symbol: ['BTC', 'ETH'] }).then(console.log).catch(console.error)
}

const app = express();
const server = http.createServer(app);

app.options("*", cors());

app.use(methodoveride());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "*"
  );
  next();
});
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public")));

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB successfully connected.");
  })
  .catch((err) => { });


app.get("/", (req, res) => {
  return res.send("User Service Working");
});

app.use('/api', frontroutes);
app.use('/adminapi', adminroutes);


server.listen(config.port, function () {
  console.log(`server is running on port ${config.port}`);
});
