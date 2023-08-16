import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";

import "react-toastify/dist/ReactToastify.css";
import './index.css';

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { bsc, bscTestnet} from 'viem/chains'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'



const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc,bscTestnet],
  [publicProvider()],
)


// Set up wagmi config
const config = createConfig({

  autoConnect: true,
  connectors: [


    new MetaMaskConnector({ chains ,
      shimDisconnect: true,
    }),
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: 'Web3modalv2',
    //     jsonRpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/N55E4OBB31jjeOw9d6FBUVebdYu3chSY',
    //   },
    // }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '681700e231a5aef269b7fe4adb34981a',
        version: '2',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

// pages for this product
const Home = React.lazy(() => import('./views/home'))
const Farms = React.lazy(() => import('./views/farms'))
const Pools = React.lazy(() => import('./views/pools'))
const Exchange = React.lazy(() => import('./views/exchange/exchange'))
const Liquidity = React.lazy(() => import('./views/liquidity/liquidity'))
const Terms = React.lazy(() => import('./views/terms'))
const Faq = React.lazy(() => import('./views/faq'))
const Policy = React.lazy(() => import('./views/policy'))
const Contact = React.lazy(() => import('./views/contact'))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
    <WagmiConfig config={config}>
      <ToastContainer />
      <Suspense fallback={<></>}>
        <Switch>
          <Route path="/liquidity" component={Liquidity} />
          <Route path="/exchange" component={Exchange} />
          <Route path="/pools" component={Pools} />
          <Route path="/farms" component={Farms} />
          <Route path="/" component={Home} />
          <Route path="/terms" component={Terms} />
          <Route path="/policy" component={Policy} />
          <Route path="/faq" component={Faq} />
          <Route path="/contact" component={Contact} />
          <Route exact path="/*" component={Home}>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
      </WagmiConfig>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
