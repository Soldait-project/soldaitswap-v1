import React, { useEffect, useState, useRef } from "react";

// core components
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import { Button } from "@material-ui/core";
import Header from "../../components/Header/Header.js";
import FooterHome from "../../components/Footer/FooterHome.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import StaticNavbar from "../../components/StaticNavbar";
import { Slider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from "../../Api/UserActions"
import WalletModal from "../../components/WalletModal";
import TokenModal from "../../components/TokenModal";
import SwapModal from "../../components/SwapModal";
import SlippageModal from "../../components/SlippageModal";
import SwapHistory from "../../components/SwapHistory"
import RecentSwapHistory from "../../components/RecentSwapHistory"
import ExchangeChart from "../../components/ExchangeChart"

import ReactLoading from "react-loading";
import { toastAlert } from "../../helper/toastAlert";

import {
  getbalance,
  approveSwap,
  allowance
} from "../../ContractActions/bep20Actions";

import {
  numberFloatOnly,
  percentage,
  toFixedWithoutRound,
} from "../../helper/custommath";

import { convert } from "../../helper/convert";
import { tokenDetails } from "../../Api/TokenActions";
import config from "../../config/config";
import { setPairs } from "../../reducers/Actions";
import { setPairsPancake } from "../../reducers/Actions";

import {
  listToTokenMapValue,
  tryParseAmount,
  formatExecutionPrice,
  getMinumumReceived,
  getMethod,
  addmultiply,
  swapTradeExactOut,
  computeTradePriceBreakdown,
  getBestTokens,
  getAllowedPairs,
  SwapTradeExactIn
} from "./Pancake/hooks";//soldait

import {
  getAllowedPairs1,
  SwapTradeExactIn1,
  swapTradeExactOut1,
  listToTokenMapValue1,
  getBestTokens1,
  tryParseAmount1,
  computeTradePriceBreakdown1,
  formatExecutionPrice1
} from "./Pancake1/hooks";//pancake
import { isEmpty } from "lodash";
// import { Token } from "@pancakeswap/sdk";

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

// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
    //eslint-disable-next-line
  }, []);
  return null;
}

var initialData = {
  "name": "",
  "symbol": "",
  "address": "",
  "amount": "",
  "showamount": "",
  "value": "",
  "decimals": "",
  "payamount": "",
}

var initialData1 = {
  "priceper": 0,
  "priceperinvert": 0,
  "minimumReceived": 0,
  "liquidityFee": 0,
  "priceimpact": 0,
  "fromamount": 0,
  "fromdecimal": 0,
  "toamount": 0,
  "todecimal": 0,
  "path": [],
  "isRoutes": []
}

export default function Exchange(props) {
  const modalRef = useRef();


  const { ...rest } = props;
  //const classes = useStyles();
  const dispatch = useDispatch();
  const pairValue = useSelector((state) => state.allowedPairs);
  const pairValuePancake = useSelector((state) => state.allowedPairsPancake)
  const walletConnection = useSelector((state) => state.walletConnection);
  const eligibleUser = useSelector((state) => state.isEligible);
  const [fromValue, setfromValue] = useState(initialData);
  const [toValue, settoValue] = useState(initialData);
  const [swapcurrent, setswapcurrent] = useState("");
  const [frombalance, setfrombalance] = useState({ "balance": "Loading", "balanceOf": 0 });
  const [tobalance, settobalance] = useState({ "balance": 0, "balanceOf": 0 });

  //const [showapprove, setshowapprove] = useState(false);
  const [approvebtn, setapprovebtn] = useState(false);

  const [insufficienterror, setinsufficienterror] = useState(false);
  const [Insufficienttoken, setInsufficienttoken] = useState("");
  const [insufficientliqerror, setinsufficientliqerror] = useState(false);


  const [checkallowance, setcheckallowance] = useState(false);
  const [showswap, setshowswap] = useState(false);

  const [slippageValue, setslippageValue] = useState(0.5);
  const [transdeadline, settransdeadline] = useState(5);

  const [swaploading, setswaploading] = useState(false);
  const [tokenList, settokenList] = useState([]);

  const [showChart, setshowChart] = useState(true);
  const [enterValue, setenterValue] = useState(0);

  const [loadslider, setloadslider] = useState(true);

  const [swapdata, setswapdata] = useState(initialData1);
  const [best_to_check_trades, setbest_to_check_trades] = useState([]);
  const [isPair, setisPair] = useState(true);
  const [showRecentHistory, setshowRecentHistory] = useState(false);
  const [best_to_check_trades1, setbest_to_check_trades1] = useState([]);
  //const [singleHopOnly, setsingleHopOnly] = useState(false);

  const [currentPair, setcurrentPair] = useState("");
  const [routerContract, setrouterContract] = useState("");

  useEffect(() => {
    setInitial();
    //eslint-disable-next-line
  }, [walletConnection]);


  async function setInitial() {

    let userAddress = ""
    if (walletConnection && walletConnection.connect === "yes" && walletConnection.web3 && walletConnection.address && walletConnection.address !== "") userAddress = walletConnection.address;
    var getToken = await tokenDetails({ useraddress: userAddress });
    var tokenList = JSON.parse(getToken.result);
    if (tokenList && tokenList.length > 0) {
      var resp = await getBestTokens(tokenList);
      var resp1 = await getBestTokens1(tokenList);

      setbest_to_check_trades(resp);
      setbest_to_check_trades1(resp1);
      var index = 1;
      var index1 = 0;
      try {
        var fromData = {
          "name": tokenList[index].name,
          "symbol": tokenList[index].symbol,
          "address": tokenList[index].address,
          "decimals": tokenList[index].decimals,
        }

        var toData = {
          "name": tokenList[index1].name,
          "symbol": tokenList[index1].symbol,
          "address": tokenList[index1].address,
          "decimals": tokenList[index1].decimals,
        }

        settokenList(tokenList);
        setfromValue({ ...fromValue, ...fromData });
        settoValue({ ...toValue, ...toData });
        setTimeout(function () {
          getuserbal(tokenList[index].address, tokenList[index].symbol)
        }, 500)
        setTimeout(function () {
          getuserbal1(tokenList[index1].address)
        }, 500);

        setFromDetails(fromData);
        setTimeout(function () {
          setToDetails(toData);
        }, 1000);

        await loadPairs(fromData.address, toData.address, resp)
      } catch (err) {
      }

    }
  }


  async function loadPairs(from, to, best) {
    setisPair(false)

    try {
      let index2 = tokenList.findIndex((val) => val.address.toLowerCase() === from.toLowerCase())
      let index3 = tokenList.findIndex((val) => val.address.toLowerCase() === to.toLowerCase())
      let inputToken = tokenList[index2];
      let outputToken = tokenList[index3];
      var inputCurrency = await listToTokenMapValue(inputToken);
      var outputCurrency = await listToTokenMapValue(outputToken);
      setisPair(true)
      let arr = [];
      arr.push(inputToken, outputToken)
      setisPair(true)
      var soldaitgetPairs = await getAllowedPairs(inputCurrency ?? undefined, outputCurrency ?? undefined, best ?? undefined)

      var inputCurrency1 = await listToTokenMapValue1(tokenList[index2]);
      var outputCurrency1 = await listToTokenMapValue1(tokenList[index3]);
      if (inputCurrency1 && outputCurrency1) {
        var pancakegetPairs = await getAllowedPairs1(inputCurrency1 ?? undefined, outputCurrency1 ?? undefined, best ?? undefined)
        dispatch(setPairsPancake({ pairspancake: pancakegetPairs }));
      }

      setisPair(true)
      dispatch(setPairs({ pairs: soldaitgetPairs }));

      // setisPair(true)
      return {
        soldaitgetPairs,
        pancakegetPairs
        //   }
        // }
      }
      setisPair(true)

    } catch (err) {
      return {
        soldaitgetPairs: [],
        pancakegetPairs: []
      }
    }
    setisPair(true)
    return true;
  }
  async function getuserbal(from, symbol) {
    var value = await getbalance(from, symbol);
    setfrombalance({ balance: value.balance, balanceOf: value.balanceOf });
  }
  async function getuserbal1(to, symbol) {
    var value = await getbalance(to, symbol);
    settobalance({ balance: value.balance, balanceOf: value.balanceOf });
  }

  function setCurr(item) {
    setswapcurrent(item);
  }

  async function swapChange() {

    if (fromValue.address !== "" && toValue.address !== "") {
      setshowChart(false);
      var fromD = toValue;
      var toD = fromValue;
      var fromBal = tobalance;
      setfromValue(fromD);
      settoValue(toD);
      setfrombalance(tobalance);
      settobalance(frombalance);
      var value = enterValue;

      if (value && value > 0) {
        setshowswap(false);
        setswaploading(true);
      }

      var id = (swapcurrent === "from") ? "to" : "from";
      var { soldaitgetPairs, pancakegetPairs } = await loadPairs(fromD.address, toD.address, best_to_check_trades)
      if (value && value > 0) {
        await calculateAmount(id, value, fromD, toD, "yes", slippageValue, fromBal, soldaitgetPairs, pancakegetPairs);
      }

      // if (toD.symbol === "ETH" || fromD.symbol === "ETH") {
      //   setshowapprove(false);
      // } else {
      //   setshowapprove(true);
      // }
      setTimeout(setshowChart.bind(this, true), 500);
    }

  }

  const inputChange = async (event) => {

    var id = event.target.id;
    var value = event.target.value;
    calculateAmount(id, value, fromValue, toValue, "no", slippageValue, 0, [], []);
    setenterValue(value);
  }

  async function calculateAmount(id, value, fromData, toData, interchange, slippage, fromBal, soldaitpairs, pancakepairs) {

    setswaploading(true);
    setinsufficienterror(false);
    setinsufficientliqerror(false)

    var pairs = (soldaitpairs && soldaitpairs.length > 0) ? soldaitpairs : pairValue.pairs;
    var pancakepairs = (pancakepairs && pancakepairs.length > 0) ? pancakepairs : pairValuePancake.pairspancake;
    let index2 = tokenList.findIndex((val) => val.address.toLowerCase() === fromData.address.toLowerCase())
    let index3 = tokenList.findIndex((val) => val.address.toLowerCase() === toData.address.toLowerCase())
    let inputToken = tokenList[index2];

    let outputToken = tokenList[index3];

    var inputCurrency = await listToTokenMapValue(inputToken);
    var outputCurrency = await listToTokenMapValue(outputToken);

    var status = await numberFloatOnly(value);
    setswapcurrent(id);
    var str = value.toString();
    var res = str.charAt(str.length - 1);

    if (id === "from") {
      setfromValue({ ...fromData, ...{ "amount": value, "showamount": value, value } });
    } else if (id === "to") {
      settoValue({ ...toData, ...{ "amount": value, "showamount": value, value } });
    }

    if (status && res !== "." && parseFloat(value) > 0) {

      var isExactIn = (id === "from") ? true : false;
      var singleHopOnly = false;
      var typedValue = value;
      var from = fromData.address;
      var to = toData.address;
      let index = tokenList.findIndex((val) => val.address.toLowerCase() === from.toLowerCase())
      let index1 = tokenList.findIndex((val) => val.address.toLowerCase() === to.toLowerCase())
      let inputToken = tokenList[index];
      let outputToken = tokenList[index1];

      var inputCurrency = await listToTokenMapValue(inputToken);
      var outputCurrency = await listToTokenMapValue(outputToken);

      var inputCurrency1 = await listToTokenMapValue1(inputToken);
      var outputCurrency1 = await listToTokenMapValue1(outputToken);

      var parsedAmount = tryParseAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined)
      var parsedAmount1 = tryParseAmount1(typedValue, (isExactIn ? inputCurrency1 : outputCurrency1) ?? undefined)

      var trade = null;
      var Soldaittrade = null;
      var Pancaketrade = null;
      var priceImpactVal = 0;

      var currRouter = null;
      if (isExactIn) {
        Soldaittrade = await SwapTradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency ?? undefined, singleHopOnly ?? undefined, pairs ?? undefined)
        Pancaketrade = await SwapTradeExactIn1(isExactIn ? parsedAmount1 : undefined, outputCurrency1 ?? undefined, singleHopOnly ?? undefined, pancakepairs ?? undefined)
      } else {
        Soldaittrade = await swapTradeExactOut(inputCurrency ?? undefined, !isExactIn ? parsedAmount : undefined, singleHopOnly ?? undefined, pairs ?? undefined)
        Pancaketrade = await swapTradeExactOut1(inputCurrency1 ?? undefined, !isExactIn ? parsedAmount1 : undefined, singleHopOnly ?? undefined, pancakepairs ?? undefined)
      }


      if (!isEmpty(Soldaittrade)) {
        trade = Soldaittrade
        currRouter = config.Router;
        var { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(Soldaittrade)
        priceImpactVal = (priceImpactWithoutFee) ? priceImpactWithoutFee.toFixed(2) : 0

        if (Pancaketrade && parseFloat(priceImpactVal) > 15) {
          trade = Pancaketrade
          var { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown1(Pancaketrade)
          priceImpactVal = (priceImpactWithoutFee) ? priceImpactWithoutFee.toFixed(2) : 0;
          currRouter = config.PancakeRouter;
        }

      }
      else {
        trade = Pancaketrade
        currRouter = config.PancakeRouter;
        var { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown1(trade)
        priceImpactVal = (priceImpactWithoutFee) ? priceImpactWithoutFee.toFixed(2) : 0
        if (Soldaittrade && parseFloat(priceImpactWithoutFee) > 15) {
          trade = Soldaittrade
          var { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown1(trade)
          priceImpactVal = (priceImpactWithoutFee) ? priceImpactWithoutFee.toFixed(2) : 0
          currRouter = config.Router;
        }
      }
      setrouterContract(currRouter)
      if (trade) {
        let pairAddr = (trade.route && trade.route.pairs && trade.route.pairs[0] && trade.route.pairs[0].liquidityToken && trade.route.pairs[0].liquidityToken.address) ? trade.route.pairs[0].liquidityToken.address : ""
        setcurrentPair(pairAddr);

        let inputAmount = (trade && trade.route && trade.inputAmount) ? (id === "from") ? typedValue : trade.inputAmount.toSignificant(18) : null;
        let outputAmount = (trade && trade.route && trade.outputAmount) ? (id === "to") ? typedValue : trade.outputAmount.toSignificant(18) : null;
        var path = (trade && trade.route && trade.route.path) ? trade.route.path : null


        var priceper = "0";
        var priceperinvert = "0";
        if (trade && trade) {
          priceper = formatExecutionPrice(trade, true)
          priceperinvert = formatExecutionPrice(trade, false)
        }

        var bestpath = [];
        var isRoutes = [];
        if (path) {
          for (var p = 0; p < path.length; p++) {
            bestpath.push(path[p].address)
            isRoutes.push(path[p].symbol)
          }
        } else {
          return;
        }

        var minReceived = {
          "fromAmt": (inputAmount) ? inputAmount : 0,
          "toAmt": (outputAmount) ? parseFloat(outputAmount) : 0,
          "id": (isExactIn) ? "from" : "no",
          "slippageValue": slippage
        }

        var minVal = await getMinumumReceived(minReceived);
        const priceImpact = (priceImpactVal) ? parseFloat(priceImpactVal).toFixed(2) : "0";

        const liqutityfee = (realizedLPFee) ? realizedLPFee.toSignificant(6) : "0";

        var data = {
          isExactIn: isExactIn,
          from: inputToken,
          to: outputToken
        }
        var { method, fromField, toField } = await getMethod(data, tokenList)

        var paths = (bestpath && bestpath.length > 0) ? bestpath : []

        var amount1 = (isExactIn) ? addmultiply(inputAmount, 10 ** fromValue.decimals) : addmultiply(minVal, 10 ** fromValue.decimals);
        amount1 = await convert(amount1);

        var checkDeci = amount1.split('.')
        if (checkDeci.length === 2) {
          amount1 = checkDeci[0]
        }

        var amount2 = (!isExactIn) ? addmultiply(outputAmount, 10 ** toValue.decimals) : addmultiply(minVal, 10 ** toValue.decimals);
        amount2 = await convert(amount2);

        var checkDeci1 = amount2.split('.')
        if (checkDeci1.length === 2) {
          amount2 = checkDeci1[0]
        }

        var fromAmount = inputAmount;
        //var toAmount = outputAmount;

        setfromValue({ ...fromData, ...{ "amount": amount1, showamount: fromAmount, value: (id === "from") ? value : fromAmount } });
        settoValue({ ...toData, ...{ "amount": amount2, showamount: outputAmount, value: (id === "to") ? value : outputAmount } });
        setshowswap(true);

        if (fromData.address !== "") {
          ValidateAllowance(fromData.address, fromAmount, fromData.symbol);
        }

        var checkFromBal = parseFloat(frombalance.balanceOf);
        if (interchange === "yes") {
          checkFromBal = parseFloat(fromBal.balanceOf);
        }

        if (parseFloat(amount1) > parseFloat(checkFromBal)) {
          setinsufficienterror(true);
          let symbl = fromData && fromData.symbol ? fromData.symbol : fromValue.symbol
          setInsufficienttoken(symbl);
          return;
        }
        setswapdata({
          priceper: parseFloat(priceper),
          priceperinvert: parseFloat(priceperinvert),
          minimumReceived: parseFloat(minVal),
          liquidityFee: parseFloat(liqutityfee),
          priceimpact: (priceImpact === 0) ? "<0.01" : priceImpact,
          [fromField]: amount1,
          fromdecimal: fromData.decimals,
          [toField]: amount2,
          todecimal: toData.decimals,
          path: paths,
          method: method,
          id: id,
          fromsymbol: fromData.symbol,
          tosymbol: toData.symbol,
          isRoutes: isRoutes,
          routerContract: currRouter
        })
        setswaploading(false);

      } else {
        if (value !== "") {

          setinsufficientliqerror(true)
        }

        resetSwap(fromData, toData)
      }
    } else if (value === "") {
      await resetSwap(fromData, toData)
    } else if (!status) {
      await resetSwap(fromData, toData)
    }

    setswaploading(false);

  }


  function resetSwap(fromData, toData) {


    setswapdata({
      priceper: 0,
      priceperinvert: 0,
      minimumReceived: 0,
      liquidityFee: 0,
      priceimpact: 0,
      fromamount: 0,
      fromdecimal: 0,
      toamount: 0,
      todecimal: 0,
      path: [],
      method: "",
      isRoutes: []
    });

    // setfromValue({ ...fromData, ...{ "amount": "", showamount: "", value: "" } });
    // settoValue({ ...toData, ...{ "amount": "", showamount: "", value: "" } });

    return;

  }

  async function ValidateAllowance(address, amounts0, symbol) {

    // var value1 = await allowance(address, config.Router);
    var value1 = await allowance(address, routerContract);

    setcheckallowance(false);
    if (parseFloat(value1.value) < parseFloat(amounts0) && symbol !== config.ETHSYMBOL) {
      setcheckallowance(true);
      setshowswap(false);
    } else {
      setshowswap(true);
    }

    setswaploading(false);
  }

  async function approveToken() {
    let reqdata = { address: walletConnection && walletConnection.address ? walletConnection.address : '' };
    let { status } = await checkUser(reqdata);
    if (status == true) {
      toastAlert('error', "Your Address is Blocked");
    }
    else {
      var value = await getbalance(fromValue.address, fromValue.symbol);
      try {
        var balance = value.balance;
        var amt = parseFloat(fromValue.amount) / 1e18;

        if (balance >= amt) {
          setapprovebtn(true);
          var approveAmt = 10000000 * (10 ** 18);
          approveAmt = await convert(approveAmt);
          // var result = await approveSwap(fromValue.address, approveAmt, config.Router);
          var result = await approveSwap(fromValue.address, approveAmt, routerContract);

          if (result.status) {
            //setshowapprove(false);
            setshowswap(true);
            setcheckallowance(false);
            setapprovebtn(false);
            toastAlert('success', "Approve Success", 'balance');
          } else {
            setapprovebtn(false);
          }
        } else {
          setapprovebtn(false);
          toastAlert('error', "Insuffucient balance", 'balance');
        }
      } catch (err) {
        setapprovebtn(false);
      }
    }


  }

  async function showSwapModal() {
    //check to current price update
    let reqdata = { address: walletConnection && walletConnection.address ? walletConnection.address : '' };
    let { status } = await checkUser(reqdata);

    if (status == true) {
      toastAlert('error', "Your Address is Blocked");
    }
    else {
      await calculateAmount(swapcurrent, enterValue, fromValue, toValue, "no", slippageValue, 0, [], []);
      window.$('#swap_modal').modal('show');
    }


  }

  async function confirmSupply() {
    var { soldaitgetPairs, pancakegetPairs } = await loadPairs(fromValue.address, toValue.address, best_to_check_trades)
    await calculateAmount(swapcurrent, enterValue, fromValue, toValue, "no", slippageValue, 0, soldaitgetPairs, pancakegetPairs);
    return true;
  }

  async function childSettingClick(value) {
    if (value && value.settings) {
      setslippageValue(value.settings);
      calculateAmount("from", fromValue.showamount, fromValue, toValue, "no", parseFloat(value.settings), 0, [], []);

    }
    if (value && value.deadline) {
      settransdeadline(value.deadline);
    }

    if (value && value.ismultiHops) {
      //var isHops = (value.ismultiHops === "true") ? true : false
      // setsingleHopOnly(isHops);
      await resetSwap(fromValue, toValue);
      setswaploading(false);
    }
  }

  async function childTokenClick(item, currentTab) {

    window.$('#token_modal').modal('hide');
    setshowChart(false);
    if (currentTab === "from" && item && item.address !== "") {
      setfromValue({ ...fromValue, ...item });
      if (fromValue.showamount > 0) {
        setswaploading(true);
        setshowswap(false);
      }
      var { soldaitgetPairs, pancakegetPairs } = await loadPairs(item.address, toValue.address, best_to_check_trades)

      if (fromValue.showamount > 0) {
        calculateAmount("from", fromValue.showamount, item, toValue, "no", slippageValue, 0, soldaitgetPairs, pancakegetPairs);
      }
      setFromDetails(item);

    } else if (item && item.address !== "") {
      if (toValue.showamount > 0) {
        setswaploading(true);
        setshowswap(false);
      }
      settoValue({ ...toValue, ...item });

      var { soldaitgetPairs, pancakegetPairs } = await loadPairs(fromValue.address, item.address, best_to_check_trades)

      if (toValue.showamount > 0) {
        calculateAmount("from", fromValue.showamount, fromValue, item, "no", slippageValue, 0, soldaitgetPairs, pancakegetPairs);

      }
      setToDetails(item);
    }


    setTimeout(setshowChart.bind(this, true), 500);
  }

  async function setFromDetails(item) {
    var value = await getbalance(item.address, item.symbol);
    setfrombalance({ balance: value.balance, balanceOf: value.balanceOf });
    // if (item.symbol !== "ETH") {
    //   setshowapprove(true);
    // } else {
    //   setshowapprove(false);
    // }

  }
  async function setToDetails(item) {
    if (item === undefined || item === "") {
      settobalance({ balance: 0, balanceOf: 0 });
    } else {
      var value = await getbalance(item.address, item.symbol);
      settobalance({ balance: value.balance, balanceOf: value.balanceOf });
      // if (fromValue.symbol !== "") {
      //   setshowapprove(true);
      // }
    }
  }

  const sliderChange = async (value) => {

    setloadslider(false)
    setenterValue("");

    if (frombalance && frombalance.balance > 0) {

      var calculate = await percentage(frombalance.balance, value, 'percentage');
      if (value === 100) {
        var bal = await toFixedWithoutRound(frombalance.balance, 4);
        calculate = bal;
      }

      setenterValue(calculate.toString());
      await calculateAmount("from", calculate.toString(), fromValue, toValue, "no", slippageValue, 0, [], []);
    }
    setloadslider(true)
  }

  async function childSwapModal() {

    setisPair(false)
    setTimeout(function () {
      loadPairs(fromValue.address, toValue.address, best_to_check_trades)
    }, 2000)
    setTimeout(function () {
      getuserbal(fromValue.address, fromValue.symbol)
    }, 500)
    setTimeout(function () {
      getuserbal1(toValue.address, toValue.symbol)
    }, 500);
    setfromValue({ ...fromValue, ...{ "amount": "", showamount: "" } });
    settoValue({ ...toValue, ...{ "amount": "", showamount: "" } });
    setswapdata(initialData1);
  }

  function showHistory() {
    setshowRecentHistory(true);
    setTimeout(function () {
      window.$('#recent_trans_modal').modal('show');
    }, 1200)

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
          <div className="inner_heading_wrapper exchange_heading_wrap">
            <div className="container">
              <GridContainer>
                <GridItem md={12} data-aos="fade-up" data-aos-duration="2000">
                  <h2>Exchange</h2>
                  <p>Trade tokens in an instant</p>
                </GridItem>
              </GridContainer>
            </div>
          </div>
          <div className="inner_content_wrapper">
            <div className="container">
              <GridContainer>
                <GridItem lg={7} md={12} sm={12} className="d-flex">
                  {showChart && fromValue.symbol && fromValue.symbol !== "" && toValue.symbol && toValue.symbol !== "" &&
                    <ExchangeChart
                      fromValue={fromValue}
                      toValue={toValue}
                    />
                  }
                  {!showChart &&
                    <div className="d-flex justify-content-center align-items-center w-100">
                      <ReactLoading type={"spinningBubbles"} color="#002d98" className="loading" />
                    </div>
                  }
                </GridItem>
                <GridItem lg={5} md={12} sm={12} className="d-flex">
                  <div className="exchange_div" data-aos="fade-up" data-aos-duration="2000">
                    <div className="whitebox swap_box">
                      <div className="trade_wrap_title">
                        <div>
                          <h2>Swap</h2>
                          <h5>Trade token in instant at market...</h5>
                        </div>
                        <div>
                          <Button onClick={() => showHistory()} className="round_btn" data-toggle="modal"><i className="fas fa-sync-alt"></i></Button>
                          <Button className="round_btn" data-toggle="modal" data-target="#settings_modal"><i className="fas fa-cog"></i></Button>
                        </div>
                      </div>
                      <div className="input_panel">
                        <div className="d-flex justify-content-between align-items-center">
                          <label>From</label>
                          <label>Balance: <span>{(frombalance.balance > 0 && walletConnection &&
                            walletConnection.connect === "yes") ? parseFloat(frombalance.balance) : 0}</span></label>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <input
                            type="text"
                            placeholder="0.0"
                            className="custom_inp"
                            onChange={inputChange}
                            value={fromValue.showamount}
                            id="from"
                            disabled={(!isPair) ? true : false}
                          ></input>
                          <Button className="token_btn" data-toggle="modal" data-target="#token_modal" onClick={() => { setCurr("from"); modalRef.current.handleModalOpen(); }}>
                            {fromValue.address && fromValue.address !== "" &&
                              <img src={config.imageUrl + fromValue.address.toLowerCase() + '.png'} alt="Logo" className="img-fluid" onError={(e) => { e.target.onerror = null; e.target.src = config.defaultLogo }} />}
                            {fromValue.symbol} <i className="bi bi-chevron-down"></i>
                          </Button>
                        </div>
                      </div>
                      <div className="slide">
                        {loadslider ?
                          <Slider onChangeCommitted={(_, v) => sliderChange(v)}
                            className="mt-1" defaultValue={0} getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-custom" step={1}
                            valueLabelDisplay="auto" marks={marks} />
                          :
                          <Slider
                            className="mt-1" defaultValue={0} getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-custom" step={1}
                            valueLabelDisplay="auto" marks={marks} />
                        }
                      </div>
                      {swaploading ?
                        <div className="text-center mt-3 mb-3">
                          <img src={require("../../assets/images/exchange_icon.png")} alt="Logo" className="img-fluid" />
                        </div>
                        :
                        <div className="text-center mt-3 mb-3">
                          <img onClick={() => swapChange()} src={require("../../assets/images/exchange_icon.png")} alt="Logo" className="img-fluid" />
                        </div>
                      }

                      <div className="input_panel">
                        <div className="d-flex justify-content-between align-items-center">
                          <label>To</label>
                          <label>Balance: <span>{(tobalance.balance > 0 && walletConnection && walletConnection.connect === "yes") ? parseFloat(tobalance.balance) : 0}</span></label>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <input
                            type="text"
                            placeholder="0.0"
                            className="custom_inp"
                            onChange={inputChange}
                            value={toValue.showamount}
                            id="to"
                            disabled={(!isPair) ? true : false}
                          >

                          </input>
                          <Button className="token_btn" data-toggle="modal" data-target="#token_modal" onClick={() => { setCurr("to"); modalRef.current.handleModalOpen(); }}>
                            {toValue && <img src={config.imageUrl + toValue.address.toLowerCase() + '.png'} onError={(e) => { e.target.onerror = null; e.target.src = config.defaultLogo }} alt="Logo" className="img-fluid" />}
                            {(toValue.symbol !== "") ? toValue.symbol : "Select a currency"}
                            <i className="bi bi-chevron-down"></i>
                          </Button>
                        </div>
                      </div>
                      {/* <div className="equivalent_value mt-2">
                        <p>1 ETH = 2239.69 USDT</p>
                        <i className="fas fa-sync"></i>
                      </div> */}
                      {walletConnection && walletConnection.address !== "" && walletConnection.connect === "yes" ?
                        <div>

                          {(insufficientliqerror) ?
                            <div className="text-center mt-2">
                              <Button className="primary_btn blue_btn">Insufficient liquidity for this trade.</Button>
                            </div>
                            :
                            (fromValue.amount === "" || toValue.amount === "" || fromValue.amount === "0" || toValue.amount === "0" || fromValue.amount === 0 || toValue.amount === 0) ?
                              <div className="text-center mt-2">
                                <Button className="primary_btn blue_btn">Enter Amount</Button>
                              </div>
                              :
                              (insufficienterror) ?
                                <div className="text-center mt-2">
                                  <Button className="primary_btn blue_btn">Insufficient balance {Insufficienttoken}.</Button>
                                </div>

                                : (swapdata && swapdata.priceimpact && parseFloat(swapdata.priceimpact) > 15) ?
                                  <div className="text-center mt-2">
                                    <Button className="primary_btn blue_btn">Price impact to high</Button>
                                  </div>
                                  :
                                  (checkallowance) ?
                                    <div className="text-center mt-2">
                                      <Button disabled={approvebtn} onClick={() => { approveToken() }} className="primary_btn blue_btn">Enable {fromValue.symbol}</Button>
                                    </div>
                                    :
                                    (showswap && swapdata && swapdata.priceimpact && parseFloat(swapdata.priceimpact) <= 15) ?

                                      <div className="text-center mt-2">
                                        <Button onClick={() => { showSwapModal() }} className="primary_btn blue_btn">Swap</Button>
                                      </div>
                                      : ("")
                          }
                        </div>
                        :
                        <div className="text-center mt-2">
                          <Button className="primary_btn blue_btn">Unlock Wallet</Button>
                        </div>

                      }

                      {(swaploading || approvebtn) &&
                        <div className="text-center mt-2">
                          <ReactLoading type={"bars"} color={config.reactLoadr} className="loading" />
                        </div>
                      }


                      <hr />
                      <div className="trade_notes">
                        <div>
                          <span>{(swapcurrent === "to") ? "Maximum sold" : "Minimum Received"}:</span>
                          <span>{(swapdata && swapdata.minimumReceived && parseFloat(swapdata.minimumReceived) > 0) ? parseFloat(swapdata.minimumReceived).toFixed(4) : 0}</span>
                        </div>
                        <div>
                          <span>Slippage Tolerance:</span>
                          <span>{(slippageValue && parseFloat(slippageValue) > 0) ? slippageValue : 0} %</span>
                        </div>
                        <div>
                          <span>Liquidity Provider Fee:</span>
                          <span>{(swapdata && swapdata.liquidityFee && parseFloat(swapdata.liquidityFee) > 0) ? parseFloat(swapdata.liquidityFee).toFixed(4) : 0}</span>
                        </div>
                        <div>
                          <span>Price Impact:</span>
                          <span>{swapdata.priceimpact} %</span>
                        </div>
                        {swapdata && swapdata.isRoutes && swapdata.isRoutes.length > 2 &&
                          <div className="bestRoutes">
                            <span>Route:</span>
                            <div>
                              {swapdata.isRoutes.map((item, i) => {
                                var total = swapdata.isRoutes.length - 1;
                                var pathname = (i !== total) ? item + " >" : item;
                                return (
                                  <span className="px-1">{pathname}</span>
                                )
                              })}
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem lg={12}>
                  <SwapHistory />
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
        ref={modalRef}
      />

      <SwapModal
        fromValue={fromValue}
        toValue={toValue}
        swapcurrent={swapcurrent}
        slippage={slippageValue}
        deadline={transdeadline}
        onchildSwapModal={childSwapModal}
        settobalance={settobalance}
        onchildconfirmSupply={confirmSupply}
        swapdata={swapdata}
        currentPair={currentPair}
      />

      {/*  Wallet Token Modal */}
      <WalletModal />

      {/*  Settings Modal */}
      <SlippageModal
        onChildClick={childSettingClick}
      />

      {/*  Recent Transaction Modal */}
      {showRecentHistory &&
        <RecentSwapHistory
          tokenList={tokenList}
        />
      }

    </div>
  );
}
