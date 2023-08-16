import React from 'react'
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import { setWallet, setEligible } from "../reducers/Actions";
import { toastAlert } from "../helper/toastAlert";
import config from "../config/config";

import Web3Modal from "web3modal";
import { providerOptions } from "../config/providerOptions"

import { checkUser } from "../Api/UserActions"
import { useConnect } from 'wagmi'

const WalletModal = (props) => {

  const dispatch = useDispatch();
  const { connect, connectors } = useConnect()

  async function connectfunction(connector) {
    console.log(connector, 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
    try {
      let check = isMobile();
      if (
        check &&
        !window.ethereum && connector &&
        connector.connector.id != "walletConnect"
      ) {
        await connectMetamaskMobile();
        return;
      }
      if (connector) {
        console.log(connector, 'connectorconnectorconnector')
        var resp = connect(connector)
        console.log(resp, 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
      }

      window.$('#wallet_modal').modal('hide');
      // setTimeout(function(){
      //     window.location.reload(false)
      // },2000)
    } catch (err) {
      console.log(err, 'errrr')
    }
  }
 
  async function connectWallet(wallettype) {

    try {
      let check = isMobile();
      if (
        check &&
        !window.ethereum && wallettype == 'injected'
      ) {
        await connectMetamaskMobile();
        return;
      }
      //await web3Modal.clearCachedProvider();
      const web3Modal = new Web3Modal({
        providerOptions, // required,
        cacheProvider: true, // optional
      });

      const provider = await web3Modal.connectTo(wallettype);

      var web3 = new Web3(provider);
      var network = await web3.eth.net.getId();
      if ((config.NetworkId) === parseInt(network)) {
        var result = await web3.eth.getAccounts();

        var currAddr = result[0];
        console.log('cccccccccccccccccccurrAddr: ', currAddr);
        let reqdata = { address: currAddr && currAddr ? currAddr : '' }
        let { status } = await checkUser(reqdata);
        if (status == true) {
          var eligibleStatus = {
            eligible: "no",
          }

          dispatch(setEligible(eligibleStatus));
          toastAlert('error', "Your Address is Blocked");
        }
        localStorage.setItem("connect", "yes");
        localStorage.setItem("iswallet", wallettype);
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

    }


  }
  function isMobile() {
    let check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  const connectMetamaskMobile = () => {
    const dappUrl = window.location.href.split("//")[1].split("/")[0];
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    console.log(metamaskAppDeepLink, "dapppppp...")
    window.open(metamaskAppDeepLink, "_self");
  };



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
              {connectors && connectors.length > 0 && connectors.map((connector) => (
                <>
                  {connector && connector.id == 'walletConnect' &&
                    <div className="wallet_panel"
                      onClick={() => connectfunction({ connector })}>
                      <img src={require("../assets/images/walletconnect_icon.png")} alt="Icon" className="img-fluid" />
                      <h2>Wallet connect</h2>
                    </div>
                  }
                </>
              ))}
              {/* <div className="wallet_panel" onClick={() => { connectWallet("walletconnect") }}>
                <img src={require("../assets/images/walletconnect_icon.png")} alt="Icon" className="img-fluid" />
                <h2>Wallet connect</h2>
              </div> */}
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