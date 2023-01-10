import mongoose from 'mongoose'
import multer from 'multer'
import { ObjectId } from "mongodb"
import db from '../../commonQuery/commonQuery'

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/forms')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// var upload = multer({ storage: storage })

export const pooladd=(async (req, res) => {

    try {

        var exits = await db.AsyncfindOne('forms', { lpAddresses: req.body.lpAddresses }, {});
        if (exits) {
            return res.status(400).json({ tokenAddresses: 'Token Addresses already exists' });
        } else {
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
                logoURI: (req.file && req.file.filename) ? req.file.filename : "",
            }
            var data = await db.AsyncInsert('forms', saveData);
        }

        return res.status(200).json({ message: 'Farm added successfully. Refreshing data...' })


    } catch (err) {
        res.send({ status: 400 });
    }
});

export const poolupdate =(async (req, res) => {

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
            };
            if (req.file && req.file.filename != "") {
                update.logoURI = (req.file && req.file.filename) ? req.file.filename : "";
            }
            await db.AsyncfindOneAndUpdate('forms', cond, update, { new: true });

        }
        return res.status(200).json({ message: 'Farm added successfully. Refreshing data...' })


    } catch (err) {
        res.send({ status: 400 });
    }
});

export const Pooldata=(async (req, res) => {

    try {
        var data = await db.AsyncFind('forms', { isTokenOnly: true }, {}, {});
        return res.status(200).send(data);
    } catch (err) {
        res.send({ status: 400 });
    }
});

export const pooldelete=(async (req, res) => {

    try {
        var data = await db.Asyncremove('forms', { _id: ObjectId(req.body._id) }, {}, {});
        return res.status(200).json({ message: 'Farm deleted successfully. Refreshing data...', success: true })

    } catch (err) {
        res.send({ status: 400 });
    }
});

