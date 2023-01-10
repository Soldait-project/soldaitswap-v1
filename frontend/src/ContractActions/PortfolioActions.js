import BEP20ABI from "../ABI/BEP20.json";
import { connection } from "../helper/connection";
import { convert } from "../helper/convert";
import { toFixedWithoutRound } from "../helper/custommath";

import {
    Multicall,
    ContractCallResults,
} from "ethereum-multicall";

import { tokenDetails } from "../Api/TokenActions";
import { getTokenPrices } from "Api/aws";

export async function getUsertokens(web3Reducer, walletConnection, allToken) {

    var Emptylist = [
        {
            symbol: 'BNB',
            balance: 0,
            balanceUSD: 0,
            balancePer: 0,
            balanceUSDPer: 0,
        },
        {
            symbol: 'ETH',
            balance: 0,
            balanceUSD: 0,
            balancePer: 0,
            balanceUSDPer: 0,
        },
        {
            symbol: 'CAKE',
            balance: 0,
            balanceUSD: 0,
            balancePer: 0,
            balanceUSDPer: 0,
        },
        {
            symbol: 'XRP',
            balance: 0,
            balanceUSD: 0,
            balancePer: 0,
            balanceUSDPer: 0,
        }
    ];


    if (web3Reducer.address && web3Reducer.address !== "" && walletConnection.connect !== "no") {
        var getToken = await tokenDetails({ useraddress: web3Reducer.address });
        var allToken = getToken.result;
    } else {
        return {
            list: Emptylist,
            totalAmount: 0,
            status: false,
            totalUSD: 0
        };
    }

    try {

        if (web3Reducer.web3 && web3Reducer.address && web3Reducer.address != "") {
            var web3 = web3Reducer.web3;
            var address = web3Reducer.address;
        } else {
            var get = await connection();
            var web3 = get.web3;
            var address = get.address;
        }

        if (web3 && address != "" && walletConnection && walletConnection.connect == "yes") {

            var multicall = new Multicall({
                web3Instance: web3,
            });

            let contractCallContext = []

            for (let i = 0; i < allToken.length; i++) {
                contractCallContext.push({
                    reference: "balanceOf" + i,
                    contractAddress: allToken[i].address,
                    abi: BEP20ABI,
                    calls: [
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [address],
                        },
                    ],
                })
            }

            const results = await multicall.call(contractCallContext);
            let balanceOf = [];
            let tokenAddress = [];
            let totalAmount = 0
            let balance
            for (let i = 0; i < allToken.length; i++) {
                if (allToken[i].symbol === 'BNB') {
                    balance = await web3.eth.getBalance(address);
                    balance = balance / 10 ** 18;
                } else {
                    balance = await getFormatMulticall(results, "balanceOf" + i, 0)
                    balance = await web3.utils.hexToNumberString(balance.hex);
                    balance = balance / 10 ** 18;
                    balance = parseFloat(await convert(balance))
                }
                if (balance && balance > 0) {
                    totalAmount = totalAmount + balance;
                    balanceOf.push({
                        symbol: allToken[i].symbol,
                        balance: balance,
                        balanceUSD: 0,
                        balancePer: 0,
                        balanceUSDPer: 0,
                    })
                    tokenAddress.push(allToken[i].address)
                }
            }
            balanceOf = await calculatePercenatge(balanceOf, totalAmount);
            let USDRates = await getTokenPrices(tokenAddress)
            let totalAmountUSD = 0
            for (let i = 0; i < balanceOf.length; i++) {
                balanceOf[i].balanceUSD = parseFloat((balanceOf[i].balance * USDRates[i]).toFixed(3))
                //balanceOf[i].balanceUSD = parseFloat(balance.toFixed(2-Math.floor(Math.log(balance)/Math.log(10))))
                totalAmountUSD = totalAmountUSD + balanceOf[i].balanceUSD
            }
            balanceOf = await calculatePercentageUSD(balanceOf, totalAmountUSD);
            balanceOf.sort((a, b) => parseFloat(b.balanceUSDPer) - parseFloat(a.balanceUSDPer));
            if (balanceOf.length > 5) {
                let list = [balanceOf[0], balanceOf[1], balanceOf[2], balanceOf[3]]
                list.push({
                    symbol: 'OTHERS',
                    balance: 0,
                    balanceUSD: 0,
                    balancePer: 0,
                    balanceUSDPer: 0,
                })
                for (let i = 4; i < balanceOf.length; i++) {
                    list[4].balance = list[4].balance + balanceOf[i].balance
                    list[4].balanceUSD = list[4].balanceUSD + balanceOf[i].balanceUSD
                    list[4].balancePer = list[4].balancePer + balanceOf[i].balancePer
                    list[4].balanceUSDPer = list[4].balanceUSDPer + balanceOf[i].balanceUSDPer
                }
                balanceOf = list
            }

            return {
                list: balanceOf,
                totalAmount: (totalAmountUSD && totalAmount) ?
                    await toFixedWithoutRound(totalAmount, 2) : 0,
                status: true,
                totalUSD: totalAmountUSD
            };
        } else {
            return {
                list: Emptylist,
                totalAmount: 0,
                status: false,
                totalUSD: 0
            };
        }
    } catch (err) {
        return {
            list: Emptylist,
            totalAmount: 0,
            status: false,
            totalUSD: 0
        };
    }

}


export async function calculatePercenatge(balanceOf, totalAmount) {

    let balancePer
    for (let i = 0; i < balanceOf.length; i++) {
        balancePer = await toFixedWithoutRound((balanceOf[i].balance / totalAmount) * 100, 2);
        balanceOf[i].balancePer = balancePer
    }

    return balanceOf
}

export async function calculatePercentageUSD(balanceOf, totalAmountUSD) {

    for (let i = 0; i < balanceOf.length; i++) {
        balanceOf[i].balanceUSDPer = await convert(await toFixedWithoutRound((balanceOf[i].balanceUSD / totalAmountUSD) * 100, 2))
    }

    return balanceOf
}

export async function getFormatMulticall(results, name, pos) {

    try {
        var returnVal = (results && results.results && results.results[name]
            && results.results[name].callsReturnContext &&
            results.results[name].callsReturnContext &&
            results.results[name].callsReturnContext[pos] &&
            results.results[name].callsReturnContext[pos].returnValues &&
            results.results[name].callsReturnContext[pos].returnValues[0]) ?
            results.results[name].callsReturnContext[pos].returnValues[0] : "";
        return returnVal;
    } catch (err) {
        return "";
    }
}