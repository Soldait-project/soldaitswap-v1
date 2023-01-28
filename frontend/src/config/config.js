var key = {
  NetworkId: 97,
  netWorkUrl: "https://data-seed-prebsc-2-s3.binance.org:8545",
  Factory: "0xeac424ebabf11a3b1d8ae9f26384be371e7561ef",
  ETHSYMBOL: "BNB"
};


if (process.env.NODE_ENV == "production") {
  key = {
    frontUrl: "https://soldait-frontend-2023.pages.dev",
    baseUrl: "https://soldaitapi.alwin.io/api",
    Router: "0xae15194c579ea2f19c5f68deeade7f3739aff83e",
    Factory: "0xeac424ebabf11a3b1d8ae9f26384be371e7561ef",
    NetworkId: 97,
    networkName: "Binance Chain",
    toFixed: 8,
    txUrl: "https://testnet.bscscan.com/tx/",
    txUrlAddress: "https://testnet.bscscan.com/address/",
    liqutityfee: 0.25,
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB', // 2-6 characters long
      decimals: 18
    },
    netWorkUrl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
    blockexploer: "https://testnet.bscscan.com",
    imageUrl: "https://soldaitapi.alwin.io/tokens/",
    reactLoadr: "#19366b",
    MasterChef: "0xB5d9861c0402703D2C67DC6b76CcCb2a83afE0Ff",
    rpcurl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
    defaultLogo: "https://soldaitapi.alwin.io/tokens/question.svg",
    ETHSYMBOL: "BNB",
    limit: 6,
    NetworkType: "Binance",
    walletconnect: "cca7167ccaf4cfbfeef9a7c26e7109bc"
  };
} else {
  key = {
    frontUrl: "http://localhost:3000/",
    // baseUrl: "http://localhost:3533/api",
    //baseUrl: "https://soldaitapi.alwin.io/api",
    //baseUrl: "http://localhost:3533/api",
    baseUrl: "https://soldaitapi.alwin.io/api",
    Router: "0xae15194c579ea2f19c5f68deeade7f3739aff83e",
    Factory: "0xeac424ebabf11a3b1d8ae9f26384be371e7561ef",
    NetworkId: 97,
    networkName: "Binance Chain",
    toFixed: 8,
    txUrl: "https://testnet.bscscan.com/tx/",
    txUrlAddress: "https://testnet.bscscan.com/address/",
    liqutityfee: 0.25,
    nativeCurrency: {
      name: 'Binance',
      symbol: 'ETH', // 2-6 characters long
      decimals: 18
    },
    netWorkUrl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
    blockexploer: "https://testnet.bscscan.com",
    imageUrl: "https://soldaitapi.alwin.io/tokens/",
    reactLoadr: "#19366b",
    MasterChef: "0xB5d9861c0402703D2C67DC6b76CcCb2a83afE0Ff",
    rpcurl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
    defaultLogo: "https://soldaitapi.alwin.io/tokens/question.svg",
    ETHSYMBOL: "BNB",
    limit: 6,
    NetworkType: "Binance",
    walletconnect: "cca7167ccaf4cfbfeef9a7c26e7109bc"
  };
}
export default key;