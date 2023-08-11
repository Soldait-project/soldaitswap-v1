import mongoose from 'mongoose'
import multer from 'multer'
import { ObjectId } from "mongodb"
import db from '../../commonQuery/commonQuery'
import config from "../../config/config";
import filterSearchQuery from '../../helper/filterQuery'
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/forms')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now()+'.png')
//     }
// });

// var upload = multer({ storage: storage })

export const adminfarmslist = (async (req, res) => {

    try {

        var limit = 10;
        var skip = 0;
        if (req.body.limit && req.body.limit != "") {
            limit = parseInt(req.body.limit);
        }
        if (req.body.skip && req.body.skip != "") {
            var skip = parseInt(req.body.skip);
            skip = (skip - 1) * limit;
        }

        var query = [
            { $match: { isTokenOnly: false, status: "Live" } },
            { $sort: { updated_time: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    _id: 1,
                    pid: 1,
                    alloc: 1,
                    lpAddresses: 1,
                    tokenSymbol: 1,
                    tokenAddresses: 1,
                    quoteTokenSymbol: 1,
                    quoteTokenAdresses: 1,
                    depositFee: 1,
                    logoURI: 1,
                    updated_time: 1,
                    lpSymbol: 1,
                    createdAt: 1,
                    apy: 1,
                }
            }
        ];

        var countquery = { isTokenOnly: false, status: "Live" };
        const result = await db.AsyncAggregation('forms', query);
        const count = await db.AsynccountDocuments('forms', countquery);

        res.send({ status: 200, 'result': result, 'totalrecords': count });

    } catch (err) {
        res.send({ status: 400, 'result': [], 'totalrecords': 0 });
    }
});

export const adminpoolslist = (async (req, res) => {

    try {

        var limit = 10;
        var skip = 0;
        if (req.query.limit && req.query.limit != "") {
            limit = parseInt(req.query.limit);
        }
        if (req.query.skip && req.query.skip != "") {
            var skip = parseInt(req.query.skip);
            skip = (skip - 1) * limit;
        }

        var query = [
            { $match: { isTokenOnly: true, status: "Live" } },
            { $sort: { updated_time: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    _id: 1,
                    pid: 1,
                    alloc: 1,
                    lpAddresses: 1,
                    tokenSymbol: 1,
                    tokenAddresses: 1,
                    quoteTokenSymbol: 1,
                    quoteTokenAdresses: 1,
                    depositFee: 1,
                    logoURI: 1,
                    updated_time: 1,
                    lpSymbol: 1,
                    createdAt: 1,
                    apy: 1,
                }
            }
        ];

        var countquery = { isTokenOnly: true, status: "Live" };
        const result = await db.AsyncAggregation('forms', query);
        const count = await db.AsynccountDocuments('forms', countquery);

        res.send({ status: 200, 'result': result, 'totalrecords': count });

    } catch (err) {
        res.send({ status: 400, 'result': [], 'totalrecords': 0 });
    }
});

// router.post("/admin-add-forms", upload.single('file'), async (req, res) => {
export const adminaddforms = (async (req, res) => {
    console.log(req.files, "files")
    try {

        // var exits = await db.AsyncfindOne('forms', { lpAddresses: req.body.lpAddresses, status: "Live" }, {});
        // if (exits) {
        //     return res.status(400).send({ message: 'Token Addresses already exists' });
        // } else {
        var saveData = {
            pid: parseInt(req.body.pid),
            risk: req.body.risk,
            lpSymbol: req.body.lpSymbol,
            alloc: req.body.alloc,
            isTokenOnly: req.body.isTokenOnly,
            lpAddresses: req.body.lpAddresses,
            tokenSymbol: req.body.tokenSymbol,
            tokenAddresses: req.body.tokenAddresses,
            quoteTokenSymbol: req.body.quoteTokenSymbol,
            quoteTokenAdresses: req.body.quoteTokenAdresses,
            depositFee: req.body.depositFee,
            logoURI: (req.files && req.files[0] && req.files[0].filename) ? `${config.imageURL}forms/${req.files[0].filename}` : "",
            apy: req.body.apy,
        }
        var data = await db.AsyncInsert('forms', saveData);
        // }

        return res.status(200).send({ message: 'Added successfully. Refreshing data...' })


    } catch (err) {
        res.send({ status: 400 });
    }
});

export const adminupdateforms = (async (req, res) => {
    console.log(req.body, 'body')
    try {

        const _id = ObjectId(req.body._id);
        var cond = {
            _id: _id
        }
        var exits = await db.AsyncfindOne('forms', cond, {});
        if (exits) {
            var update = {
                'pid': req.body.pid,
                'risk': req.body.risk,
                'lpSymbol': req.body.lpSymbol,
                'alloc': req.body.alloc,
                'isTokenOnly': req.body.isTokenOnly,
                'lpAddresses': req.body.lpAddresses,
                'tokenSymbol': req.body.tokenSymbol,
                'tokenAddresses': req.body.tokenAddresses,
                'quoteTokenSymbol': req.body.quoteTokenSymbol,
                'quoteTokenAdresses': req.body.quoteTokenAdresses,
                'depositFee': req.body.depositFee,
                'apy': req.body.apy,
            };
            if (req.files[0] && req.files[0].filename != "") {
                update.logoURI = (req.files[0] && req.files[0].filename) ? `${config.imageURL}forms/${req.files[0].filename}` : "";
            }
            await db.AsyncfindOneAndUpdate('forms', cond, update, { new: true });

        }
        return res.status(200).send({ message: 'Farm added successfully. Refreshing data...' })


    } catch (err) {
        console.log(err, "error")
        res.status(400).send({ message: 'Error on server' });
    }
});

export const formdata = (async (req, res) => {

    try {
        var data = await db.AsyncFind('forms', { isTokenOnly: false }, {}, {});
        return res.status(200).send(data);
    } catch (err) {
        res.send({ status: 400 });
    }
});

export const admindeleteforms = (async (req, res) => {
    try {
        const _id = ObjectId(req.body._id);
        console.log(_id, 'id')
        var cond = {
            _id: _id
        }
        let update = {
            'status': "Deleted"
        };
        var resp = await db.AsyncfindOneAndUpdate('forms', cond, update, { new: true });
        console.log(resp, 'dbres')
        return res.status(200).send({ message: 'Farm deleted successfully. Refreshing data...', success: true })

    } catch (err) {
        res.send({ status: 400 });
    }
});

export const addtoken = (async (req, res) => {
    console.log(req.files, "files")
    try {
        var saveData = {
            name: req.body.name,
            symbol: req.body.symbol,
            decimals: req.body.decimals,
            totalSupply: req.body.totalSupply,
            address: req.body.address,
            logoURI: (req.files && req.files[0] && req.files[0].filename) ? req.files[0].filename : "",
        }
        var data = await db.AsyncInsert('tokens', saveData);
        // }

        return res.status(200).send({ message: 'Added successfully. Refreshing data...' })


    } catch (err) {
        res.send({ status: 400 });
    }
});

export const updatetoken = (async (req, res) => {
    console.log(req.body, 'body')
    try {

        const _id = ObjectId(req.body._id);
        var cond = {
            _id: _id
        }
        var exits = await db.AsyncfindOne('tokens', cond, {});
        if (exits) {
            var update = {
                name: req.body.name,
                symbol: req.body.symbol,
                decimals: req.body.decimals,
                totalSupply: req.body.totalSupply,
                address: req.body.address,
            };
            if (req.files && req.files[0] && req.files[0].filename != "") {
                update.logoURI = (req.files[0] && req.files[0].filename) ? req.files[0].filename : "";
            }
            await db.AsyncfindOneAndUpdate('tokens', cond, update, { new: true });

        }
        return res.status(200).send({ message: 'Farm added successfully. Refreshing data...' })


    } catch (err) {
        res.status(400).send({ message: 'Error on server' });
    }
});

export const admintokenlist = (async (req, res) => {

    try {
        console.log("hi surain")
        console.log(req.query, "ddddddddd")
        let filter = filterSearchQuery(req.query, [
            "name",
            "address",
            "symbol",

        ]);
        filter['status'] = "Live"
        filter["addedbyuser"] = { $ne: "yes" };
        var limit = 10;
        var skip = 0;
        if (req.query.limit && req.query.limit != "") {
            limit = parseInt(req.query.limit);
        }
        if (req.query.skip && req.query.skip != "") {
            var skip = parseInt(req.query.skip);
            skip = (skip - 1) * limit;
        }

        var query = [
            { $match: filter },
            { $sort: { updated_time: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    symbol: 1,
                    address: 1,
                    decimals: 1,
                    totalSupply: 1,
                    logoURI: 1,
                    createdAt: 1,
                    tradetype: 1,
                }
            }
        ];

        // var countquery = [{ $match: filter }];

        const result = await db.AsyncAggregation('tokens', query);
        console.log(result.length)
        // const count = await db.Asynccount('tokens', countquery);
        res.send({ status: 200, 'result': result, 'totalrecords': result.length });

    } catch (err) {
        console.log(err, 'ee')
        res.send({ status: 400, 'result': [], 'totalrecords': 0 });
    }
});

export const admindeletetokens = (async (req, res) => {
    try {
        const _id = ObjectId(req.body._id);
        console.log(_id, 'id')
        var cond = {
            _id: _id
        }
        let update = {
            'status': "Deleted"
        };
        var resp = await db.AsyncfindOneAndUpdate('tokens', cond, update, { new: true });
        console.log(resp, 'dbres')
        return res.status(200).send({ message: 'token deleted successfully. Refreshing data...', success: true })

    } catch (err) {
        res.send({ status: 400 });
    }
});

export const adminstartokens = (async (req, res) => {
    try {
        const _id = ObjectId(req.body._id);
        console.log(_id, 'id')
        var cond = {
            _id: _id
        }
        let update = {
            'tradetype': req.body.tradetype
        };
        var resp = await db.AsyncfindOneAndUpdate('tokens', cond, update, { new: true });
        var limit = 10;
        var skip = 0;
        var query = [
            { $match: { status: "Live", addedbyuser: { $ne: "yes" } } },
            { $sort: { updated_time: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    symbol: 1,
                    address: 1,
                    decimals: 1,
                    totalSupply: 1,
                    logoURI: 1,
                    createdAt: 1,
                    tradetype: 1,
                }
            }
        ];

        var countquery = { status: 1 };
        const result = await db.AsyncAggregation('tokens', query);
        const count = await db.AsynccountDocuments('tokens', countquery);

        return res.status(200).send({ message: 'token deleted successfully. Refreshing data...', result: result, 'totalrecords': count, success: true })

    } catch (err) {
        res.send({ status: 400 });
    }
});

