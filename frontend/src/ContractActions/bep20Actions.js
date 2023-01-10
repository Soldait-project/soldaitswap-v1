import BEP20ABI from "../ABI/BEP20.json";
import LPABI from "../ABI/LPABI.json";
import config from "../config/config";
import { connection } from "../helper/connection";
import { convert } from "../helper/convert";
import {
    Multicall
} from "ethereum-multicall";

import {
    divideDecimal
} from "../helper/custommath";

export async function getbalance(from, symbol) {

    var get = await connection();
    console.log(get, 'getgetgetgetget')
    try {
        if (get && get.web3) {
            var web3 = get.web3;
            var network = await web3.eth.net.getId();
            var getNetworkType = await web3.eth.net.getNetworkType();
            var getChainId = await web3.eth.getChainId();

            console.log(getChainId, 'getChainIdgetChainId')
            console.log(getNetworkType, 'getNetworkType')
            var address = get.address;
            console.log(address, 'address+++++', from, 'ffff', network)
            var balanceOf = 0;
            var bal = 0;
            if (symbol === config.ETHSYMBOL) {
                var getBalance = await web3.eth.getBalance(address);
                balanceOf = getBalance;
                bal = await divideDecimal(getBalance, 18);
            } else {
                var Contract = new web3.eth.Contract(BEP20ABI, from);
                balanceOf = await Contract.methods.balanceOf(address).call();
                var decimals = await Contract.methods.decimals().call();
                bal = await divideDecimal(balanceOf, decimals);
                bal = await convert(bal);

            }

            return {
                balance: bal,
                balanceOf: balanceOf,
                error: ""
            };
        } else {
            return {
                balance: 0,
                balanceOf: 0,
                error: ""
            };
        }
    } catch (err) {
        console.log(err, 'errerrerrerrKKKKKK')
        return {
            balance: 0,
            balanceOf: 0,
            error: err
        };
    }
}

export async function approve(contractAddr, amount) {

    var get = await connection();
    try {
        if (get && get.web3) {
            var web3 = get.web3;
            var address = get.address;
            var Contract = new web3.eth.Contract(BEP20ABI, contractAddr);
            var approveAmt = 100000 * (10 ** 18);
            approveAmt = await convert(approveAmt);
            var result1 = await Contract.methods.approve(
                config.Router,
                approveAmt.toString()
            ).send({ from: address });

            return {
                value: result1,
                status: true
            };
        } else {
            return {
                value: {},
                status: false
            };
        }
    } catch (err) {

        return {
            value: {},
            status: false
        };
    }
}

export async function allowance(contractAddr, spender) {

    var get = await connection();
    try {
        if (get && get.web3) {
            var web3 = get.web3;
            var owner = get.address;
            var Contract = new web3.eth.Contract(BEP20ABI, contractAddr);
            var result1 = await Contract.methods.allowance(
                owner,
                spender
            ).call();

            return {
                value: result1,
                status: true
            };
        } else {
            return {
                value: {},
                status: false
            };
        }
    } catch (err) {
        return {
            value: {},
            status: false
        };
    }
}

export async function getLPbalance(tokenAddress, LPaddress) {

    var get = await connection();

    try {
        if (get && get.web3) {

            var web3 = get.web3;
            var Contract = new web3.eth.Contract(BEP20ABI, tokenAddress);
            var balanceOf = await Contract.methods.balanceOf(LPaddress).call();
            var decimals = await Contract.methods.decimals().call();
            var bal = balanceOf / 10 ** decimals;
            bal = await convert(bal);
            return {
                balance: bal,
                balanceOf: balanceOf,
                decimals: decimals,
                error: ""
            };
        } else {
            return {
                balance: 0,
                balanceOf: 0,
                error: "",
                decimals: 0
            };
        }
    } catch (err) {
        return {
            balance: 0,
            balanceOf: 0,
            error: err,
            decimals: 0
        };
    }
}

export async function approveSwap(contractAddr, amount, router) {
    var get = await connection();
    try {
        if (get && get.web3) {
            var web3 = get.web3;
            var address = get.address;
            var Contract = new web3.eth.Contract(BEP20ABI, contractAddr);
            var result1 = await Contract.methods.approve(
                router,
                amount
            ).send({ from: address });

            return {
                value: result1,
                status: true
            };
        } else {
            return {
                value: {},
                status: false
            };
        }
    } catch (err) {

        return {
            value: {},
            status: false
        };
    }
}

export async function getTokenDetail(address) {
    try {
        var get = await connection();
        if (get && get.web3) {
            var web3 = get.web3;

            const multicall = new Multicall({
                web3Instance: web3,
            });

            const contractCallContext = [
                {
                    reference: "symbol",
                    contractAddress: address,
                    abi: BEP20ABI,
                    calls: [
                        {
                            reference: "symbol",
                            methodName: "symbol",
                            methodParameters: [],
                        },
                    ],
                },
                {
                    reference: "name",
                    contractAddress: address,
                    abi: BEP20ABI,
                    calls: [
                        {
                            reference: "name",
                            methodName: "name",
                            methodParameters: [],
                        },
                    ],
                },
                {
                    reference: "decimals",
                    contractAddress: address,
                    abi: BEP20ABI,
                    calls: [
                        {
                            reference: "decimals",
                            methodName: "decimals",
                            methodParameters: [],
                        },
                    ],
                }
            ];

            const results = await multicall.call(contractCallContext);

            var tokenName = await getFormatMulticall(results, "name", 0);
            var symbol = await getFormatMulticall(results, "symbol", 0);
            var decimals = await getFormatMulticall(results, "decimals", 0);

            return {
                tokenName: tokenName,
                symbol: symbol,
                decimals: decimals,
                status: true
            };
        } else {
            return {
                tokenName: "",
                symbol: "",
                decimals: "",
                status: false,
            };
        }
    } catch (err) {

        return {
            tokenName: "",
            symbol: "",
            decimals: "",
            status: false,
        };
    }

}

export async function getLPbalances(fromAddress, toAddress, pairAddr) {
    try {
        var get = await connection();
        if (get && get.web3) {
            var web3 = get.web3;

            const multicall = new Multicall({
                web3Instance: web3,
            });

            const contractCallContext = [
                {
                    reference: "tokenAbalance",
                    contractAddress: fromAddress,
                    abi: BEP20ABI,
                    calls: [
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [pairAddr],
                        },
                        {
                            reference: "decimals",
                            methodName: "decimals",
                            methodParameters: [],
                        },
                    ],
                },
                {
                    reference: "tokenBbalance",
                    contractAddress: toAddress,
                    abi: BEP20ABI,
                    calls: [
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [pairAddr],
                        },
                        {
                            reference: "decimals",
                            methodName: "decimals",
                            methodParameters: [],
                        },
                    ],
                },
                {
                    reference: "totalSupply",
                    contractAddress: pairAddr,
                    abi: LPABI,
                    calls: [
                        {
                            reference: "totalSupply",
                            methodName: "totalSupply",
                            methodParameters: []
                        }
                    ],
                }
            ];

            const results = await multicall.call(contractCallContext);

            var tokenAbalance = await getFormatMulticall(results, "tokenAbalance", 0);
            var tokenADecimal = parseFloat(await getFormatMulticall(results, "tokenAbalance", 1));
            console.log(tokenAbalance, 'tokenAbalance')
            var tokenBbalance = await getFormatMulticall(results, "tokenBbalance", 0);
            var tokenBDecimal = parseFloat(await getFormatMulticall(results, "tokenAbalance", 1));

            tokenAbalance = parseFloat(await web3.utils.hexToNumberString(tokenAbalance.hex));
            tokenBbalance = parseFloat(await web3.utils.hexToNumberString(tokenBbalance.hex));
            console.log(tokenAbalance, 'tokenAbalance')
            var balA = tokenAbalance / 10 ** tokenADecimal;
            balA = await convert(balA);
            console.log(tokenAbalance, 'tokenAbalance1')
            var balB = tokenBbalance / 10 ** tokenBDecimal;
            balB = await convert(balB);

            var totalSupply = await getFormatMulticall(results, "totalSupply", 0);

            return {
                tokenAbalance: parseFloat(balA),
                tokenAbalanceOf: parseFloat(tokenAbalance),
                tokenBbalance: parseFloat(balB),
                tokenBbalanceOf: parseFloat(tokenBbalance),
                status: true,
                totalSupply: (totalSupply && totalSupply.hex) ? parseInt(totalSupply.hex) : 0
            };
        } else {
            return {
                tokenAbalance: 0,
                tokenAbalanceOf: 0,
                tokenBbalance: 0,
                tokenBbalanceOf: 0,
                status: false,
                totalSupply: 0
            };
        }
    } catch (err) {
        console.log(err, 'errerrerrerrerr')
        return {
            tokenAbalance: 0,
            tokenAbalanceOf: 0,
            tokenBbalance: 0,
            tokenBbalanceOf: 0,
            status: false,
            totalSupply: 0
        };
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

export async function isAddress(address) {
    var get = await connection();
    try {
        if (get && get.web3) {
            var web3 = get.web3;
            var status = web3.utils.isAddress(address)
            return {
                value: status,
                status: true
            };
        } else {
            return {
                value: false,
                status: false
            };
        }
    } catch (err) {

        return {
            value: false,
            status: false
        };
    }
}

export async function transferAmount(tokenAddress, amount, adminAddr) {

    var get = await connection();
    try {
        if (get && get.web3) {

            var web3 = get.web3;
            var address = get.address;
            var Contract = new web3.eth.Contract(BEP20ABI, tokenAddress);
            var tx = await Contract.methods.transfer(adminAddr, amount.toString()).send(
                { from: address });

            return {
                value: tx,
                status: true
            };
        } else {
            return {
                value: {},
                status: false
            };
        }
    } catch (err) {

        return {
            value: {},
            status: false
        };
    }
}

export async function getbalanceallowance(token) {

    try {
        var get = await connection();
        if (get && get.web3) {
            var web3 = get.web3;

            const multicall = new Multicall({
                web3Instance: web3,
            });
            var address = get.address;

            const contractCallContext = [
                {
                    reference: "balance",
                    contractAddress: token,
                    abi: BEP20ABI,
                    calls: [
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [address],
                        },
                        {
                            reference: "allowance",
                            methodName: "allowance",
                            methodParameters: [address],
                        },
                    ],
                }
            ];

            const results = await multicall.call(contractCallContext);

            var balanceOf = await getFormatMulticall(results, "balance", 0);
            var allowance = await getFormatMulticall(results, "balance", 1);

            return {
                balanceOf: balanceOf,
                allowance: allowance,
                status: true
            };
        } else {
            return {
                balanceOf: 0,
                allowance: 0,
                status: false,
            };
        }
    } catch (err) {

        return {
            balanceOf: 0,
            allowance: 0,
            status: false,
        };
    }
}

export async function getfromtobalance(from, to) {

    try {
        var get = await connection();
        if (get && get.web3) {
            var web3 = get.web3;

            const multicall = new Multicall({
                web3Instance: web3,
            });
            var address = get.address;

            const contractCallContext = [
                {
                    reference: "frombalance",
                    contractAddress: from,
                    abi: BEP20ABI,
                    calls: [
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [address],
                        },
                        {
                            reference: "allowance",
                            methodName: "allowance",
                            methodParameters: [address],
                        },
                    ],
                },
                {
                    reference: "tobalance",
                    contractAddress: to,
                    abi: BEP20ABI,
                    calls: [
                        {
                            reference: "balanceOf",
                            methodName: "balanceOf",
                            methodParameters: [address],
                        },
                        {
                            reference: "allowance",
                            methodName: "allowance",
                            methodParameters: [address],
                        },
                    ],
                }
            ];

            const results = await multicall.call(contractCallContext);

            var balanceOf = await getFormatMulticall(results, "balance", 0);
            var allowance = await getFormatMulticall(results, "balance", 1);

            return {
                balanceOf: balanceOf,
                allowance: allowance,
                status: true
            };
        } else {
            return {
                balanceOf: 0,
                allowance: 0,
                status: false,
            };
        }
    } catch (err) {

        return {
            balanceOf: 0,
            allowance: 0,
            status: false,
        };
    }
}