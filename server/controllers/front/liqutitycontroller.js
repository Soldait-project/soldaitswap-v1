
import DB from "../../commonQuery/commonQuery"
import isEmpty from "is-empty"

import {
    addliqutityValidate,
    removeliqutityValidate
} from "../../validation/liqutity-validation"


export const addLiqutity = async (req, res) => {

    try {
        var reqBody = req.body;

        var address = req.body.address;
        var data = {
            address: address
        }

        var isError = await addliqutityValidate(reqBody);

        if (!isEmpty(isError)) {
            return res.send({ status: 400, errors: isError });
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
            lpamount: reqBody.lpamount,
            actiontype: 'add'
        }

        await DB.AsyncInsert('liqutity', data);
        if (reqBody.new_token && reqBody.new_token.newtoken
            && reqBody.new_token.newtoken == "yes") {
            var exitsToken = await DB.AsyncfindOne('tokens', { address: reqBody.new_token.address }, {});
            if (!exitsToken) {
                var tokenData = {
                    name: reqBody.new_token.name,
                    symbol: reqBody.new_token.symbol,
                    address: reqBody.new_token.address,
                    chainId: reqBody.new_token.chainId,
                    decimals: reqBody.new_token.decimals,
                    logoURI: reqBody.new_token.logoURI,
                    addedbyuser: "yes"
                }
                await DB.AsyncInsert('tokens', tokenData);
            }

        }

        res.send({ status: 200, 'message': 'valid', 'errors': {} });

    } catch (err) {
        console.log(err, 'errerrerrerr')
        res.send({ status: 400, 'errors': {} });
    }

};

export const removeLiqutity = async (req, res) => {
    console.log(req.body, 'removeLiqutity')
    try {
        var reqBody = req.body;
        var isError = await removeliqutityValidate(reqBody);
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
            actiontype: "remove",
            lpamount: reqBody.lpamount,
        }
        await DB.AsyncInsert('liqutity', data);
        res.send({ status: 200, 'message': 'valid', 'errors': {} });

    } catch (err) {
        res.send({ status: 400, 'errors': {} });
    }

};

export const liqutityHistory = async (req, res) => {
    try {
        var limit = 5;
        var skip = 0;
        if (req.query.per_page && req.query.per_page != "") {
            limit = parseInt(req.query.per_page);
        }
        if (req.query.page && req.query.page != "") {
            var page = parseInt(req.query.page);
            skip = (page - 1) * limit;
        }
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
                    createdAt: 1,
                    lpamount: 1
                }
            }
        ];
        const result = await DB.AsyncAggregation('liqutity', query);
        const count = await DB.AsynccountDocuments('liqutity', {});

        res.send({ status: 200, 'list': result, 'totalrecords': count });

    } catch (err) {
        res.send({ status: 400, 'list': [], 'totalrecords': 0 });
    }
}


export const recentLiqutityHistory = async (req, res) => {
    try {

        var start = new Date();
        start.setHours(0, 0, 0, 0);

        var end = new Date();
        end.setHours(23, 59, 59, 999);

        var cond = {
            createdAt: { $gte: start, $lt: end },
            useraddress: req.query.address
        }

        var query = [
            { $match: cond },
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            {
                $project: {
                    fromaddress: 1,
                    fromamount: 1,
                    toaddress: 1,
                    toamount: 1,
                    useraddress: 1,
                    txid: 1,
                    gasfee: 1,
                    createdAt: 1,
                    actiontype: 1
                }
            }
        ];
        const result = await DB.AsyncAggregation('liqutity', query);

        res.send({ status: 200, 'list': result });

    } catch (err) {
        res.send({ status: 400, 'list': [], 'totalrecords': 0 });
    }
}
