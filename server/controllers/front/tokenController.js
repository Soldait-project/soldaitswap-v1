import {
    Multicall
} from "ethereum-multicall";
import Web3 from "web3";

import DB from "../../commonQuery/commonQuery"
import config from "../../config/config"
import LPABI from "../../ABI/LPABI.json";
import FactoryABI from "../../ABI/FactoryABI.json";
import BEP20ABI from "../../ABI/BEP20.json";

const CoinMarketCap = require('coinmarketcap-api')
const apiKey = 'ec80bed3-8f55-46b5-b0a3-8394981d5b1c'
const client = new CoinMarketCap(apiKey)

const web3 = new Web3(config.rpcUrl);
const multicall = new Multicall({
    web3Instance: web3,
});

export const getTokens = async (req, res) => {

    try {

        var query = [
            { $match: { addedbyuser: { $ne: "yes" }, status: "Live" } },
            {
                $project: {
                    name: 1,
                    symbol: 1,
                    address: 1,
                    chainId: 1,
                    decimals: 1,
                    logoURI: 1,
                    default: 1,
                    tradetype: 1
                }
            }
        ];
        var result = await DB.AsyncAggregation('tokens', query);
        // console.log(result, 'result>>>>>>>>>>>>>>>>>')
        if (req.query.address && req.query.address != "") {

            var query1 = [
                { $match: { addedbyuser: { $eq: "yes" }, useraddress: req.query.address } },
                {
                    $project: {
                        name: 1,
                        symbol: 1,
                        address: 1,
                        chainId: 1,
                        decimals: 1,
                        logoURI: 1,
                        default: 1
                    }
                }
            ];
            var result1 = await DB.AsyncAggregation('tokens', query1);
            //console.log(result1, 'result1-result1*****************')
            // console.log(result, 'result')
            if (result1 && result1.length > 0) {
                result = result.concat(result1);
            }

        }

        var list = "";
        if (result && result.length > 0) {
            list = JSON.stringify(result);
        }

        return res.status(200).json({ status: true, 'list': list })

    } catch (err) {
        return res.status(200).json({ status: true, 'list': [] })
    }

};


export const addToken = async (req, res) => {
    //console.log(req.body, 'req.body-req.body')
    try {
        var reqBody = req.body;
        var exitsToken = await DB.AsyncfindOne('tokens', { address: reqBody.address, useraddress: reqBody.useraddress }, {});

        var query = [
            { $match: { addedbyuser: { $ne: "yes" } } },
            {
                $project: {
                    name: 1,
                    symbol: 1,
                    address: 1,
                    chainId: 1,
                    decimals: 1,
                    logoURI: 1,
                    default: 1
                }
            }
        ];
        if (!exitsToken) {

            var tokenData = {
                name: reqBody.name,
                symbol: reqBody.symbol,
                address: reqBody.address,
                chainId: reqBody.chainId,
                decimals: reqBody.decimals,
                useraddress: reqBody.useraddress,
                logoURI: "https://productionapi.soldaitswap.finance/tokens/question.svg",
                addedbyuser: "yes"
            }

            await DB.AsyncInsert('tokens', tokenData);
        }


        var result = await DB.AsyncAggregation('tokens', query);
        if (!exitsToken) {
            result.push(tokenData)
        }

        return res.status(200).json({ status: true, 'result': result })



    } catch (err) {
        console.log(err, 'errerrerrerr')
        return res.status(200).json({ status: true, 'result': [] })
    }
}

export const getCurrencyList = async (req, res) => {

    var currencies = ["ETH", "FIL", "DOGE", "LTC", "XRP", "BTC"];
    try {
        var resp = await client.getQuotes({ symbol: currencies })
        var currList = []
        for (var c = 0; c < currencies.length; c++) {

            var usdprice = resp.data[currencies[c]].quote;

            console.log(usdprice, 'usdpriceusdpriceusdprice')

            var price = (resp && resp.data && resp.data[currencies[c]] && resp.data[currencies[c]].quote
                && resp.data[currencies[c]].quote.price) ? resp.data[currencies[c]].quote.price : 0
            var percent_change_24h = (resp && resp.data && resp.data[currencies[c]] && resp.data[currencies[c]].quote
                && resp.data[currencies[c]].quote.percent_change_24h) ? resp.data[currencies[c]].quote.percent_change_24h : 0

            currList.push({
                currency: currencies[c],
                price: price,
                percent_change_24h: percent_change_24h
            })
        }
        return res.status(200).json({ status: true, 'list': currList })

    } catch (err) {
        var currList = []
        for (var c = 0; c < currencies.length; c++) {
            currList.push({
                currency: currencies[c],
                price: 0,
                percent_change_24h: 0
            })
        }
        return res.status(200).json({ status: true, 'list': [] })
    }

}


export const allTokenList = async (req, res) => {

    try {

        var query = [
            { $match: { status: "Live" } },
            {
                $project: {
                    name: 1,
                    symbol: 1,
                    address: 1,
                    chainId: 1,
                    decimals: 1,
                    logoURI: 1,
                    default: 1,
                }
            }
        ];
        var result = await DB.AsyncAggregation('tokens', query);

        var list = "";
        if (result && result.length > 0) {
            list = JSON.stringify(result);
        }

        return res.status(200).json({ status: true, 'list': list })

    } catch (err) {
        return res.status(200).json({ status: true, 'list': [] })
    }

};

export const pairs = async (req, res) => {

    const pairList = await DB.AsyncFind('pairs', {}, {}, {});

    try {
        var objs = {}
        for (var p = 0; p < pairList.length; p++) {

            var obj = {
                [pairList[p].base_address + "_" + pairList[p].quote_address]: {
                    "pair_address": pairList[p].pair_address,
                    "base_name": pairList[p].base_name,
                    "base_symbol": pairList[p].base_symbol,
                    "base_address": pairList[p].base_address,
                    "quote_name": pairList[p].quote_name,
                    "quote_symbol": pairList[p].quote_symbol,
                    "quote_address": pairList[p].quote_address,
                    "price": pairList[p].price,
                    "base_volume": pairList[p].base_volume,
                    "quote_volume": pairList[p].quote_volume,
                    "liquidity": 0,
                    "liquidity_BNB": 0,
                }
            }

            objs = { ...objs, ...obj }
        }
        var updatedate = (pairList && pairList[0] && pairList[0].updatedAt) ? new Date(pairList[0].updatedAt) : new Date();
        var unixTime = Math.floor(updatedate.getTime() / 1000);
        var resp = {
            "updated_at": unixTime,
            "data": objs
        }

        return res.status(200).json(resp)
    } catch (err) {
        return res.status(200).json({ "data": objs })
    }

}


export const tokens = async (req, res) => {
    var objs = {
    }
    try {
        var soldaitbnb = await DB.AsyncfindOne('pairs', { 'pair_address': "0x508F5A3C3915A488FB384BaD7ccb9e9D70EdA83e" }, {});
        var soldaitbusd = await DB.AsyncfindOne('pairs', { 'pair_address': "0xa71a319CF90f38e7D517eCE9dA4247fB7069bdDb" }, {});
        var tokenInfo = await DB.AsyncfindOne('tokens', { 'symbol': "SIT" }, {});
        if (tokenInfo) {

            var updatedate = (soldaitbnb && soldaitbnb.updatedAt) ? new Date(soldaitbnb.updatedAt) : new Date();
            var unixTime = Math.floor(updatedate.getTime() / 1000);
            objs = {
                "updated_at": unixTime,
                "data": {
                    [tokenInfo.address]: {
                        "name": tokenInfo.name,
                        "symbol": tokenInfo.symbol,
                        "price": (soldaitbusd && soldaitbusd.price) ? soldaitbusd.price : 0,
                        "price_BNB": (soldaitbnb && soldaitbnb.price) ? soldaitbnb.price : 0,
                    },
                }
            }
        }

        return res.status(200).json(objs)
    } catch (err) {
        console.log(err, 'errerr')
        return res.status(200).json(objs)
    }


}

export const circulatingSupply = async (req, res) => {
    var cSupply = 0;
    try {
        var cond = { $or: [{ quote_symbol: { $eq: "SIT" } }, { base_symbol: { $eq: "SIT" } }] };
        var getVal = await DB.AsyncfindOne('pairs', cond, {});
        if (getVal) {

            if (getVal.base_symbol == "SIT") {
                var base_totalsupply = (getVal && getVal.base_totalsupply) ? parseFloat(getVal.base_totalsupply) : 0;
                var base_deadvalue = (getVal && getVal.base_deadvalue) ? parseFloat(getVal.base_deadvalue) : 0;
                cSupply = base_totalsupply - base_deadvalue;
            } else if (getVal.quote_symbol == "SIT") {
                var quote_totalsupply = (getVal && getVal.quote_totalsupply) ? parseFloat(getVal.quote_totalsupply) : 0;
                var quote_deadvalue = (getVal && getVal.quote_deadvalue) ? parseFloat(getVal.quote_deadvalue) : 0;
                cSupply = quote_totalsupply - quote_deadvalue;
            }

        }

        return res.status(200).json(cSupply)
    } catch (err) {
        console.log(err, 'errerr')
        return res.status(200).json(cSupply)
    }

}

export const tokenInfo = async (req, res) => {

    var info = {
        totalsupply: 0,
        name: "",
        symbol: "",
        decimals: 0,
        circulatingsupply: 0,
        address: "",
    };
    var cSupply = 0;
    try {
        var cond = { $or: [{ quote_symbol: { $eq: "SIT" } }, { base_symbol: { $eq: "SIT" } }] };
        var getVal = await DB.AsyncfindOne('pairs', cond, {});
        if (getVal) {

            if (getVal.base_symbol == "SIT") {
                var base_totalsupply = (getVal && getVal.base_totalsupply) ? parseFloat(getVal.base_totalsupply) : 0;
                var base_deadvalue = (getVal && getVal.base_deadvalue) ? parseFloat(getVal.base_deadvalue) : 0;
                cSupply = base_totalsupply - base_deadvalue;

                info.totalsupply = base_totalsupply;
                info.circulatingsupply = cSupply;
                info.name = (getVal && getVal.base_name) ? getVal.base_name : "";
                info.symbol = (getVal && getVal.base_symbol) ? getVal.base_symbol : "";
                info.decimals = (getVal && getVal.base_decimals) ? getVal.base_decimals : "";
                info.address = (getVal && getVal.base_address) ? getVal.base_address : "";

            } else if (getVal.quote_symbol == "SIT") {
                var quote_totalsupply = (getVal && getVal.quote_totalsupply) ? parseFloat(getVal.quote_totalsupply) : 0;
                var quote_deadvalue = (getVal && getVal.quote_deadvalue) ? parseFloat(getVal.quote_deadvalue) : 0;
                cSupply = quote_totalsupply - quote_deadvalue;

                info.totalsupply = quote_totalsupply;
                info.circulatingsupply = cSupply;
                info.name = (getVal && getVal.quote_name) ? getVal.quote_name : "";
                info.symbol = (getVal && getVal.quote_symbol) ? getVal.quote_symbol : "";
                info.decimals = (getVal && getVal.quote_decimals) ? getVal.quote_decimals : "";
                info.address = (getVal && getVal.quote_address) ? getVal.quote_address : "";
            }

        }

        return res.status(200).json(info)
    } catch (err) {
        console.log(err, 'errerr')
        return res.status(200).json(info)
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