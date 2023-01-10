import FactoryABI from "../ABI/FactoryABI.json";
import BEP20ABI from "../ABI/BEP20.json";
import LPTokenABI from "../ABI/LPABI.json";
import config from "../config/config";
import { connection } from "../helper/connection";
import Web3 from "web3";

import {
    divideDecimal
} from "../helper/custommath";

import {
    Multicall
} from "ethereum-multicall";

var zeroAddr = "0x0000000000000000000000000000000000000000";

export async function getallPairsLength(method) {

    var get = await connection();

    try {
        if (get && get.web3) {

            var web3 = get.web3;
            var Contract = new web3.eth.Contract(FactoryABI, config.Factory);
            var result = await Contract.methods[method]().call();

            return {
                value: result,
                status: true
            };
        } else {
            return {
                value: "",
                status: false
            };
        }
    } catch (err) {

        return {
            value: "",
            status: false
        };
    }

}

export async function getPairaddress(method, pos) {

    var get = await connection();

    try {
        if (get && get.web3) {
            var web3 = get.web3;
            var Contract = new web3.eth.Contract(FactoryABI, config.Factory);
            var result = await Contract.methods[method](pos).call();
            return {
                value: result,
                status: true
            };
        } else {
            return {
                value: "",
                status: false
            };
        }
    } catch (err) {
        return {
            value: "",
            status: false
        };
    }

}

export async function getPair(tokena, tokenb, Factory) {

    var get = await connection();

    try {
        if (get && get.web3) {
            var web3 = get.web3;
            var Contract = new web3.eth.Contract(FactoryABI, Factory);
            var result = await Contract.methods.getPair(tokena, tokenb).call();
            return {
                value: result,
                status: true
            };
        } else {
            return {
                value: "",
                status: false
            };
        }
    } catch (err) {
        return {
            value: "",
            status: false
        };
    }

}

export async function getPairLiqutity(tokena, tokenb) {

    try {
        var get = await connection();
        if (get && get.web3) {

            var initial = {
                router: "bitdrive",
                address: zeroAddr,
                reserveA: 0,
                reserveB: 0,
                fromBalance: 0,
                fromBalanceOf: 0,
                fromAllowance: 0,
                toBalance: 0,
                toBalanceOf: 0,
                toAllowance: 0,
            }

            var web3 = get.web3;
            var address = get.address;

            const multicall = new Multicall({
                web3Instance: web3,
            });

            const contractCallContext = [
                {
                    reference: "getPairBitdrive",
                    contractAddress: config.Factory,
                    abi: FactoryABI,
                    calls: [
                        {
                            reference: "getPair",
                            methodName: "getPair",
                            methodParameters: [tokena, tokenb],
                        }
                    ],
                }
            ];

            const results = await multicall.call(contractCallContext);


            var getPairBitdrive = await getFormatMulticall(results, "getPairBitdrive", 0);

            const getLPBalances = [
                {
                    reference: "tokenAbitdrive",
                    contractAddress: tokena,
                    abi: BEP20ABI,
                    calls: [
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [getPairBitdrive],
                        },
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [address],
                        },
                        {
                            reference: "allowance",
                            methodName: "allowance",
                            methodParameters: [address, config.Router],
                        }
                    ],
                },
                {
                    reference: "tokenBbitdrive",
                    contractAddress: tokenb,
                    abi: BEP20ABI,
                    calls: [
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [getPairBitdrive],
                        },
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [address],
                        },
                        {
                            reference: "allowance",
                            methodName: "allowance",
                            methodParameters: [address, config.Router],
                        }
                    ],
                }
            ];

            const results1 = await multicall.call(getLPBalances);

            var BitdriveReserveA = await getFormatMulticall(results1, "tokenAbitdrive", 0);
            BitdriveReserveA = parseInt(BitdriveReserveA.hex);
            var fromBalance = await getFormatMulticall(results1, "tokenAbitdrive", 1);
            fromBalance = parseInt(fromBalance.hex);
            var fromAllowance = await getFormatMulticall(results1, "tokenAbitdrive", 2);
            fromAllowance = parseInt(fromAllowance.hex);

            var BitdriveReserveB = await getFormatMulticall(results1, "tokenBbitdrive", 0);
            BitdriveReserveB = parseInt(BitdriveReserveB.hex);
            var toBalance = await getFormatMulticall(results1, "tokenBbitdrive", 1);
            toBalance = parseInt(toBalance.hex);
            var toAllowance = await getFormatMulticall(results1, "tokenBbitdrive", 2);
            toAllowance = parseInt(toAllowance.hex);


            var pairData =
            {
                router: "bitdrive",
                address: getPairBitdrive,
                reserveA: BitdriveReserveA,
                reserveB: BitdriveReserveB,
                fromBalance: fromBalance / 10 ** 18,
                fromBalanceOf: fromBalance,
                fromAllowance: fromAllowance,
                toBalance: toBalance / 10 ** 18,
                toBalanceOf: toBalance,
                toAllowance: toAllowance,
            }

            return {
                pairData
            }

        } else {
            return {
                pairData: initial
            }

        }
    } catch (err) {

        return {
            pairData: initial
        }
    }

}

export async function getPairAll(tokena, tokenb) {

    try {
        var get = await connection();
        var web3 = get.web3;

        if (web3 === "" || !web3) {
            web3 = new Web3(config.netWorkUrl);
        }

        const multicall = new Multicall({
            web3Instance: web3,
        });

        const contractCallContext = [
            {
                reference: "getPairBiswap",
                contractAddress: config.BiswapFactory,
                abi: FactoryABI,
                calls: [
                    {
                        reference: "getPair",
                        methodName: "getPair",
                        methodParameters: [tokena.address, tokenb.address],
                    }
                ],
            },
            {
                reference: "getPairBitdrive",
                contractAddress: config.Factory,
                abi: FactoryABI,
                calls: [
                    {
                        reference: "getPair",
                        methodName: "getPair",
                        methodParameters: [tokena.address, tokenb.address],
                    }
                ],
            },
            {
                reference: "getPairPancake",
                contractAddress: config.PancakeFactory,
                abi: FactoryABI,
                calls: [
                    {
                        reference: "getPair",
                        methodName: "getPair",
                        methodParameters: [tokena.address, tokenb.address],
                    }
                ],
            },
        ];

        const results = await multicall.call(contractCallContext);

        var getPairBiswap = await getFormatMulticall(results, "getPairBiswap", 0);
        var getPairBitdrive = await getFormatMulticall(results, "getPairBitdrive", 0);
        var getPairPancake = await getFormatMulticall(results, "getPairPancake", 0);

        const getLPBalances = [
            {
                reference: "tokenAbiswap",
                contractAddress: tokena.address,
                abi: BEP20ABI,
                calls: [
                    {
                        reference: "balanceOf",
                        methodName: "balanceOf",
                        methodParameters: [getPairBiswap],
                    }
                ],
            },
            {
                reference: "tokenBbiswap",
                contractAddress: tokenb.address,
                abi: BEP20ABI,
                calls: [
                    {
                        reference: "balanceOf",
                        methodName: "balanceOf",
                        methodParameters: [getPairBiswap],
                    }
                ],
            },
            {
                reference: "tokenAbitdrive",
                contractAddress: tokena.address,
                abi: BEP20ABI,
                calls: [
                    {
                        reference: "balanceOf",
                        methodName: "balanceOf",
                        methodParameters: [getPairBitdrive],
                    }
                ],
            },
            {
                reference: "tokenBbitdrive",
                contractAddress: tokenb.address,
                abi: BEP20ABI,
                calls: [
                    {
                        reference: "balanceOf",
                        methodName: "balanceOf",
                        methodParameters: [getPairBitdrive],
                    }
                ],
            },
            {
                reference: "tokenApancake",
                contractAddress: tokena.address,
                abi: BEP20ABI,
                calls: [
                    {
                        reference: "balanceOf",
                        methodName: "balanceOf",
                        methodParameters: [getPairPancake],
                    }
                ],
            },
            {
                reference: "tokenBpancake",
                contractAddress: tokenb.address,
                abi: BEP20ABI,
                calls: [
                    {
                        reference: "balanceOf",
                        methodName: "balanceOf",
                        methodParameters: [getPairPancake],
                    }
                ],
            },
        ];

        const results1 = await multicall.call(getLPBalances);

        var BiswapReserveA = await getFormatMulticall(results1, "tokenAbiswap", 0);
        BiswapReserveA = parseInt(BiswapReserveA.hex);
        BiswapReserveA = await divideDecimal(BiswapReserveA, tokena.decimals);

        var BiswapReserveB = await getFormatMulticall(results1, "tokenBbiswap", 0);
        BiswapReserveB = parseInt(BiswapReserveB.hex);
        BiswapReserveB = await divideDecimal(BiswapReserveB, tokenb.decimals);

        var BitdriveReserveA = await getFormatMulticall(results1, "tokenAbitdrive", 0);
        BitdriveReserveA = parseInt(BitdriveReserveA.hex);
        BitdriveReserveA = await divideDecimal(BitdriveReserveA, tokena.decimals);

        var BitdriveReserveB = await getFormatMulticall(results1, "tokenBbitdrive", 0);
        BitdriveReserveB = parseInt(BitdriveReserveB.hex);
        BitdriveReserveB = await divideDecimal(BitdriveReserveB, tokenb.decimals);

        var PancakeReserveA = await getFormatMulticall(results1, "tokenApancake", 0);
        PancakeReserveA = parseInt(PancakeReserveA.hex);
        PancakeReserveA = await divideDecimal(PancakeReserveA, tokena.decimals);

        var PancakeReserveB = await getFormatMulticall(results1, "tokenBpancake", 0);
        PancakeReserveB = parseInt(PancakeReserveB.hex);
        PancakeReserveB = await divideDecimal(PancakeReserveB, tokenb.decimals);

        var pairData = [
            { router: "biswap", address: getPairBiswap, reserveA: BiswapReserveA, reserveB: BiswapReserveB },
            { router: "pancake", address: getPairPancake, reserveA: PancakeReserveA, reserveB: PancakeReserveB },
            { router: "bitdrive", address: getPairBitdrive, reserveA: BitdriveReserveA, reserveB: BitdriveReserveB }
        ];

        return {
            pairData
        }


    } catch (err) {

        return {
            pairData: []
        }
    }

}


export async function getLiqutityAllList(length, AllToken) {

    try {
        var get = await connection();
        if (get && get.web3) {
            var web3 = get.web3;
            var address = get.address;

            const multicall = new Multicall({
                web3Instance: web3,
            });
            var pairPos = [];
            for (var p = 0; p < length; p++) {
                pairPos.push({
                    reference: "allPairs",
                    methodName: "allPairs",
                    methodParameters: [p],
                })
            }

            const contractCallContext = [
                {
                    reference: "allPairs",
                    contractAddress: config.Factory,
                    abi: FactoryABI,
                    calls: pairPos,
                }
            ];

            const results = await multicall.call(contractCallContext);

            var pairAddrs = [];
            var contractCallContext1 = [];
            for (var i = 0; i < pairPos.length; i++) {

                var pair = await getFormatMulticall(results, "allPairs", i);
                pairAddrs.push({
                    pairaddress: pair,
                    balance: 0,
                    balanceOf: 0,
                    tokenA: "",
                    tokenB: "",
                    TotalSupply: 0
                });

                contractCallContext1.push({
                    reference: "balanceOf" + i,
                    contractAddress: pair,
                    abi: LPTokenABI,
                    calls: [
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [address],
                        },
                        {
                            reference: "totalSupply",
                            methodName: "totalSupply",
                            methodParameters: [],
                        },
                        {
                            reference: "token0",
                            methodName: "token0",
                            methodParameters: [],
                        },
                        {
                            reference: "token1",
                            methodName: "token1",
                            methodParameters: [],
                        }
                    ],
                })

            }

            const results1 = await multicall.call(contractCallContext1);
            var contractCallContext2 = [];
            for (var j = 0; j < pairAddrs.length; j++) {
                var dynamic = "balanceOf" + j;

                var balanceVal = await getFormatMulticall(results1, dynamic, 0);
                var totalSupply = await getFormatMulticall(results1, dynamic, 1);
                var token0 = await getFormatMulticall(results1, dynamic, 2);
                var token1 = await getFormatMulticall(results1, dynamic, 3);

                pairAddrs[j].tokenA = token0;
                pairAddrs[j].tokenB = token1;
                pairAddrs[j].balance = parseInt(balanceVal.hex);
                pairAddrs[j].balanceOf = parseInt(balanceVal.hex);
                pairAddrs[j].TotalSupply = parseInt(totalSupply.hex);


                contractCallContext2.push({
                    reference: "token0Detail" + j,
                    contractAddress: token0,
                    abi: LPTokenABI,
                    calls: [
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [pairAddrs[j].pairaddress],
                        },
                        {
                            reference: "symbol",
                            methodName: "symbol",
                            methodParameters: [],
                        },
                        {
                            reference: "decimals",
                            methodName: "decimals",
                            methodParameters: [],
                        }
                    ],
                }, {
                    reference: "token1Detail" + j,
                    contractAddress: token1,
                    abi: LPTokenABI,
                    calls: [
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [pairAddrs[j].pairaddress],
                        },
                        {
                            reference: "symbol",
                            methodName: "symbol",
                            methodParameters: [],
                        },
                        {
                            reference: "decimals",
                            methodName: "decimals",
                            methodParameters: [],
                        }
                    ],
                })

            }
            const results2 = await multicall.call(contractCallContext2);

            var liquidityList = [];

            for (let k = 0; k < pairAddrs.length; k++) {

                var dynamic1 = "token0Detail" + k;
                var dynamic2 = "token1Detail" + k;

                var reserve_from = await getFormatMulticall(results2, dynamic1, 0);
                reserve_from = parseInt(reserve_from.hex);
                var tokenAsymbol = await getFormatMulticall(results2, dynamic1, 1);
                var tokenAdecimal = await getFormatMulticall(results2, dynamic1, 2);
                tokenAdecimal = (tokenAdecimal > 0) ? tokenAdecimal : 18;

                var reserve_to = await getFormatMulticall(results2, dynamic2, 0);
                reserve_to = parseInt(reserve_to.hex);
                var tokenBsymbol = await getFormatMulticall(results2, dynamic2, 1);
                var tokenBdecimal = await getFormatMulticall(results2, dynamic2, 2);
                tokenBdecimal = (tokenBdecimal > 0) ? tokenBdecimal : 18;

                var TotalSupply = pairAddrs[k].TotalSupply;

                var balance = 0;
                if (pairAddrs[k].balance && parseFloat(pairAddrs[k].balance) > 0) {
                    balance = await divideDecimal(pairAddrs[k].balance, 18);
                }
                var supply = pairAddrs[k].balance;

                var fromAmt = reserve_from * (supply / parseFloat(TotalSupply));
                var toAmt = reserve_to * (supply / parseFloat(TotalSupply));

                fromAmt = (fromAmt > 0) ? await divideDecimal(fromAmt, tokenAdecimal) : 0;
                toAmt = (toAmt > 0) ? await divideDecimal(toAmt, tokenBdecimal) : 0;

                var shareOfPool = parseFloat(supply) / parseFloat(TotalSupply) * 100;

                var tokenAindex = AllToken.findIndex(val => val.address.toLowerCase() === pairAddrs[k].tokenA.toLowerCase());
                var tokenBindex = AllToken.findIndex(val => val.address.toLowerCase() === pairAddrs[k].tokenB.toLowerCase());

                if (supply > 0 && tokenAindex !== -1 && tokenBindex !== -1) {
                    liquidityList.push({
                        balance: pairAddrs[k].balance,
                        displayamt: balance,
                        tokenA: pairAddrs[k].tokenA,
                        tokenAAmt: fromAmt,
                        tokenAsymbol: tokenAsymbol,
                        tokenB: pairAddrs[k].tokenB,
                        tokenBAmt: toAmt,
                        shareOfPool: shareOfPool,
                        tokenBsymbol: tokenBsymbol
                    });
                }

            }

            return liquidityList;

        }

    } catch (err) {

        return []
    }

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
