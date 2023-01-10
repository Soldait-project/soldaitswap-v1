var key = {
  NetworkId: 97,
  netWorkUrl: "https://data-seed-prebsc-2-s3.binance.org:8545",
  Factory: "0x1e9b8b105174e2c6c1e7068b8698078d2e30a748",
  ETHSYMBOL: "BNB"
};
if (process.env.NODE_ENV === "production") {
  key = {
    frontUrl: "https://soldait-frontend-2023.pages.dev",
    baseUrl: "https://soldaitapi.alwin.io/api",
    Router: "0x81911a74a5f6e940fe364d8da3312405b79a51ed",
    Factory: "0x1e9b8b105174e2c6c1e7068b8698078d2e30a748",
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
    MasterChef: "0xA32139490e5922208e09eb53C3f8DB0F0694F215",
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
    baseUrl: "http://localhost:3533/api",
    //baseUrl: "https://soldaitapi.alwin.io/api",
    Router: "0x81911a74a5f6e940fe364d8da3312405b79a51ed",
    Factory: "0x1e9b8b105174e2c6c1e7068b8698078d2e30a748",
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
    MasterChef: "0xA32139490e5922208e09eb53C3f8DB0F0694F215",
    rpcurl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
    defaultLogo: "https://soldaitapi.alwin.io/tokens/question.svg",
    ETHSYMBOL: "BNB",
    limit: 6,
    NetworkType: "Binance",
    walletconnect: "cca7167ccaf4cfbfeef9a7c26e7109bc"
  };
}
export default key;