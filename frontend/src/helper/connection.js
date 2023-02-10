import Web3 from "web3";
import config from "../config/config";
import Web3Modal from "web3modal";

import { providerOptions } from "../config/providerOptions"

import store from '../store';

const web3Modal = new Web3Modal({
  providerOptions, // required,
  cacheProvider: true, // optional
});

var isLoad = false

export async function connection() {
  var currentProvider = store.getState()

  var connect = {
    web3: "",
    address: "",
    network: 0,
    provider: "",
  };

  var provider = (currentProvider && currentProvider.walletConnection &&
    currentProvider.walletConnection.provider
    && currentProvider.walletConnection.provider !== "") ? currentProvider.walletConnection.provider : "";

  var isConnected = "no"
  var WEB3_CONNECT_CACHED_PROVIDER = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")
  if (WEB3_CONNECT_CACHED_PROVIDER) {
    var connnector = JSON.parse(WEB3_CONNECT_CACHED_PROVIDER)
    if (connnector === "injected" || connnector === "walletconnect"
      || connnector === "walletlink" || connnector === "binancechainwallet") {
      isConnected = "yes";
    }
  }

  if (provider === "" && isConnected && web3Modal.cachedProvider) {
    isLoad = true;
    provider = await web3Modal.connect();
  }

  if (provider && provider !== "") {
    //var provider = await web3Modal.connect();
    var web3 = new Web3(provider);
    if (typeof web3 !== "undefined") {

      var network = await web3.eth.net.getId();
      var result = await web3.eth.getAccounts();

      var currAddr = result[0];
      if (currAddr === undefined) currAddr = "";
      if (network === config.NetworkId) {
        connect.network = network;
        connect.web3 = web3;
        connect.address = currAddr;
        connect.provider = provider;
        connect.connect = "yes";
      }
    }
  }

  return connect;
}