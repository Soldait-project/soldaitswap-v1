var key = {
  NetworkId: 97,
  netWorkUrl: "https://data-seed-prebsc-2-s3.binance.org:8545",
  Factory: "0x237C1227B2b8C5A8DDEC2605C027b33959b5c26A",
  ETHSYMBOL: "BNB"
};


if (process.env.NODE_ENV === "production") {
  key = {
    frontUrl: "https://soldait-frontend-2023.pages.dev",
    baseUrl: "https://soldaitapi.alwin.io/api",
    Router: "0xa2F0dE62eb40Be4C41C6fF48ed411f12b698aa4a",
    Factory: "0x237C1227B2b8C5A8DDEC2605C027b33959b5c26A",
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
    MasterChef: "0xB47c268AfeC242a92a84553A04A4A8b97c3b942e",
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
    Router: "0xa2F0dE62eb40Be4C41C6fF48ed411f12b698aa4a",
    Factory: "0x237C1227B2b8C5A8DDEC2605C027b33959b5c26A",
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
    MasterChef: "0xB47c268AfeC242a92a84553A04A4A8b97c3b942e",
    rpcurl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
    defaultLogo: "https://soldaitapi.alwin.io/tokens/question.svg",
    ETHSYMBOL: "BNB",
    limit: 6,
    NetworkType: "Binance",
    walletconnect: "cca7167ccaf4cfbfeef9a7c26e7109bc"
  };
}
export default key;