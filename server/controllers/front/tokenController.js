
import DB from "../../commonQuery/commonQuery"

const CoinMarketCap = require('coinmarketcap-api')
const apiKey = 'ec80bed3-8f55-46b5-b0a3-8394981d5b1c'
const client = new CoinMarketCap(apiKey)

export const getTokens = async (req, res) => {

    try {

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
                logoURI: "https://indxapi.alwin.io/coins/default.png",
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
