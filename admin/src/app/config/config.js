let key = {};
if (process.env.NODE_ENV == "production") {
  key = {
    // baseUrl: "https://productionapi.soldaitswap.finance/adminapi",
    // imageUrl: "https://productionapi.soldaitswap.finance/tokens/",
    // imgURL: "https://productionapi.soldaitswap.finance/",
    // loaderColor: "#0a0a3a",
    // txUrl: "https://bscscan.com/tx/",
    // factory: "0xe51242dc27332b122db974b2c3d3d95ee85e1925",
    // masterchef: "0x3ec5356226b09c61e54dc7fb0becd7da9743d394",
    // netWorkUrl: "https://bsc-dataseed1.ninicoin.io/",
    // netWorkversion: 56,
    // secretkey: "SOLDAIT*26@7#$%@",

    baseUrl: "https://soldaitapi.wealwin.com/adminapi",
    imageUrl: "https://soldaitapi.wealwin.com/tokens/",
    imgURL: "https://soldaitapi.wealwin.com/",
    loaderColor: "#0a0a3a",
    txUrl: "https://bscscan.com/tx/",
    factory: "0x48De093056e94db1394b790B1b1f8a34338817fa",
    masterchef: "0x47f3486e436FD40781D7d349D75734F6622f1182",
    netWorkUrl: "https://bsc-dataseed1.binance.org/",
    netWorkversion: 56,
    secretkey: "SOLDAIT*26@7#$%@",
  };
} else {
  key = {
    baseUrl: "http://localhost:3533/adminapi",
    // baseUrl: "https://productionapi.soldaitswap.finance/adminapi",
    imageUrl: "http://localhost:3550/",
    imgURL: "https://productionapi.soldaitswap.finance/",
    // imageUrl: "https://productionapi.soldaitswap.finance/tokens/",
    loaderColor: "#0a0a3a",
    txUrl: "https://bscscan.com/tx/",
    factory: "0xe51242dc27332b122db974b2c3d3d95ee85e1925",
    masterchef: "0x3ec5356226b09c61e54dc7fb0becd7da9743d394",
    netWorkUrl: "https://bsc-dataseed1.ninicoin.io/",
    netWorkversion: 56,
    secretkey: "SOLDAIT*26@7#$%@",
  };
}

export default key;
