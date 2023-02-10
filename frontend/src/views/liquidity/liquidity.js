import React, { useEffect, useState } from "react";
// core components
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import { Button, Tooltip } from "@material-ui/core";
import Header from "../../components/Header/Header.js";
import FooterHome from "../../components/Footer/FooterHome.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import StaticNavbar from "../../components/StaticNavbar";
import { Link } from 'react-router-dom';
import { Slider } from '@material-ui/core';
import { checkUser } from "../../Api/UserActions"
import { withStyles } from "@material-ui/core/styles";

import WalletModal from "../../components/WalletModal";
import TokenModal from "../../components/TokenModal";
import LiqutityModal from "../../components/LiqutityModal";
import SlippageModal from "../../components/SlippageModal";

import { toastAlert } from "../../helper/toastAlert";
import ReactLoading from "react-loading";
import { useSelector } from 'react-redux';

import Liqutityhistory from "../../components/Liqutityhistory";
import LiqutityList from "../../components/LiqutityList"

import {
  getbalance,
  allowance,
  approve,
} from "../../ContractActions/bep20Actions";



import {
  getPair,
} from "../../ContractActions/factoryActions";

import {
  toFixedFormat,
  percentage,
  division,
  toFixedWithoutRound
} from "../../helper/custommath";

import {
  tokenDetails
} from "../../Api/TokenActions";

import {
  recentLiqutity
} from "../../Api/LiqutityActions"

import {
  getUserLPDetails
} from "../../ContractActions/Actions";
import unknownToken from "../../assets/images/question.svg"

import config from "../../config/config";

import {
  calculateValue,
  checkAllowance,
  getLiqutityLPdetails
} from "./liqutitycalculation"

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
];

function valuetext(value) {
  return `${value}%`;
}

const dashboardRoutes = [];

// Trade History Table


// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#fff',
    color: '#646e88',
    maxWidth: 220,
    fontSize: "13px",
    fontFamily: "'Montserrat', sans-serif",
    lineHeight: "20px",
    border: '1px solid #fff',
    boxShadow: '-4px 5px 10px 2px rgb(0 0 0 / 20%)'
  },
}))(Tooltip);

var initialData = {
  "name": "",
  "symbol": "",
  "address": "",
  "amount": "",
  "decimals": "",
  "showamount": "",
  "newtoken": ""
}

var initialToken = {
  balance: 0,
  allowance: 0,
  balanceOf: 0
}



function brokenImage(e) {
  e.onerror = null; // prevents looping
  e.target.src = unknownToken;
}

export default function Liquidity(props) {

  const { ...rest } = props;

  const [tokenList, settokenList] = useState([]);
  const [fromValue, setfromValue] = useState(initialData);
  const [fromTokenDetail, setfromTokenDetail] = useState(initialToken);
  const [fromError, setfromError] = useState({ insuffucient: "", allowance: "" });
  const [fromrate, setfromrate] = useState(0);
  const [frombalance, setfrombalance] = useState("Loading");
  const [approveBtn, setapproveBtn] = useState(false);

  const [toValue, settoValue] = useState(initialData);
  const [toTokenDetail, settoTokenDetail] = useState(initialToken);
  const [toError, settoError] = useState({ insuffucient: "", allowance: "" });
  const [torate, settorate] = useState(0);
  const [tobalance, settobalance] = useState("");
  const [approveBtn1, setapproveBtn1] = useState(false);

  const [swapcurrent, setswapcurrent] = useState("");
  const [slippageValue, setslippageValue] = useState(0.5);
  //const [transdeadline, settransdeadline] = useState(5);
  const [firstliqutity, setfirstliqutity] = useState(false);
  const [approveloader, setapproveloader] = useState(false);

  const [showLiqutity, setshowLiqutity] = useState(true);
  const [importsection, setimportsection] = useState(false);

  const [shareofPoolToken, setshareofPoolToken] = useState(0);
  const [receivedPool, setreceivedPool] = useState(0);
  const [initialImport, setinitialImport] = useState(initialData);

  const [pairDetails, setpairDetails] = useState({ "pairAddress": "", "fromLPbalance": 0, "toLPbalance": 0, "totalSupply": 0 });
  const [importDetail, setimportDetail] = useState({ "isPair": "", "fromamount": 0, "toamount": 0, 'totalamount': 0 });

  const [importLoad, setimportLoad] = useState(false);
  const [liqutityListHistory, setliqutityListHistory] = useState([]);

  //redux
  const walletConnection = useSelector((state) => state.walletConnection);
  const eligibleUser = useSelector((state) => state.isEligible);
  useEffect(() => {
    setInitialTokens();
    getHistory()
    //eslint-disable-next-line
  }, [walletConnection]);

  useEffect(() => {
    setInitial();
    //eslint-disable-next-line
  }, []);

  async function setInitialTokens() {

    setfromTokenDetail(initialToken);
    settoTokenDetail(initialToken);

    childTokenClick(fromValue, "from");
    setTimeout(function () {
      childTokenClick(toValue, "to");
    }, 200);
  }

  async function setInitial() {

    let userAddress = ""
    if (walletConnection && walletConnection.connect === "yes" && walletConnection.web3 && walletConnection.address && walletConnection.address !== "") userAddress = walletConnection.address;

    var getToken = await tokenDetails({ useraddress: userAddress });
    var allToken = JSON.parse(getToken.result);
    if (allToken && allToken.length > 0) {
      var index = allToken.findIndex(val => val.default === "yes");
      if (index === -1) {
        index = 0;
      }

      var fromData = {
        "name": allToken[index].name,
        "symbol": allToken[index].symbol,
        "address": allToken[index].address,
        "decimals": allToken[index].decimals,
      }
      settokenList(allToken);
      setinitialImport(fromData)
      setfromValue({ ...fromValue, ...fromData });
      setTimeout(function () {
        getuserbal(allToken[index])
      }, 1000);
    }


  }

  async function getuserbal(from) {
    var value = await getbalance(from.address, from.symbol);
    var value1 = await allowance(from, config.Router);
    setfrombalance(value.balance);
    setfromTokenDetail({
      "balance": value.balance,
      "allowance": value1.value,
      "balanceOf": value.balanceOf
    })
  }

  function setCurr(item) {
    setswapcurrent(item);
  }

  const inputChange = async (event) => {

    var id = event.target.id;
    var value = event.target.value;

    var fromBal = fromTokenDetail.balanceOf;
    var toBal = toTokenDetail.balanceOf;
    calculateAmount(id, value, fromBal, toBal);

  }

  async function calculateAmount(id, value, fromBal, toBal) {
    try {

      var { fromAmt, toAmt, status, reserveA, reserveB } = await calculateValue
        (
          id,
          value,
          setfromValue,
          fromValue,
          settoValue,
          toValue,
          setswapcurrent,
          pairDetails,
          setshareofPoolToken,
          setreceivedPool,
          firstliqutity
        );


      if (status) {

        rateCalulation(reserveA, reserveB);
        var amt = (id === "from") ? value : await toFixedFormat(await division(fromAmt, 10 ** fromValue.decimals));
        var amt1 = (id === "to") ? value : await toFixedFormat(await division(toAmt, 10 ** toValue.decimals));

        setfromValue({ ...fromValue, ...{ "amount": fromAmt, showamount: amt, tokenbalance: pairDetails.fromLPbalance } });
        settoValue({ ...toValue, ...{ "amount": toAmt, showamount: amt1, tokenbalance: pairDetails.toLPbalance } });

        //check token allowance
        ValidateInsuffucientAllowance("from", fromAmt, fromValue.address, fromBal, fromValue.symbol, fromValue.decimals);
        ValidateInsuffucientAllowance("to", toAmt, toValue.address, toBal, toValue.symbol, toValue.decimals);

      }
    } catch (err) {

    }


  }

  async function ValidateInsuffucientAllowance(id, amount, address, balanceof, symbol, decimals) {

    var { fromallowance, toallowance, frominsuffucient, toinsuffucient } = await checkAllowance(id, amount, address, balanceof, symbol, decimals);

    if (amount > 0) {
      if (id === "from") {
        setfromError({ ...fromError, ...{ "insuffucient": frominsuffucient, "allowance": fromallowance } });
      }
      if (id === "to") {
        settoError({ ...toError, ...{ "insuffucient": toinsuffucient, "allowance": toallowance } });
      }
    }

  }

  async function getPairDetail(tokenA, tokenB) {

    var fromLPbalance = 0;
    var toLPbalance = 0;
    setfirstliqutity(false);
    setshowLiqutity(false);
    if (tokenA && tokenA !== "" && tokenB && tokenB !== "") {

      var { pairAddress, lpBal } = await getLiqutityLPdetails(tokenA, tokenB);

      if (pairAddress === "0x0000000000000000000000000000000000000000") {
        setfirstliqutity(true);
      } else {
        fromLPbalance = parseFloat(lpBal.tokenAbalanceOf);
        toLPbalance = parseFloat(lpBal.tokenBbalanceOf);
        if (fromLPbalance === 0 && toLPbalance === 0) {
          setfirstliqutity(true);
        } else {
          setfirstliqutity(false);
        }

      }
    }
    var totalSupply = (lpBal && lpBal.totalSupply) ? lpBal.totalSupply : 0
    var setData = {
      pairAddress: pairAddress,
      fromLPbalance: fromLPbalance,
      toLPbalance: toLPbalance,
      totalSupply: totalSupply
    };

    setpairDetails(setData);
    setshowLiqutity(true);
    return {
      pairAddress,
      fromLPbalance,
      toLPbalance,
      totalSupply
    };

  }

  async function showLiqutityModal() {
    let reqdata = { address: walletConnection && walletConnection.address ? walletConnection.address : '' };
    let { status } = await checkUser(reqdata);

    if (status == true) {
      toastAlert('error', "Your Address is Blocked");
    }
    else {
      window.$('#liqutity_modal').modal('show');
    }

  }

  async function rateCalulation(reserveA, reserveB) {
    if (reserveA && reserveA > 0 && reserveB && reserveB > 0) {
      var amt = await toFixedFormat(reserveB / reserveA);
      var amt1 = await toFixedFormat(reserveA / reserveB);
      setfromrate((amt > 0) ? amt : 0);
      settorate((amt1 > 0) ? amt1 : 0);
    }

  }

  async function childTokenClick(item, currentTab) {
    window.$('#token_modal').modal('hide');
    if (currentTab === "from" && item && item.address !== "") {
      setshowLiqutity(false);
      var fromData = {
        ...item, ...{ amount: 0, showamount: 0 }
      }
      setfromValue({ ...fromValue, ...fromData });
      setfrombalance("Loading");
      var value = await getbalance(item.address, item.symbol);
      var value1 = await allowance(item.address, config.Router);
      setfromTokenDetail({
        "balance": value.balance,
        "allowance": value1.value,
        "balanceOf": value.balanceOf
      })
      setfrombalance(value.balance);
      getPairDetail(item.address, toValue.address);

    } else if (item && item.address !== "") {
      setshowLiqutity(false);
      var toData = {
        ...item, ...{ amount: 0, showamount: 0 }
      }
      settoValue({ ...toValue, ...toData });
      settobalance("Loading");
      let value = await getbalance(item.address, item.symbol);
      var allowance1 = await allowance(item.address, config.Router);
      settoTokenDetail({
        "balance": value.balance,
        "allowance": allowance1.value,
        "balanceOf": value.balanceOf,
      })
      settobalance(value.balance);
      getPairDetail(fromValue.address, item.address);
    }
  }


  function childSettingClick(value) {
    if (value && value.settings) {
      setslippageValue(value.settings);
    }
    if (value && value.deadline) {
      //settransdeadline(value.deadline);
    }
  }

  async function approveTokenA(item, id) {
    let reqdata = { address: walletConnection && walletConnection.address ? walletConnection.address : '' };
    let { status } = await checkUser(reqdata);
    if (status == true) {
      toastAlert('error', "Your Address is Blocked");
    }
    else {
      var value = await getbalance(item.address, item.symbol);
      try {
        var balance = parseFloat(value.balanceOf);
        var amt = parseFloat(item.amount);
        setapproveloader(true);
        setapproveBtn(true);
        if (balance >= amt) {
          var result = await approve(item.address, balance);
          if (result.status) {
            setfromError({ ...fromError, ...{ "allowance": "no" } });
            toastAlert('success', "Approve Success", 'balance');
          } else {
            toastAlert('error', "Oops failed!", 'balance');
          }
        } else {
          toastAlert('error', "Insuffucient balance", 'balance');
        }
        setapproveBtn(false);
        setapproveloader(false);
      } catch (err) {
        setapproveBtn(false);
        setapproveloader(false);
      }
    }

  }

  async function approveTokenB(item, id) {
    let reqdata = { address: walletConnection && walletConnection.address ? walletConnection.address : '' };
    let { status } = await checkUser(reqdata);
    if (status == true) {
      toastAlert('error', "Your Address is Blocked");
    }
    else {
      var value = await getbalance(item.address, item.symbol);
      try {
        setapproveloader(true);
        setapproveBtn1(true);
        var balance = parseFloat(value.balanceOf);
        var amt = parseFloat(item.amount);
        if (balance >= amt) {
          var result = await approve(item.address, balance);
          if (result.status) {
            settoError({ ...toError, ...{ "allowance": "no" } });
            toastAlert('success', "Approve Success", 'balance');
          } else {
            toastAlert('error', "Oops failed!", 'balance');
          }
        } else {
          toastAlert('error', "Insuffucient balance", 'balance');
        }
        setapproveBtn1(false);
        setapproveloader(false);
      } catch (err) {
        setapproveloader(false);
        setapproveBtn1(false);
      }
    }

  }

  const sliderChange = async (value) => {
    if (frombalance > 0) {
      var calculate = await percentage(frombalance, value, 'percentage');
      var fromBal = fromTokenDetail.balanceOf;
      var toBal = toTokenDetail.balanceOf;
      calculateAmount("from", calculate, fromBal, toBal);
    }
  }

  function childLiqutityModal(newToken) {
    getPairDetail(fromValue.address, toValue.address);
    setfirstliqutity(false);
    setInitialTokens();
    setfromValue({ ...fromValue, ...{ "amount": "", "showamount": "", "value": "" } });
    settoValue({ ...toValue, ...{ "amount": "", "showamount": "", "value": "" } });
    setfromrate("")
    settorate("")
    setshareofPoolToken("0");
    if (newToken.address && newToken.address !== "") {
      setInitial();
    }
  }

  function importToken() {

    settoValue(initialData);
    setimportDetail({
      "isPair": "no",
      "fromamount": 0,
      "toamount": 0,
      'totalamount': 0
    });
    setimportsection(!importsection);
    setfromValue({ ...fromValue, ...initialImport });
    childTokenClick(initialImport, "from");
  }

  async function parentImportClick(item, currentTab) {
    window.$('#token_modal').modal('hide');
    setimportLoad(true);
    if (currentTab === "from" && item && item.address !== "") {
      var fromData = {
        ...item, ...{ amount: 0, showamount: 0 }
      }
      setfromValue({ ...fromValue, ...fromData });
    } else if (item && item.address !== "") {
      var toData = {
        ...item, ...{ amount: 0, showamount: 0 }
      }
      settoValue({ ...toValue, ...toData });
    }

    var fromAddr = (currentTab === "from") ? item.address : fromValue.address;
    var toAddr = (currentTab === "to") ? item.address : toValue.address;
    var checkExits = await getPair(fromAddr, toAddr, config.Factory);
    var pairAddress = checkExits.value;

    var isCheck = "no";
    var userTokenA = 0;
    var userTokenB = 0;
    var LPbalanceshow = 0;

    if (pairAddress !== "0x0000000000000000000000000000000000000000") {
      isCheck = "yes";
      var LPDetails = await getUserLPDetails(fromAddr, toAddr, pairAddress);
      userTokenA = LPDetails.userTokenA;
      userTokenB = LPDetails.userTokenB;
      LPbalanceshow = LPDetails.LPbalanceshow;
    }
    setimportDetail({
      "isPair": isCheck,
      "fromamount": await toFixedWithoutRound(userTokenA, 2),
      "toamount": await toFixedWithoutRound(userTokenB, 2),
      'totalamount': await toFixedWithoutRound(LPbalanceshow, 2)
    });
    setimportLoad(false);
  }

  async function addImportLiqutity() {
    setimportsection(!importsection);
    childTokenClick(fromValue, "from");
    setTimeout(function () {
      childTokenClick(toValue, "to");
    }, 200);
  }
  async function getHistory() {
    var searchData = `address=${walletConnection.address}`;
    var list = await recentLiqutity(searchData);
    setliqutityListHistory((list && list.result) ? list.result : [])
  }

  function BackLiqutity() {
    setimportsection(false);
  }

  return (
    <div className="page_wrapper">
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={<img src={require("../../assets/images/logo_color.png")} alt="logo" className="brand_logo_mobile" />}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: "dark",
        }}
        {...rest}
      />

      <StaticNavbar />
      <ScrollToTopOnMount />
      <div className="inner_wrapper">
        <div className="inner_pageheader container-fluid px-0">
          <div className="inner_heading_wrapper liquidity_heading_wrap">
            <div className="container">
              <GridContainer>
                <GridItem md={12} data-aos="fade-up" data-aos-duration="2000">
                  <h2>Liquidity</h2>
                  <p>Add liquidity to receive LP tokens</p>
                </GridItem>
              </GridContainer>
            </div>
          </div>
          <div className="inner_content_wrapper">
            <div className="container">
              <GridContainer>
                <GridItem lg={7}>
                  <div className="whitebox" data-aos="fade-up" data-aos-duration="2000">
                    <div className="liquidity_table">
                      <h2>Your Liquidity</h2>
                      <Liqutityhistory
                        importTokenClick={importToken}
                      />
                    </div>
                  </div>
                </GridItem>
                {!importsection &&
                  <GridItem lg={5}>
                    <div className="liquidity_div" data-aos="fade-up" data-aos-duration="2000">
                      <div className="whitebox swap_box">
                        <div className="trade_wrap_title">
                          <div>
                            <h2>Liquidity</h2>
                            <h5>Add liquidity to receive LP tokens</h5>
                          </div>
                          <div>
                            {/* <Button className="round_btn" data-toggle="modal" data-target="#recent_trans_modal"><i className="bi bi-arrow-repeat"></i></Button> */}
                            <Button className="round_btn" data-toggle="modal" data-target="#recent_trans_modal"><i className="fas fa-sync-alt"></i></Button>
                            <Button className="round_btn" data-toggle="modal" data-target="#settings_modal"><i className="fas fa-cog"></i></Button>
                          </div>
                        </div>

                        {firstliqutity &&
                          <div className="mb-1">
                            <div className="first_liquidity_note">
                              <p>You are the first liquidity provider.</p>
                              <p>The ratio of tokens you add will set the price of this pool.</p>
                              <p>Once you are happy with the rate click supply to review.</p>
                            </div>
                          </div>
                        }

                        <div className="input_panel">
                          <div className="d-flex justify-content-between align-items-center">
                            <label>From</label>
                            <label className="balance">Balance: <span>{(frombalance > 0 && walletConnection && walletConnection.connect === "yes") ? frombalance : 0}</span>
                            </label>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <input disabled={(showLiqutity) ? false : true} onChange={inputChange} value={fromValue.showamount} id="from" type="text" placeholder="0.0" className="custom_inp"></input>
                            <Button onClick={() => { setCurr("from"); }} className="token_btn" data-toggle="modal" data-target="#token_modal">
                              <img src={config.imageUrl + fromValue.address.toLowerCase() + '.png'} alt="Logo" onError={(e) => { brokenImage(e) }} className="img-fluid" /> {fromValue.symbol} <i className="bi bi-chevron-down"></i>
                            </Button>
                          </div>
                        </div>
                        <div className="slide">
                          <Slider onChangeCommitted={(_, v) => sliderChange(v)} className="mt-1" defaultValue={0} getAriaValueText={valuetext} aria-labelledby="discrete-slider-custom" step={1} valueLabelDisplay="auto" marks={marks} />
                        </div>

                        <div className="text-center mt-3 mb-3">
                          <img src={require("../../assets/images/plus.png")} alt="Logo" className="img-fluid" />
                        </div>

                        <div className="input_panel">
                          <div className="d-flex justify-content-between align-items-center">
                            <label>To</label>
                            {toValue && toValue.address ? <label className="balance">Balance: <span>{(tobalance > 0 && walletConnection &&
                              walletConnection.connect === "yes") ? tobalance : 0}</span></label>
                              :
                              <label className="balance">Select a token</label>
                            }
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <input disabled={(showLiqutity) ? false : true} onChange={inputChange} value={toValue.showamount} id="to" type="text" placeholder="0.0" className="custom_inp"></input>

                            <Button onClick={() => { setCurr("to"); }} className="token_btn" data-toggle="modal" data-target="#token_modal">
                              {toValue && <img src={config.imageUrl + toValue.address.toLowerCase() + '.png'} alt="Logo" onError={(e) => { brokenImage(e) }} className="img-fluid" />} {toValue.symbol} <i className="bi bi-chevron-down"></i>
                            </Button>
                          </div>
                        </div>

                        {walletConnection && walletConnection.address !== "" && walletConnection.connect === "yes" ?
                          <div>
                            {(fromValue.amount === "" || toValue.amount === "" || fromValue.amount === "0" || toValue.amount === "0" || fromValue.amount === 0 || toValue.amount === 0) ?
                              <div className="text-center mt-2">
                                <button className="primary_btn blue_btn">Enter amount</button>
                              </div>
                              :
                              (fromError.insuffucient === "yes" || toError.insuffucient === "yes") ?
                                <div>
                                  {fromError.insuffucient === "yes" ?
                                    <div className="text-center mt-2">
                                      <button className="primary_btn blue_btn">Insufficient {fromValue.symbol} balance</button>
                                    </div>
                                    :
                                    (toError.insuffucient === "yes") ?
                                      <div className="text-center mt-2">
                                        <button className="primary_btn blue_btn">Insufficient {toValue.symbol} balance</button>
                                      </div>
                                      : ("")
                                  }
                                </div>
                                :
                                fromError.allowance === "yes" ?
                                  <div className="text-center mt-2">
                                    <button disabled={approveBtn} className="primary_btn blue_btn" onClick={() => { approveTokenA(fromValue, 'from') }}>Approve {fromValue.symbol}</button>
                                  </div>
                                  :
                                  (toError.allowance === "yes") ?
                                    <div className="text-center mt-2">
                                      <button disabled={approveBtn1} className="primary_btn blue_btn" onClick={() => { approveTokenB(toValue, 'to') }}>Approve {toValue.symbol}</button>
                                    </div>
                                    : ("")
                            }

                            {approveloader &&
                              <div className="d-flex justify-content-center align-items-center mt-2">
                                <ReactLoading type={"bars"} color={config.reactLoadr} className="loading" />
                              </div>
                            }

                            {(fromValue.amount !== "" && toValue.amount !== "" && fromValue.amount !== 0 && toValue.amount !== 0 &&
                              fromValue.amount !== "0" && toValue.amount !== "0" && fromError.insuffucient === "no" &&
                              fromError.allowance === "no"
                              && toError.insuffucient === "no" && toError.allowance === "no") &&
                              <div className="text-center mt-2">
                                <button onClick={() => { showLiqutityModal() }} className="primary_btn blue_btn">Supply</button>
                              </div>
                            }
                          </div>
                          :

                          <div className="text-center mt-2" data-toggle="modal" data-target="#wallet_modal">
                            <Button className="primary_btn blue_btn">Unlock Wallet</Button>
                          </div>

                        }

                        {!showLiqutity &&
                          <div className="text-center mt-2 loader">
                            <ReactLoading type={"bars"} color={config.reactLoadr} className="loading" />
                          </div>
                        }


                        <hr />
                        <div className="trade_notes">
                          <div>
                            <span>{fromValue.symbol} per {toValue.symbol}:</span>
                            <span>{fromrate}</span>
                          </div>
                          <div>
                            <span>{toValue.symbol} per {fromValue.symbol}:</span>
                            <span>{torate}</span>
                          </div>
                          <div>
                            <span>Share of pool:</span>
                            <span>{(firstliqutity) ? 100 : shareofPoolToken}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GridItem>
                }

                {importsection &&
                  <GridItem lg={5}>
                    <div className="liquidity_div" data-aos="fade-up" data-aos-duration="2000">

                      <div className="whitebox swap_box">
                        <div>
                          <div className="d-flex align-items-center mb-2 headchg">
                            <i className="fas fa-arrow-left" onClick={() => BackLiqutity()}></i>
                            <h2 className="importpoolh2">Import Pool</h2>
                            <HtmlTooltip className="tooltip_content"
                              title={
                                <React.Fragment>
                                  <p className="tooltip_content">Your trasaction will revert if the price changes unfavourably by more than this percentage</p>
                                </React.Fragment>
                              }
                            >
                              <i className="far fa-question-circle tooltip_icon"></i>
                            </HtmlTooltip>
                          </div>
                        </div>

                        <div className="input_panel">
                          <div className="d-flex justify-content-center align-items-center">
                            {/* <input disabled={(showLiqutity) ? false : true} onChange={inputChange} value={fromValue.showamount} id="from" type="text" placeholder="0.0" className="custom_inp"></input> */}
                            <Button onClick={() => { setCurr("from"); }} className="token_btn" data-toggle="modal" data-target="#token_modal">
                              <img src={config.imageUrl + fromValue.address.toLowerCase() + '.png'} alt="Logo" onError={(e) => { brokenImage(e) }} className="img-fluid" /> {fromValue.symbol} <i className="bi bi-chevron-down"></i>
                            </Button>
                          </div>
                        </div>

                        <div className="text-center mt-3 mb-3">
                          <img src={require("../../assets/images/plus.png")} alt="Logo" className="img-fluid" />
                        </div>

                        <div className="input_panel">
                          {/* <div className="d-flex justify-content-center align-items-center">
                            <label>To</label>
                            {toValue && toValue.address === "" &&
                              <label className="balance">Select a token</label>
                            }
                          </div> */}
                          <div className="d-flex justify-content-center align-items-center">
                            {/* <input disabled={(showLiqutity) ? false : true} onChange={inputChange} value={toValue.showamount} id="to" type="text" placeholder="0.0" className="custom_inp"></input> */}
                            {toValue && toValue.address === "" &&
                              <label className="balance balancechg">Select a token</label>
                            }
                            <Button onClick={() => { setCurr("to"); }} className="token_btn" data-toggle="modal" data-target="#token_modal">
                              {toValue && <img src={config.imageUrl + toValue.address.toLowerCase() + '.png'} alt="Logo" onError={(e) => { brokenImage(e) }} className="img-fluid" />} {toValue.symbol} <i className="bi bi-chevron-down"></i>
                            </Button>
                          </div>
                        </div>

                        {importLoad &&
                          <div className="d-flex justify-content-center align-items-center mt-2">
                            <ReactLoading type={"bars"} color={config.reactLoadr} className="loading" />
                          </div>
                        }

                        {walletConnection && walletConnection.address !== "" && walletConnection.connect === "yes" ?
                          <div>
                            {importDetail.isPair === "yes" ?
                              <div className="showPool mt-2">
                                <div className="d-flex justify-content-between align-items-center">
                                  <label>Pool found!</label>
                                  <Link to={"#"} onClick={() => { addImportLiqutity() }}>Create pool.</Link>
                                </div>
                                {importDetail.totalamount > 0 ?
                                  <div>
                                    <p className="text-dark">LP Tokens in Your Wallet:</p>
                                    <div className="showPool_pair">
                                      <img src={config.imageUrl + fromValue.address.toLowerCase() + '.png'} alt="Logo" onError={(e) => { brokenImage(e) }} className="img-fluid" />
                                      <img src={config.imageUrl + toValue.address.toLowerCase() + '.png'} alt="Logo" onError={(e) => { brokenImage(e) }} className="img-fluid" />
                                      <span>{fromValue.symbol}/{toValue.symbol} : {importDetail.totalamount}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                      <p className="text-dark">
                                        {fromValue.symbol} : {importDetail.fromamount}
                                      </p>
                                      <p className="text-dark">
                                        {toValue.symbol} : {importDetail.toamount}
                                      </p>
                                    </div>
                                  </div>
                                  :
                                  <div>
                                    <p className="text-dark">You don’t have liquidity in this pool yet.</p>
                                    <Link to={"#"} onClick={() => { addImportLiqutity() }}>Add Liquidity</Link>
                                  </div>
                                }
                              </div>
                              :
                              (importDetail.isPair === "no") ?
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                  <label>No pool found.</label>
                                  <Link to={"#"} onClick={() => { addImportLiqutity() }}>Create pool.</Link>
                                </div>
                                : ("")
                            }
                          </div>
                          :

                          <div className="text-center mt-2" data-toggle="modal" data-target="#wallet_modal">
                            <Button className="primary_btn blue_btn">Unlock Wallet</Button>
                          </div>

                        }
                      </div>
                    </div>
                  </GridItem>
                }
              </GridContainer>

              <GridContainer>
                <GridItem lg={12}>
                  <LiqutityList />
                </GridItem>
              </GridContainer>

            </div>
          </div>
        </div>
      </div>
      <FooterHome />

      {/*  Select Token Modal */}
      <TokenModal
        fromValue={fromValue}
        toValue={toValue}
        swapcurrent={swapcurrent}
        onChildTokenClick={childTokenClick}
        childImportClick={parentImportClick}
        importsection={importsection}
        tokenList={tokenList}
      />

      {/*  Wallet Token Modal */}
      <WalletModal />

      <LiqutityModal
        fromValue={fromValue}
        toValue={toValue}
        swapcurrent={swapcurrent}
        fromrate={fromrate}
        torate={torate}
        onChildClickLiqutity={childLiqutityModal}
        shareofPool={shareofPoolToken}
        receivedPool={receivedPool}
        firstliqutity={firstliqutity}
        slippageValue={slippageValue}

      />



      <SlippageModal
        onChildClick={childSettingClick}
      />

      {/*  Recent Transaction Modal */}
      <div className="modal fade primary_modal" id="recent_trans_modal" tabIndex="-1" role="dialog" aria-labelledby="recent_trans_modal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="recent_trans_modal_title">Recent Transactions</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {liqutityListHistory && liqutityListHistory.length > 0 && liqutityListHistory.map((item, i) => {
                var txUrl = config.txUrl + item.txid;
                var index = tokenList.findIndex(val => val.address === item.fromaddress);
                var fromsymbol = "";
                if (index !== -1) {
                  fromsymbol = tokenList[index].symbol;
                }
                var index1 = tokenList.findIndex(val => val.address === item.toaddress);
                var tosymbol = "";
                if (index1 !== -1) {
                  tosymbol = tokenList[index1].symbol
                }
                var fromAmt = (item.fromamount > 0) ? item.fromamount.toFixed(3) : 0;
                var toAmt = (item.toamount > 0) ? item.toamount.toFixed(3) : 0;

                var text = (item.actiontype === "add") ? "Add" : "Remove";


                return (
                  <a href={txUrl} target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center justify-content-between mb-3">
                    <p className="mb-0">{text} {fromAmt} {fromsymbol} for {toAmt} {tosymbol}</p>
                    <i className="bi bi-box-arrow-in-up-right"></i>
                  </a>
                )
              })}
              {liqutityListHistory && liqutityListHistory.length === 0 &&
                <p className="mb-0">Trancation not found</p>
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
