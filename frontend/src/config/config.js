var key = {
  NetworkId: 56,
  netWorkUrl: "https://bsc-dataseed1.ninicoin.io",
  Factory: "0x48De093056e94db1394b790B1b1f8a34338817fa",
  Router: "0x5fE4cdF5c6aC6A19eF2EA83b82D457976C1BeAC5",
  PancakeFactory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
  PancakeRouter: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  ETHSYMBOL: "BNB"
};


// var key = {
//   NetworkId: 97,
//   netWorkUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
//   Factory: "0x8c403e803b5d4646b2b34147a8b1275542165b09",
//   Router: "0xb781fee93d03529988701db7cc04f21da094e787",
//   PancakeFactory: "0x93D6D902c1EeE485B33c2D47b38307Af0A7bea3E",
//   PancakeRouter: "0x86F100f02E75a7Ce9f6BBBcAC7c23A121DadD21e",
//   ETHSYMBOL: "BNB"
// };

if (process.env.NODE_ENV == "production") {
  key = {
    frontUrl: "https://soldaitswap.finance",
    baseUrl: "https://productionapi.soldaitswap.finance/api",
    Router: "0x5fE4cdF5c6aC6A19eF2EA83b82D457976C1BeAC5",
    Factory: "0x48De093056e94db1394b790B1b1f8a34338817fa",
    PancakeFactory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    PancakeRouter: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    NetworkId: 56,
    networkName: "Binance Chain",
    toFixed: 8,
    txUrl: "https://bscscan.com/tx/",
    txUrlAddress: "https://bscscan.com/address/",
    liqutityfee: 0.25,
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB', // 2-6 characters long
      decimals: 18
    },
    netWorkUrl: "https://bsc-dataseed1.ninicoin.io/",
    blockexploer: "https://bscscan.com",
    imageUrl: "https://productionapi.soldaitswap.finance/tokens/",
    reactLoadr: "#19366b",
    MasterChef: "0x3ec5356226b09c61e54dc7fb0becd7da9743d394",
    rpcurl: "https://bsc-dataseed1.ninicoin.io/",
    defaultLogo: "https://productionapi.soldaitswap.finance/tokens/question.svg",
    ETHSYMBOL: "BNB",
    limit: 6,
    NetworkType: "Binance",
    walletconnect: "cca7167ccaf4cfbfeef9a7c26e7109bc"

    //demo

    //   frontUrl: "https://soldait-frontend-2023.pages.dev/",
    //   // baseUrl: "http://localhost:3533/api",
    //   //baseUrl: "https://productionapi.soldaitswap.finance/api",
    //   baseUrl: "https://soldaitapi.wealwin.com/api",
    //   //baseUrl: "https://productionapi.soldaitswap.finance/api",
    //   Factory: "0x8c403e803b5d4646b2b34147a8b1275542165b09",
    //   Router: "0xb781fee93d03529988701db7cc04f21da094e787",
    //   PancakeFactory: "0x93D6D902c1EeE485B33c2D47b38307Af0A7bea3E",
    //   PancakeRouter: "0x86F100f02E75a7Ce9f6BBBcAC7c23A121DadD21e",
    //   NetworkId: 97,
    //   networkName: "Binance Chain",
    //   toFixed: 8,
    //   txUrl: "https://testnet.bscscan.com/tx/",
    //   txUrlAddress: "https://testnet.bscscan.com/address/",
    //   liqutityfee: 0.25,
    //   nativeCurrency: {
    //     name: 'Binance',
    //     symbol: 'ETH', // 2-6 characters long
    //     decimals: 18
    //   },
    //   netWorkUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    //   blockexploer: "https://testnet.bscscan.com",
    //   imageUrl: "https://soldaitapi.wealwin.com/tokens/",
    //   reactLoadr: "#19366b",
    //   MasterChef: "0xe661984F4080D7980c4bbcfa49E8BC92bAe65f12",
    //   rpcurl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    //   defaultLogo: "https://soldaitapi.wealwin.com/tokens/question.svg",
    //   ETHSYMBOL: "BNB",
    //   limit: 6,
    //   NetworkType: "Binance",
    //   walletconnect: "cca7167ccaf4cfbfeef9a7c26e7109bc"
  };


} else {
  key = {
    // // frontUrl: "https://soldait-frontend-2023.pages.dev/",
    // frontUrl: "http://localhost:3000/",
    // //baseUrl: "http://localhost:3533/api",
    // // baseUrl: "https://productionapi.soldaitswap.finance/api",
    // baseUrl: "https://soldaitapi.wealwin.com/api",
    // Factory: "0x8c403e803b5d4646b2b34147a8b1275542165b09",
    // Router: "0xb781fee93d03529988701db7cc04f21da094e787",
    // PancakeFactory: "0x93D6D902c1EeE485B33c2D47b38307Af0A7bea3E",
    // PancakeRouter: "0x86F100f02E75a7Ce9f6BBBcAC7c23A121DadD21e",
    // NetworkId: 97,
    // networkName: "Binance Chain",
    // toFixed: 8,
    // txUrl: "https://testnet.bscscan.com/tx/",
    // txUrlAddress: "https://testnet.bscscan.com/address/",
    // liqutityfee: 0.25,
    // nativeCurrency: {
    //   name: 'Binance',
    //   symbol: 'ETH', // 2-6 characters long
    //   decimals: 18
    // },
    // netWorkUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    // blockexploer: "https://testnet.bscscan.com",
    // imageUrl: "https://soldaitapi.wealwin.com/tokens/",
    // reactLoadr: "#19366b",
    // // MasterChef: "0x7b25b28A66E6fa48916b97D31702115d7632Fe53",
    // MasterChef: "0xe661984F4080D7980c4bbcfa49E8BC92bAe65f12",
    // rpcurl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    // defaultLogo: "https://soldaitapi.wealwin.com/tokens/question.svg",
    // ETHSYMBOL: "BNB",
    // limit: 6,
    // NetworkType: "Binance",
    // walletconnect: "cca7167ccaf4cfbfeef9a7c26e7109bc"

    frontUrl: "https://soldaitswap.finance",
    baseUrl: "https://productionapi.soldaitswap.finance/api",
    Router: "0x5fE4cdF5c6aC6A19eF2EA83b82D457976C1BeAC5",
    Factory: "0x48De093056e94db1394b790B1b1f8a34338817fa",
    PancakeFactory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    PancakeRouter: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    NetworkId: 56,
    networkName: "Binance Chain",
    toFixed: 8,
    txUrl: "https://bscscan.com/tx/",
    txUrlAddress: "https://bscscan.com/address/",
    liqutityfee: 0.25,
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB', // 2-6 characters long
      decimals: 18
    },
    netWorkUrl: "https://bsc-dataseed1.ninicoin.io/",
    blockexploer: "https://bscscan.com",
    imageUrl: "https://productionapi.soldaitswap.finance/tokens/",
    reactLoadr: "#19366b",
    MasterChef: "0x3ec5356226b09c61e54dc7fb0becd7da9743d394",
    rpcurl: "https://bsc-dataseed1.ninicoin.io/",
    defaultLogo: "https://productionapi.soldaitswap.finance/tokens/question.svg",
    ETHSYMBOL: "BNB",
    limit: 6,
    NetworkType: "Binance",
    walletconnect: "cca7167ccaf4cfbfeef9a7c26e7109bc"
  };
}
export default key;