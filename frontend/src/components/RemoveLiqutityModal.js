import React, { useState, useEffect } from 'react'
import { Button, Tooltip } from "@material-ui/core";
import ReactLoading from "react-loading";
import { useSelector } from 'react-redux';


import { HelpOutline } from '@material-ui/icons';
import { Slider } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { connection } from "../helper/connection";
import { toastAlert } from "../helper/toastAlert";
import JSBI from 'jsbi/dist/jsbi.mjs';

import {
    removeLiquidity,
    removeLiquidityETH
} from "../ContractActions/routerActions";

import {
    getBalanceof,
    getTotalSupply
} from "../ContractActions/LPTokenActions";

import {
    approve,
    getLPbalance
} from "../ContractActions/bep20Actions";

import {
    convertToWei,
    toFixedFormat,
    getdeadline,
    division,
    toFixedWithoutRound,
    percentage,
    ChecktokenDecimal
} from "../helper/custommath";

import {
    convert
} from "../helper/convert";

import {
    getPair
} from "../ContractActions/factoryActions";

import {
    tokenDetails
} from "../Api/TokenActions";
import {
    removeliqutityValue
} from "../Api/LiqutityActions";
import { checkUser } from '../Api/UserActions'
import config from "../config/config";



var initialData = {
    "name": "",
    "symbol": "",
    "address": "",
    "amount": 0,
    "decimals": 18,
    "showamount": "-"
}

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#fff',
        color: '#787878',
        maxWidth: 220,
        fontSize: '12px',
        border: '1px solid #fff',
        boxShadow: '-4px 5px 10px 2px rgb(0 0 0 / 20%)'
    },
}))(Tooltip);

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

const RemoveLiqutityModal = (props) => {

    var { removeLiqClick } = props;

    const [from, setfrom] = useState(initialData);
    const [to, setto] = useState(initialData);
    const [fromrate, setfromrate] = useState(0);
    const [torate, settorate] = useState(0);
    const [poolLiq, setpoolLiq] = useState(0);
    const [removeLiq, setremoveLiq] = useState(0);
    const [isRemove, setisRemove] = useState(true);
    const [percentageValue, setpercentageValue] = useState(0);
    const [pairaddress, setpairaddress] = useState("");
    const [showloader, setshowloader] = useState(false);
    const [reserveFrom, setreserveFrom] = useState(0);
    const [reserveTo, setreserveTo] = useState(0);
    const [totalSupply, settotalSupply] = useState(0);
    const [isapproveBtn, setisapproveBtn] = useState(true);
    const [sliderloading, setsliderloading] = useState(true);

    var tokena = props.tokena;
    var tokenb = props.tokenb;

    const walletConnection = useSelector((state) => state.walletConnection);


    useEffect(() => {
        getTokenDetails();
        //eslint-disable-next-line
    }, []);

    const sliderChange = async (value) => {
        setisRemove(true);
        console.log(poolLiq, 'poolLiqpoolLiqpoolLiq', value)
        var per = (poolLiq) * parseFloat(value) / 100;
        var removedValue = await division(per, 1e18);
        var totalPool = JSBI.BigInt(poolLiq);
        var percenatgeVal = JSBI.BigInt(value);
        var multiply = JSBI.multiply(totalPool, percenatgeVal);
        var divideVal = JSBI.divide(multiply, JSBI.BigInt(100));
        var finalAmt = JSBI.BigInt(divideVal);
        var finalAmt1 = String(finalAmt);

        var fromAmt = parseFloat(reserveFrom) * (parseFloat(removedValue) / parseFloat(totalSupply));
        console.log(fromAmt, 'fromAmtfromAmtfromAmt', reserveFrom, removedValue, totalSupply)
        var toAmt = reserveTo * (parseFloat(removedValue) / totalSupply);

        var fromData = {
            showamount: await toFixedWithoutRound(fromAmt, 8), amount: fromAmt
        }
        var toData = {
            showamount: await toFixedWithoutRound(toAmt, 8), amount: toAmt
        }

        if (value === 100) {
            var liqutityBal = await getBalanceof("balanceOf", pairaddress);
            finalAmt1 = JSBI.BigInt(liqutityBal.value);
            finalAmt1 = String(finalAmt1);
        }

        setfrom({ ...from, ...fromData });
        setto({ ...to, ...toData });
        var liqRemove = await convert(per);
        if (liqRemove > 0) {
            setisapproveBtn(false)
        } else {
            setisapproveBtn(true)
        }
        setremoveLiq(finalAmt1);
        setpercentageValue(value);

    }

    async function getTokenDetails() {

        try {

            let userAddress = ""
            if (walletConnection && walletConnection.connect === "yes" && walletConnection.web3 && walletConnection.address && walletConnection.address !== "") userAddress = walletConnection.address;

            var getToken = await tokenDetails({ useraddress: userAddress });
            var allToken = JSON.parse(getToken.result);

            var pair = await getPair(tokena, tokenb, config.Factory);
            var pairAddress = pair.value;
            var frombalance = await getLPbalance(tokena, pairAddress);
            var tobalance = await getLPbalance(tokenb, pairAddress);

            var tokenAIndex = allToken.findIndex(val => val.address.toLowerCase() === tokena.toLowerCase());
            var tokenBIndex = allToken.findIndex(val => val.address.toLowerCase() === tokenb.toLowerCase());

            var fromsymbol = (tokenAIndex !== -1) ? allToken[tokenAIndex].symbol : "";
            var fromDecimals = (tokenAIndex !== -1) ? allToken[tokenAIndex].decimals : 18;

            var tosymbol = (tokenAIndex !== -1) ? allToken[tokenBIndex].symbol : "";
            var toDecimals = (tokenBIndex !== -1) ? allToken[tokenBIndex].decimals : 18;

            var reserveA = await division(frombalance.balanceOf, 10 ** fromDecimals);
            var reserveB = await division(tobalance.balanceOf, 10 ** toDecimals);

            setreserveFrom(reserveA);
            setreserveTo(reserveB);

            var amt = await toFixedFormat(reserveB / reserveA);
            var amt1 = await toFixedFormat(reserveA / reserveB);
            var SupplyValue = await getTotalSupply(pairAddress);
            var Supply = await division(SupplyValue.value, 1e18);


            setpairaddress(pairAddress);
            console.log(pairAddress, 'pairAddress')
            var liqutityBal = await getBalanceof("balanceOf", pairAddress);
            console.log(liqutityBal, 'liqutityBal')
            var balance = liqutityBal.value;
            setpoolLiq(balance);

            settotalSupply(Supply);
            setfromrate(amt);
            settorate(amt1);



            var fromData = {
                symbol: fromsymbol,
                address: tokena,
                decimals: fromDecimals
            }
            var toData = {
                symbol: tosymbol,
                address: tokenb,
                decimals: toDecimals
            }

            setfrom({ ...from, ...fromData });
            setto({ ...to, ...toData });
            setsliderloading(false);

        } catch (err) {

        }

    }


    async function ApproveRemove() {

        let reqdata = { address: walletConnection && walletConnection.address ? walletConnection.address : '' };
        let { status } = await checkUser(reqdata);
        if (status == true) {
            toastAlert('error', "Your Address is Blocked");
        }
        else {
            var get = await connection();

            if (get && get.web3) {
                var web3 = get.web3;
                var address = get.address;
                var value = removeLiq;
                var deadLine = await getdeadline(2);
                var nonce = web3.utils.toHex(0);
                // var msg = "owner: " + address + "\n" + "spender:" + address + "\n" + "value:" + value + "\n"
                //     + "nonce:" + nonce + "\n" + "deadline:" + deadLine;

                var msg = `owner: ${address} \n spender: ${address} \n value: ${value} \n nonce: ${nonce} \n deadline:${deadLine}`

                setshowloader(true)
                try {
                    setisapproveBtn(true)
                    await web3.eth.personal.sign(msg, address);
                    await approve(pairaddress, value.toString());
                    setshowloader(false)
                    setisRemove(false);
                } catch (err) {
                    setshowloader(false)
                    setisapproveBtn(false)
                }

            }
        }


    }

    async function Remove() {

        let reqdata = { address: walletConnection && walletConnection.address ? walletConnection.address : '' };
        let { status } = await checkUser(reqdata);
        if (status == true) {
            toastAlert('error', "Your Address is Blocked");
        }
        else {
            var get = await connection();
            var result = "";
            if (get && get.web3) {
                var amountAMin = 0;
                var amountBMin = 0;
                if (from.symbol !== config.ETHSYMBOL && to.symbol !== config.ETHSYMBOL) {
                    var tokenAamt = await percentage(from.amount, 3, 'minus');
                    amountAMin = await convertToWei(tokenAamt, from.decimals);
                    amountAMin = await ChecktokenDecimal(amountAMin, from.decimals);

                    var tokenBamt = await percentage(to.amount, 3, 'minus');
                    amountBMin = await convertToWei(tokenBamt, to.decimals);
                    amountBMin = await ChecktokenDecimal(amountBMin, to.decimals);

                    setshowloader(true);
                    setisRemove(true);
                    try {
                        result = await removeLiquidity(
                            tokena,
                            tokenb,
                            removeLiq,
                            amountAMin,
                            amountBMin
                        );
                        setshowloader(false);
                        setisRemove(false);
                        setisapproveBtn(false);

                        if (result && result.status) {
                            var tx = (result.value && result.value.transactionHash) ?
                                result.value.transactionHash : "";
                            var gasFeevalue = (result.value && result.value.gasUsed) ?
                                result.value.gasUsed : 0;
                            var gasFee = await division(gasFeevalue, 10 ** 18);

                            let LiqData = {
                                txid: tx,
                                address: walletConnection.address,
                                fromaddress: from.address,
                                fromamount: from.showamount,
                                toaddress: to.address,
                                toamount: to.showamount,
                                gasfee: gasFee,
                                lpamount: parseFloat(removeLiq) / 10 ** 18
                            }
                            await removeliqutityValue(LiqData);
                            toastAlert('success', "Successfully removed", 'liqutity');
                            //window.location.reload(false);
                            window.$('#remove_liqutity_modal').modal('hide');
                            removeLiqClick();
                        } else {
                            toastAlert('error', "Rejected", 'liqutity');
                        }

                    } catch (err) {

                        setshowloader(false)
                    }
                } else {

                    let tokenAamt = await percentage(from.amount, 3, 'minus');
                    amountAMin = await convertToWei(tokenAamt, from.decimals);

                    let tokenBamt = await percentage(to.amount, 3, 'minus');
                    amountBMin = await convertToWei(tokenBamt, to.decimals);

                    var token = from.address;
                    if (to.symbol !== config.ETHSYMBOL) {
                        token = to.address;
                    }

                    var tokenMin = (from.symbol !== config.ETHSYMBOL) ? amountAMin : amountBMin;
                    var tokenETHMin = (from.symbol === config.ETHSYMBOL) ? amountAMin : amountBMin;

                    setshowloader(true);
                    setisRemove(true);

                    var removeLiq1 = await convert(removeLiq);
                    amountAMin = await convert(tokenMin);
                    amountAMin = await ChecktokenDecimal(amountAMin, from.decimals);

                    amountBMin = await convert(tokenETHMin);
                    amountBMin = await ChecktokenDecimal(tokenETHMin, to.decimals);

                    try {
                        result = await removeLiquidityETH(
                            token,
                            removeLiq1,
                            amountAMin,
                            amountBMin
                        );
                        setshowloader(false);
                        setisRemove(false);
                        setisapproveBtn(false)
                        if (result && result.status) {

                            var tx1 = (result.value && result.value.transactionHash) ?
                                result.value.transactionHash : "";
                            var gasFeevalue1 = (result.value && result.value.gasUsed) ?
                                result.value.gasUsed : 0;
                            var gasFee1 = await division(gasFeevalue1, 10 ** 18);

                            let LiqData = {
                                txid: tx1,
                                address: walletConnection.address,
                                fromaddress: from.address,
                                fromamount: from.showamount,
                                toaddress: to.address,
                                toamount: to.showamount,
                                gasfee: gasFee1,
                                lpamount: parseFloat(removeLiq) / 10 ** 18
                            }
                            await removeliqutityValue(LiqData);
                            toastAlert('success', "Successfully removed", 'liqutity');
                            //window.location.reload(false);
                            window.$('#remove_liqutity_modal').modal('hide');
                            removeLiqClick();
                        } else {
                            toastAlert('error', "Rejected", 'liqutity');
                        }
                    } catch (err) {
                        setshowloader(false)
                    }

                }


            }
        }


    }

    function closePopup() {
        window.location.reload(false);
    }

    return (

        <div className="modal fade primary_modal" id="remove_liqutity_modal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="remove_liqutity_modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title m-0" id="confirm_swap_modal">
                            Remove Liquidity
                            <HtmlTooltip
                                title={
                                    <React.Fragment>
                                        <p className="tooltip_content">Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.</p>
                                    </React.Fragment>
                                }>
                                <Button className="round_btn"><HelpOutline /></Button>
                            </HtmlTooltip>
                        </h5>
                        <button type="button" className="close" onClick={() => { closePopup() }} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="trade_wrap_title pb-3">
                            <div>

                            </div>
                        </div>
                        <div className="input_panel">
                            <div className="d-flex justify-content-between align-items-center">
                                <label className="mb-0">Amount&nbsp;</label>
                                {percentageValue > 0 && <label className="remove_amt">{percentageValue}%</label>}
                            </div>
                        </div>
                        {sliderloading &&
                            <div className="d-flex justify-content-center align-items-center">
                                <div>
                                    <ReactLoading type={"bars"} color={config.reactLoadr} className="loading" />
                                </div>
                            </div>
                        }
                        {!sliderloading &&
                            <div className="px-2">
                                <Slider
                                    onChangeCommitted={(_, v) => sliderChange(v)}
                                    className="mt-4 white_slider" defaultValue={0}
                                    getAriaValueText={valuetext}
                                    aria-labelledby="discrete-slider-custom"
                                    step={1}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                />
                            </div>
                        }

                        <div className="text-center mt-4 mb-4">
                            <img src={require("../assets/images/icon_arrow.png")} alt="Logo" className="img-fluid" />
                        </div>

                        <div className="">

                            <div className="d-flex justify-content-between align-items-center">
                                <span className="">{from && from.address && <img src={config.imageUrl + from.address.toLowerCase() + '.png'} alt="Logo" className="img-fluid mr-2" height="35px" width="35px" />}{from.symbol}</span>
                                <span className="">{from.showamount}</span>
                            </div>
                            <br></br>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="">{to && to.address && <img src={config.imageUrl + to.address.toLowerCase() + '.png'} alt="Logo" className="img-fluid mr-2" height="35px" width="35px" />}{to.symbol}</span>
                                <span className="">{to.showamount}</span>
                            </div>
                        </div>


                        <div className="">
                            <label>Price &nbsp;</label>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="">Rates</span>
                                <span className="">1 {from.symbol}={fromrate} {to.symbol}</span>
                                <span className="">1 {to.symbol}={torate} {from.symbol}</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center butnchg">

                                <Button disabled={isapproveBtn} onClick={() => { ApproveRemove() }} className="primary_btn blue_btn">Approve</Button>

                                {removeLiq > 0 ?
                                    <Button disabled={(isRemove) ? "disabled" : ""} className="primary_btn blue_btn spacing" onClick={() => { Remove() }}>Remove</Button>
                                    :
                                    <Button className="primary_btn blue_btn spacing">Enter Amount</Button>
                                }
                                {showloader &&
                                    <div className="text-center mt-2 loader">
                                        <ReactLoading type={"bars"} color={config.reactLoadr} className="loading" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveLiqutityModal;