
import DB from "../../commonQuery/commonQuery"
import isEmpty from "is-empty"

import { addswapValidate } from "../../validation/swap-validation"
var {
    getCondition,
    getgroupBy
} = require('./chart-common');

export const addSwap = async (req, res) => {

    try {
        var reqBody = req.body;
        var isError = await addswapValidate(reqBody);
        if (!isEmpty(isError)) {
            return res.send({ status: 400, errors: isError });
        }

        var address = req.body.address;
        var data = {
            address: address
        }
        var exits = await DB.AsyncfindOne('swapusers', data, {});
        if (!exits) {
            await DB.AsyncInsert('swapusers', data);
        }

        var data = {
            useraddress: reqBody.address,
            fromaddress: reqBody.fromaddress,
            fromamount: reqBody.fromamount,
            toaddress: reqBody.toaddress,
            toamount: reqBody.toamount,
            txid: reqBody.txid,
            gasfee: reqBody.gasfee,
            fromSymbol: reqBody.fromSymbol,
            toSymbol: reqBody.toSymbol
        }

        await DB.AsyncInsert('swapping', data);
        res.send({ status: 200, 'message': 'valid', 'errors': {} });
    } catch (err) {
        res.send({ status: 400, 'errors': {} });
    }

};

export const swapHistory = async (req, res) => {

    try {
        var limit = 10;
        var skip = 0;
        if (req.query.per_page && req.query.per_page != "") {
            limit = parseInt(req.query.per_page);
        }
        if (req.query.page && req.query.page != "") {
            var page = parseInt(req.query.page);
            skip = (page - 1) * limit;
        }
        // var cond = { useraddress: req.query.address }
        var cond = { }
        var query = [
            { $match: { _id: { $ne: null } } },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    fromaddress: 1,
                    fromamount: 1,
                    toaddress: 1,
                    toamount: 1,
                    useraddress: 1,
                    txid: 1,
                    gasfee: 1,
                    createdAt: 1
                }
            }
        ];
        const result = await DB.AsyncAggregation('swapping', query);
        const count = await DB.AsynccountDocuments('swapping', cond);

        res.send({ status: 200, 'list': result, 'totalrecords': count });

    } catch (err) {
        res.send({ status: 400, 'list': [], 'totalrecords': 0 });
    }
}

export const recentSwapHistory = async (req, res) => {
    try {
        var cond = { useraddress: req.query.address }
        var query = [
            { $match: cond },
            { $sort: { createdAt: -1 } },
            { $limit: 15 },
            {
                $project: {
                    fromaddress: 1,
                    fromamount: 1,
                    toaddress: 1,
                    toamount: 1,
                    useraddress: 1,
                    txid: 1,
                    gasfee: 1,
                    createdAt: 1
                }
            }
        ];
        const result = await DB.AsyncAggregation('swapping', query);
        res.send({ status: 200, 'list': result });

    } catch (err) {
        console.log(err, 'errerr--errerr')
        res.send({ status: 400, 'list': [], 'totalrecords': 0 });
    }
}

export const swapHistoryChart = async (req, res) => {

    try {

        var period = parseFloat(req.query.period);
        var from = req.query.from;
        var to = req.query.to;
        var groupBy = await getgroupBy(period);

        var cond = await getCondition(period);

        var LastPrice = 0;

        cond['$and'] = [
            { fromaddress: from, toaddress: to }
        ];
        console.log(cond, 'condcondcond')
        var query = [
            {
                "$match": cond
            },
            //{ "$limit": limit },
            {
                "$project": {
                    "_id": 1,
                    "toamount": 1,
                    "createdAt": 1,
                    "Hour": {
                        $hour: { date: "$createdAt", timezone: "Asia/Kolkata" }
                    },
                    "Minute": {
                        $minute: { date: "$createdAt", timezone: "Asia/Kolkata" }
                    },
                }
            },
        ];

        query.push(groupBy);

        var sortQuery = { $sort: { createdAt: 1 } };

        query.push(sortQuery);

        var datFromat = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        if (period == 365) {
            datFromat = { $dateToString: { format: "%m", date: "$createdAt" } };
        }

        var finalProject = {
            "$project": {
                "_id": 0,
                "toamount": "$toamount",
                "date": datFromat,
                "interval": "$_id",
                "Hour": "$Hour",
                "Minute": "$Minute"
            }
        };
        query.push(finalProject);

        var result = await DB.AsyncAggregation('swapping', query);
        //console.log(result, 'resultresult')
        res.send({ status: 200, 'list': result, 'LastPrice': LastPrice });


    } catch (err) {
        console.log(err, 'errerrerrerr')
        res.send({ status: 400, 'list': [], 'LastPrice': 0 });
    }
}