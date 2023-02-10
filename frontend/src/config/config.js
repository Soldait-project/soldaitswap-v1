var key = {
  NetworkId: 97,
  netWorkUrl: "https://data-seed-prebsc-2-s3.binance.org:8545",
  Factory: "0x783909b26E4e9c8E5805373bDb97af4a287cB51d",
  ETHSYMBOL: "BNB"
};


if (process.env.NODE_ENV == "production") {
  key = {
    frontUrl: "https://soldait-frontend-2023.pages.dev",
    baseUrl: "https://soldaitapi.alwin.io/api",
    Router: "0xe3C7CfB89203091E27edA0339Cb9495130feFee7",
    Factory: "0x783909b26E4e9c8E5805373bDb97af4a287cB51d",
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
    MasterChef: "0x321b972dEe6CF8827eeFa3D1FE95f9805E9D9A1a",
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
    Router: "0xe3C7CfB89203091E27edA0339Cb9495130feFee7",
    Factory: "0x783909b26E4e9c8E5805373bDb97af4a287cB51d",
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
    MasterChef: "0x321b972dEe6CF8827eeFa3D1FE95f9805E9D9A1a",
    rpcurl: "https://data-seed-prebsc-2-s3.binance.org:8545/",
    defaultLogo: "https://soldaitapi.alwin.io/tokens/question.svg",
    ETHSYMBOL: "BNB",
    limit: 6,
    NetworkType: "Binance",
    walletconnect: "cca7167ccaf4cfbfeef9a7c26e7109bc"
  };
}
export default key;