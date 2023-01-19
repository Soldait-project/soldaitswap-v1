let key = {};
if (process.env.NODE_ENV == "production") {
  key = {
    baseUrl: "https://soldaitapi.alwin.io/adminapi",
    imageUrl: "https://soldaitapi.alwin.io/tokens/",
    imgURL: "https://soldaitapi.alwin.io/",
    loaderColor: "#0a0a3a",
    txUrl: "https://testnet.bscscan.com/tx/",
    factory: "0x237C1227B2b8C5A8DDEC2605C027b33959b5c26A",
    masterchef: "0xB47c268AfeC242a92a84553A04A4A8b97c3b942e",
    netWorkUrl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
    netWorkversion: 97,
    secretkey: "SOLDAIT*26@7#$%@",
  };
} else {
  key = {
    baseUrl: "http://localhost:3550/adminapi",
    // baseUrl: "https://soldaitapi.alwin.io/adminapi",
    imageUrl: "http://localhost:3550/",
    imgURL: "https://soldaitapi.alwin.io/",
    // imageUrl: "https://soldaitapi.alwin.io/tokens/",
    loaderColor: "#0a0a3a",
    txUrl: "https://testnet.bscscan.com/tx/",
    factory: "0x237C1227B2b8C5A8DDEC2605C027b33959b5c26A",
    masterchef: "0xB47c268AfeC242a92a84553A04A4A8b97c3b942e",
    netWorkUrl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
    netWorkversion: 97,
    secretkey: "SOLDAIT*26@7#$%@",
  };
}

export default key;
