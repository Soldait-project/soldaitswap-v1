import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
    walletlink: {
        package: CoinbaseWalletSDK,
        options: {
            appName: "Soldait",
            rpc: {
                56: "https://bsc-dataseed.binance.org/",
                97: "https://data-seed-prebsc-2-s3.binance.org:8545/"
            }
        }
    },
    walletconnect: {
        package: WalletConnect,
        options: {
            rpc: {
                56: "https://bsc-dataseed.binance.org/",
                97: "https://data-seed-prebsc-2-s3.binance.org:8545/"
            }
        },
        network: 'binance'
    },

    binancechainwallet: {
        package: true,
        options: {
            rpc: {
                56: "https://bsc-dataseed.binance.org/",
                97: "https://data-seed-prebsc-2-s3.binance.org:8545/"
            }
        },
    },
};
