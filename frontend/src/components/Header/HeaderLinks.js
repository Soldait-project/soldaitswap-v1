/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Button, Hidden, Popper, Fade } from "@material-ui/core";
import { AccountBalanceWallet } from '@material-ui/icons';
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import { toastAlert } from "../../helper/toastAlert";
import WalletConnectProvider from "@walletconnect/web3-provider";

import config from "../../config/config"
import { setWallet, setTokens, setEligible } from "../../reducers/Actions"
import { connection } from "../../helper/connection"
import { formatAddress, toFixedFormat } from "../../helper/custommath"
import { tokenDetails } from "../../Api/TokenActions"
import { userlogin, checkUser } from "../../Api/UserActions"

import Web3Modal from "web3modal";

import { providerOptions } from "../../config/providerOptions"

import {
  getSettings
} from "../../Api/UserActions";
import { useWalletClient, useAccount, usePublicClient, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'
import { useEthersSigner, walletClientToSigner } from "../ethersconnect.js"
import Web3 from "web3";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {

  const dispatch = useDispatch();
  const walletConnection = useSelector((state) => state.walletConnection);

  console.log('walletConnection: ', walletConnection);
  const [anchorEl, setAnchorEl] = useState(null);
  const [balance, setbalance] = useState("");
  const [useraddress, setuseraddress] = useState("");

  const [socialLinks, SetsocialLinks] = React.useState({ facebook: "", linkedin: "", telegram: "", twitter: "", youtube: "" });

  const { disconnect, isSuccess, status } = useDisconnect()
  const { chain } = useNetwork()
  let chainId = config.NetworkId;
  const { data: walletClient } = useWalletClient({ chainId })

  useAccount({

    onDisconnect: () => {
      localStorage.clear();
      console.log('Disconnected')
      dispatch(
        setWallet({
          network: walletConnection.network,
          web3: "",
          address: "",
          provider: "",
          connect: "no",
        })
      );
    },
  }
  )
  useEffect(() => {
    if (isSuccess == true) {
      setTimeout(() => {
        localStorage.clear()
        window.location.reload(false)
      }, 500)
    }
  }, [isSuccess])


  useEffect(() => {
    if (chain && (chain.id !== config.NetworkId)) {
      dispatch(setWallet({
        network: "",
        web3: "",
        address: "",
        provider: "",
        connect: "",
        isChange: "true"
      }));
    } else {
      dispatch(setWallet({
        network: chainId,
        web3: walletConnection.web3,
        address: walletConnection.address,
        provider: walletConnection.provider,
        connect: "yes",
        isChange: "false"
      }))
      // window.location.reload(false)
    }
  }, [walletClient, chain?.network])


  useEffect(() => {
    getTokenList();
    getSocial()
    loadScript()
  }, []);

  function loadScript() {
    $(document).ready(function () {
      $(".main_navbar li button").click(function () {
        $('.MuiBackdrop-root').trigger('click');
      });
    });
  }

  async function getSocial() {
    var { result } = await getSettings();
    if (result) {
      SetsocialLinks(result)
    }
  }

  useEffect(() => {
    setConnection();
  }, [walletConnection.network, walletClient]);
  // }, []);


  async function getTokenList() {
    let { result } = await tokenDetails();
    var alllist = JSON.parse(result);
    dispatch(setTokens(alllist));

  }

  useEffect(() => {
    if (walletConnection && walletConnection.provider?.on) {

      const handleAccountsChanged = (accounts) => {
        //setAccounts(accounts);

        dispatch(setWallet({
          network: walletConnection.network,
          web3: walletConnection.web3,
          address: accounts[0],
          provider: walletConnection.provider,
          connect: "yes"
        }));
      };

      const handleChainChanged = (chainId) => {
        // setChainId(chainId);

        dispatch(setWallet({
          network: chainId,
          web3: walletConnection.web3,
          address: walletConnection.address,
          provider: walletConnection.provider,
          connect: "yes"
        }));

      };



      walletConnection.provider.on("accountsChanged", handleAccountsChanged);
      walletConnection.provider.on("chainChanged", handleChainChanged);
      walletConnection.provider.on("disconnect", disconnectWeb3Wallet);

      return () => {
        if (walletConnection.provider.removeListener) {
          walletConnection.provider.removeListener("accountsChanged", handleAccountsChanged);
          walletConnection.provider.removeListener("chainChanged", handleChainChanged);
          walletConnection.provider.removeListener("disconnect", disconnectWeb3Wallet);
        }
      };
    }
  }, [walletConnection]);




  async function setConnection() {
    var WEB3_CONNECT_CACHED_PROVIDER = localStorage.getItem(
      "WEB3_CONNECT_CACHED_PROVIDER"
    );
    if (WEB3_CONNECT_CACHED_PROVIDER) {
      var connnector = JSON.parse(WEB3_CONNECT_CACHED_PROVIDER);
      if (
        connnector == "injected" ||
        connnector == "portis" ||
        connnector == "fortmatic" ||
        // connnector == "walletconnect" ||
        connnector == "walletlink"
      ) {
        var get = await connection();

        let reqdata = { address: get && get.address ? get.address : '' };
        let { status } = await checkUser(reqdata);

        if (status == true) {
          var eligibleStatus = {
            eligible: "no",
          }

          dispatch(setEligible(eligibleStatus));
          toastAlert('error', "Your Address is Blocked");
        }
        else {
          dispatch(setWallet(get));
        }
      }
    }
    else if (walletClient && chain && (chain.id == config.NetworkId)) {

      var { signer, transport } = walletClientToSigner(walletClient);
      var web3 = new Web3(transport);

      console.log('userdetailssssssssssssss: ', {
        network: config.NetworkId,
        web3: web3,
        address: walletClient.account.address,
        provider: transport,
        connect: "yes",
        isChange: "false",
      });

  
      var get = await connection()
      let reqdata = { address: get && get.address ? get.address : '' };
      let { status } = await checkUser(reqdata);

      if (status == true) {
        var eligibleStatus = {
          eligible: "no",
        }

        dispatch(setEligible(eligibleStatus));
        toastAlert('error', "Your Address is Blocked");
      }
      else{
        dispatch(setWallet({
          network: config.NetworkId,
          web3: web3,
          address: walletClient.account.address,
          provider: transport,
          connect: "yes",
          isChange: "false",
        }));
      }

    }

  }



  // async function setConnection() {


  //   if (localStorage.getItem("connect") == "yes") {
  //     var get = await connection();

  //     let reqdata = { address: get && get.address ? get.address : '' };
  //     let { status } = await checkUser(reqdata);

  //     if (status == true) {
  //       var eligibleStatus = {
  //         eligible: "no",
  //       }

  //       dispatch(setEligible(eligibleStatus));
  //       toastAlert('error', "Your Address is Blocked");
  //     }
  //     else {
  //       let initialState = {
  //         connect: (localStorage.getItem("connect") && localStorage.getItem("connect") == "yes")
  //           ? localStorage.getItem("connect") : "no",
  //         iswallet: (localStorage.getItem("iswallet") && localStorage.getItem("iswallet") != "")
  //           ? localStorage.getItem("iswallet") : "no",
  //         network: get.network,
  //         web3: get.web3,
  //         address: get.address,
  //       };
  //       dispatch(setWallet(initialState));
  //       var add = get && get.address ? get.address : ''

  //       setuseraddress(add);
  //       //addUsers({ address: get.address });
  //       var WEB3_CONNECT_CACHED_PROVIDER = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")
  //       if (WEB3_CONNECT_CACHED_PROVIDER) {
  //         var connnector = JSON.parse(WEB3_CONNECT_CACHED_PROVIDER)
  //         if (connnector == "injected" || connnector == "walletconnect" || connnector === "binancechainwallet"
  //           || connnector == "walletlink") {
  //           var get = await connection();
  //           dispatch(setWallet(get));
  //           getuserBalance();
  //         }
  //       }
  //     }
  //   }

  // }


  const disconnectWeb3Wallet = async () => {

    try {

      const web3Modal = new Web3Modal({
        providerOptions, // required,
        cacheProvider: false, // optional
      });

      dispatch(setWallet({
        network: "",
        web3: "",
        address: "",
        provider: "", provider: ""

      }));
      localStorage.clear();

      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }

      await web3Modal.clearCachedProvider();

      setTimeout(function () {
        window.location.reload(false)
      }, 1000);

    }
    catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getuserBalance();
  }, [walletConnection, walletClient]);
  async function getuserBalance() {
    if (walletConnection && walletConnection.web3 && walletConnection.address && walletConnection.address != "") {
      setuseraddress(walletConnection.address);
      var web3 = walletConnection.web3;
      var getBalance = await web3.eth.getBalance(walletConnection.address);
      var bal = getBalance / 10 ** 18;
      bal = await toFixedFormat(bal);
      setbalance(bal);

    }
  }


  const handleClick = async (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    let data = { address: useraddress };
    let { result } = await userlogin(data);

    if (result) {

      localStorage.setItem("khdbfty", result)
    }

  };
  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;
  const classes = useStyles();


  return (
    <div className="home_page_menu">
      <List className={classes.list + " main_navbar"}>
        <Hidden lgUp>
          <ListItem className={classes.listItem}>
            <NavLink to="/" color="transparent" className="nav-link">Home</NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to="/exchange" color="transparent" className="nav-link">Exchange</NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to="/liquidity" color="transparent" className="nav-link">Liquidity</NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to="/farms" color="transparent" className="nav-link">Farms</NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to="/pools" color="transparent" className="nav-link">Pools</NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <a href="https://soldait.gitbook.io/soldaitswap/" target="_blank" color="transparent" className="nav-link">Gitbook</a>
          </ListItem>

          <ListItem className={classes.listItem}>
            <a href={socialLinks.twitter} color="transparent" className="nav-link"><i className="fab fa-twitter"></i></a>
          </ListItem>
          {/* <ListItem className={classes.listItem}>
            <a href="#" color="transparent" className="nav-link"><i className="fab fa-discord"></i></a>
          </ListItem> */}
          <ListItem className={classes.listItem}>
            <a href={socialLinks.facebook} color="transparent" className="nav-link"><i className="fab fa-facebook"></i></a>
          </ListItem>
          <ListItem className={classes.listItem}>
            <a href={socialLinks.telegram} color="transparent" className="nav-link"><i className="fab fa-telegram-plane"></i></a>
          </ListItem>
          <ListItem className={classes.listItem}>
            <a href={socialLinks.linkedin} color="transparent" className="nav-link"><i className="fab fa-linkedin"></i></a>
          </ListItem>
        </Hidden>

        {walletConnection && walletConnection.connect == "yes" && walletConnection.address && walletConnection.address != "" ?
          <ListItem className={classes.listItem + " p-0"} id="walletaddress">
            <span className="wallet_add" onClick={handleClick}>{formatAddress(useraddress)}</span>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <div className="after_login_dropdown">
                    <ul>
                      <li>Bal: {balance} {config.ETHSYMBOL}</li>
                      <li><a href="#/" onClick={() => disconnectWeb3Wallet()}>Disconnect</a></li>
                    </ul>
                  </div>
                </Fade>
              )}
            </Popper>
          </ListItem> :
          <ListItem className={classes.listItem + " p-0"}>
            <Button className="auth_btn" data-toggle="modal" data-target="#wallet_modal"><AccountBalanceWallet /> Connect Wallet</Button>
          </ListItem>
        }

      </List>


    </div>
  );
}
