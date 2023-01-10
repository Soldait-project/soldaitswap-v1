/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Button, Hidden, Popper, Fade } from "@material-ui/core";
import { AccountBalanceWallet } from '@material-ui/icons';
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

import WalletConnectProvider from "@walletconnect/web3-provider";

import config from "../../config/config"
import { setWallet, setTokens } from "../../reducers/Actions"
import { connection } from "../../helper/connection"
import { formatAddress, toFixedFormat } from "../../helper/custommath"
import { tokenDetails } from "../../Api/TokenActions"
import { userlogin } from "../../Api/UserActions"

import Web3Modal from "web3modal";

import { providerOptions } from "../../config/providerOptions"

import {
  getSettings
} from "../../Api/UserActions";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {

  const dispatch = useDispatch();
  const walletConnection = useSelector((state) => state.walletConnection);
  const [anchorEl, setAnchorEl] = useState(null);
  const [balance, setbalance] = useState("");
  const [useraddress, setuseraddress] = useState("");

  const [socialLinks, SetsocialLinks] = React.useState({ facebook: "", linkedin: "", telegram: "", twitter: "", youtube: "" });


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
  }, [walletConnection.network]);

  async function getTokenList() {
    let { result } = await tokenDetails();
    var alllist = JSON.parse(result);
    dispatch(setTokens(alllist));

  }

  useEffect(() => {
    if (walletConnection && walletConnection.provider?.on) {
      console.log('&&&&&&&&&&*****')
      const handleAccountsChanged = (accounts) => {
        //setAccounts(accounts);
        console.log('accounts-accounts', accounts)
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
        console.log('chainId-chainId', chainId)
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
    var WEB3_CONNECT_CACHED_PROVIDER = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")
    if (WEB3_CONNECT_CACHED_PROVIDER) {
      var connnector = JSON.parse(WEB3_CONNECT_CACHED_PROVIDER)
      if (connnector == "injected" || connnector == "walletconnect" || connnector === "binancechainwallet"
        || connnector == "walletlink") {
        console.log('setConnectionsetConnection')
        var get = await connection();
        dispatch(setWallet(get));
        getuserBalance();
      }
    }
  }


  const disconnectWeb3Wallet = async () => {
    console.log("disconnectWeb3Wallet")
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

    } catch (error) {
      console.error(error);
    }
  };

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
    console.log(result, "result")
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
            <NavLink to="/home" color="transparent" className="nav-link">Home</NavLink>
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
            <NavLink to="/p2p" color="transparent" className="nav-link">P2P</NavLink>
          </ListItem>
          {/* <ListItem className={classes.listItem}>
            <NavLink to="/referral" color="transparent" className="nav-link">Referral</NavLink>
          </ListItem> */}
          {/* <ListItem className={classes.listItem}>
            <a href="#" color="transparent" className="nav-link"><i className="fab fa-medium"></i></a>
          </ListItem> */}
          {/* <ListItem className={classes.listItem}>
            <a href="#" color="transparent" className="nav-link"><i className="fab fa-reddit-alien"></i></a>
          </ListItem> */}
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
