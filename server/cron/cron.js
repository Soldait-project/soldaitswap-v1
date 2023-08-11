import cron from "node-cron"
import {
    Multicall
} from "ethereum-multicall";
import Web3 from "web3";

import DB from "../commonQuery/commonQuery"
import config from "../config/config"
import LPABI from "../ABI/LPABI.json";
import FactoryABI from "../ABI/FactoryABI.json";
import BEP20ABI from "../ABI/BEP20.json";

const web3 = new Web3(config.rpcUrl);
const multicall = new Multicall({
    web3Instance: web3,
});

cron.schedule('*/180 * * * * *', async function () {

    try {
        var Contract = new web3.eth.Contract(FactoryABI, config.Factory);
        var allPairsLength = await Contract.methods.allPairsLength().call();
        var resp = await getLiqutityAllList(allPairsLength);


        for (var l = 0; l < resp.length; l++) {

            var pairAddr = resp[l].pair_address;
            var exits = await DB.AsyncfindOne('pairs', { pair_address: pairAddr }, {});
            if (exits) {
                var update = {
                    "base_volume": resp[l].base_volume,
                    "base_totalsupply": resp[l].base_totalsupply,
                    "base_deadvalue": resp[l].base_deadvalue,
                    "base_decimals": resp[l].base_decimals,
                    "quote_volume": resp[l].quote_volume,
                    "quote_totalsupply": resp[l].quote_totalsupply,
                    "quote_deadvalue": resp[l].quote_deadvalue,
                    "base_volume": resp[l].base_volume,
                    "quote_decimals": resp[l].quote_decimals,
                    "price": resp[l].price,
                    "updatedAt": new Date()
                }
                var cond = {
                    pair_address: pairAddr,
                }
                await DB.AsyncfindOneAndUpdate('pairs', cond, update, { new: true });
            } else {
                await DB.AsyncInsert('pairs', resp[l]);
            }

        }
    } catch (err) {
        console.log('errrr', err)
    }
});

export async function getLiqutityAllList(length) {

    try {

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
                abi: LPABI,
                calls: [
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

            var totalSupply = await getFormatMulticall(results1, dynamic, 0);
            var token0 = await getFormatMulticall(results1, dynamic, 1);
            var token1 = await getFormatMulticall(results1, dynamic, 2);

            pairAddrs[j].tokenA = token0;
            pairAddrs[j].tokenB = token1;
            pairAddrs[j].TotalSupply = parseInt(totalSupply.hex);

            contractCallContext2.push({
                reference: "token0Detail" + j,
                contractAddress: token0,
                abi: BEP20ABI,
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
                    },
                    {
                        reference: "name",
                        methodName: "name",
                        methodParameters: [],
                    },
                    {
                        reference: "totalSupply",
                        methodName: "totalSupply",
                        methodParameters: [],
                    },
                    {
                        reference: "balanceOf",
                        methodName: "balanceOf",
                        methodParameters: ["0x000000000000000000000000000000000000dEaD"],
                    },
                ],
            }, {
                reference: "token1Detail" + j,
                contractAddress: token1,
                abi: BEP20ABI,
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
                    },
                    {
                        reference: "name",
                        methodName: "name",
                        methodParameters: [],
                    },
                    {
                        reference: "totalSupply",
                        methodName: "totalSupply",
                        methodParameters: [],
                    },
                    {
                        reference: "balanceOf",
                        methodName: "balanceOf",
                        methodParameters: ["0x000000000000000000000000000000000000dEaD"],
                    },
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
            var tokenAName = await getFormatMulticall(results2, dynamic1, 3);


            var reserve_to = await getFormatMulticall(results2, dynamic2, 0);
            reserve_to = parseInt(reserve_to.hex);
            var tokenBsymbol = await getFormatMulticall(results2, dynamic2, 1);
            var tokenBdecimal = await getFormatMulticall(results2, dynamic2, 2);
            tokenBdecimal = (tokenBdecimal > 0) ? tokenBdecimal : 18;
            var tokenBName = await getFormatMulticall(results2, dynamic2, 3);

            var TotalSupply = pairAddrs[k].TotalSupply;

            var fromAmt = (reserve_from > 0) ? reserve_from / 10 ** tokenAdecimal : 0;
            var toAmt = (reserve_to > 0) ? reserve_to / 10 ** tokenBdecimal : 0;
            var price = fromAmt / toAmt;

            var totalASupply = await getFormatMulticall(results2, dynamic1, 4);
            totalASupply = (totalASupply && totalASupply.hex) ? parseInt(totalASupply.hex) : 0
            totalASupply = (totalASupply > 0) ? totalASupply / 10 ** tokenAdecimal : 0;
            var totalADeadBal = await getFormatMulticall(results2, dynamic1, 5);
            totalADeadBal = (totalADeadBal && totalADeadBal.hex) ? parseInt(totalADeadBal.hex) : 0
            totalADeadBal = (totalADeadBal > 0) ? totalADeadBal / 10 ** tokenAdecimal : 0;

            var totalBSupply = await getFormatMulticall(results2, dynamic2, 4);
            totalBSupply = (totalBSupply && totalBSupply.hex) ? parseInt(totalBSupply.hex) : 0
            totalBSupply = (totalBSupply > 0) ? totalBSupply / 10 ** tokenBdecimal : 0;
            var totalBDeadBal = await getFormatMulticall(results2, dynamic2, 5);
            totalBDeadBal = (totalBDeadBal && totalBDeadBal.hex) ? parseInt(totalBDeadBal.hex) : 0
            totalBDeadBal = (totalBDeadBal > 0) ? totalBDeadBal / 10 ** tokenBdecimal : 0;

            liquidityList.push({
                pair_address: pairAddrs[k].pairaddress,
                base_name: tokenAName,
                base_symbol: tokenAsymbol,
                base_totalsupply: totalASupply,
                base_deadvalue: totalADeadBal,
                base_address: pairAddrs[k].tokenA,
                base_decimals: tokenAdecimal,
                quote_name: tokenBName,
                quote_symbol: tokenBsymbol,
                quote_totalsupply: totalBSupply,
                quote_deadvalue: totalBDeadBal,
                quote_address: pairAddrs[k].tokenB,
                quote_decimals: tokenBdecimal,
                base_volume: fromAmt,
                quote_volume: toAmt,
                price: price,
                liquidity: 0,
                liquidity_BNB: 0
            });

        }

        return liquidityList;



    } catch (err) {
        console.log(err, 'errerrerrerr')
        return []
    }

}

export async function getFormatMulticall(results, name, pos) {
    try {
        var returnVal =
            results &&
                results.results &&
                results.results[name].callsReturnContext &&
                results.results[name].callsReturnContext &&
                results.results[name].callsReturnContext[pos] &&
                results.results[name].callsReturnContext[pos].returnValues &&
                results.results[name].callsReturnContext[pos].returnValues[0]
                ? (results.results[name].callsReturnContext[pos].returnValues.length > 1) ?
                    results.results[name].callsReturnContext[pos].returnValues : results.results[name].callsReturnContext[pos].returnValues[0]
                : "";

        return returnVal;
    } catch (err) {
        return "";
    }
}





