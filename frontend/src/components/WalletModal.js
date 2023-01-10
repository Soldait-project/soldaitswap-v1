import React from 'react'
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { isMobile } from "react-device-detect";
import $ from "jquery"
import { setWallet } from "../reducers/Actions";
import { toastAlert } from "../helper/toastAlert";
import config from "../config/config";
import { connection } from "../helper/connection"
import { checkUser } from "../Api/UserActions"

import Web3Modal from "web3modal";
import { providerOptions } from "../config/providerOptions"

const WalletModal = (props) => {

  const dispatch = useDispatch();

  async function connectWallet(wallettype) {
    console.log(wallettype, 'wallettypewallettype')
    try {
      //await web3Modal.clearCachedProvider();

      const web3Modal = new Web3Modal({
        providerOptions, // required,
        cacheProvider: true, // optional
      });

      const provider = await web3Modal.connectTo(wallettype);
      var web3 = new Web3(provider);
      var network = await web3.eth.net.getId();
      console.log(config.NetworkId, network, '=======,')
      if (config.NetworkId === network) {
        var result = await web3.eth.getAccounts();
        console.log(result, 'resultresultresult')
        var currAddr = result[0];

        dispatch(setWallet({
          network: network,
          web3: web3,
          address: currAddr,
          provider: provider,
          connect: "yes"
        }));
        window.$('#wallet_modal').modal('hide');
      } else {
        var errorMsg = "please select " + config.networkName + " on your wallet"
        toastAlert('error', errorMsg, 'network');
      }



    } catch (err) {
      console.log(err, 'errerrerrerrerr')
    }


  }

  return (
    <div className="modal fade primary_modal" id="wallet_modal" tabIndex="-1" role="dialog" aria-labelledby="wallet_modal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="wallet_modal">Connect to a wallet</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="wallet_panel_div">
              <div className="wallet_panel" onClick={() => { connectWallet("injected") }}>
                <img src={require("../assets/images/metamask_icon.png")} alt="Icon" className="img-fluid" />
                <h2>Metamask</h2>
              </div>
              <div className="wallet_panel" onClick={() => { connectWallet("walletconnect") }}>
                <img src={require("../assets/images/walletconnect_icon.png")} alt="Icon" className="img-fluid" />
                <h2>Wallet connect</h2>
              </div>
              <div className="wallet_panel" onClick={() => { connectWallet("walletlink") }}>
                <img src={require("../assets/images/coinbaseWalletIcon.62578f59.svg")} alt="Icon" />
                <h2>Coinbase</h2>
              </div>
              <div className="wallet_panel" onClick={() => { connectWallet("injected") }}>
                <img src={require("../assets/images/trustwallet_icon.png")} alt="Icon" />
                <h2>Trustwallet</h2>
              </div>
              <div className="wallet_panel" onClick={() => { connectWallet("binancechainwallet") }}>
                <img src={require("../assets/images/chain.png")} alt="Icon" />
                <h2>BinanceSmart Chain</h2>
              </div>
            </div>


            {/* <div className="wallet_modal_footer">
              <a href="#/" target="_blank"><HelpOutline className="mr-2" /><span>Learn how to connect</span></a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletModal;