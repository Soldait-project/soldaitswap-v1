import mongoose from 'mongoose'
// import multer from 'multer'
import { ObjectId } from "mongodb"
import db from '../../commonQuery/commonQuery'
// const path = require("path");

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/forms')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {

//         cb(null, 'public/adv/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
//     }
// });

// var upload_swap = multer({ storage: storage }).any();

export const updateswapadv =(async (req, res) => {

    try {

        var allFiles = req.files;

        if (allFiles && allFiles.length > 0) {

            var index1 = allFiles.findIndex(val => val.fieldname == "bannerFile_1");
            var index2 = allFiles.findIndex(val => val.fieldname == "bannerFile_2");
            var index3 = allFiles.findIndex(val => val.fieldname == "bannerFile_3");
            var index4 = allFiles.findIndex(val => val.fieldname == "bannerFile_4");
            var index5 = allFiles.findIndex(val => val.fieldname == "bannerFile_5");
            var index6 = allFiles.findIndex(val => val.fieldname == "bannerFile_6");
            var index7 = allFiles.findIndex(val => val.fieldname == "bannerFile_7");

            var exits = await db.AsyncfindOne('advertisement', {}, {});

            if (!exits) {
                exits = await db.AsyncInsert('advertisement', {});
            }

            var updateData = {};

            updateData.bannerFile_1 = (index1 != -1) ? req.files[index1].filename : exits.swap.bannerFile_1;
            updateData.bannerFile_2 = (index2 != -1) ? req.files[index2].filename : exits.swap.bannerFile_2;
            updateData.bannerFile_3 = (index3 != -1) ? req.files[index3].filename : exits.swap.bannerFile_3;
            updateData.bannerFile_4 = (index4 != -1) ? req.files[index4].filename : exits.swap.bannerFile_4;
            updateData.bannerFile_5 = (index5 != -1) ? req.files[index5].filename : exits.swap.bannerFile_5;
            updateData.bannerFile_6 = (index6 != -1) ? req.files[index6].filename : exits.swap.bannerFile_6;
            updateData.bannerFile_7 = (index7 != -1) ? req.files[index7].filename : exits.swap.bannerFile_7;

            await db.AsyncfindOneAndUpdate('advertisement', {}, { swap: updateData }, { new: true });
        }

        return res.status(200).json({ message: 'added successfully. Refreshing data...' })


    } catch (err) {
        res.send({ status: 400 });
    }
});

export const getadv =(async (req, res) => {

    try {
        var type = req.query.advtype;
        var result = await db.AsyncfindOne('advertisement', {}, { [type]: 1 });

        return res.status(200).json({ result })


    } catch (err) {
        res.send({ status: 400 });
    }
});

export const updateliqutityadv =(async (req, res) => {

    try {

        var allFiles = req.files;

        if (allFiles && allFiles.length > 0) {

            var index1 = allFiles.findIndex(val => val.fieldname == "bannerFile_1");
            var index2 = allFiles.findIndex(val => val.fieldname == "bannerFile_2");
            var index3 = allFiles.findIndex(val => val.fieldname == "bannerFile_3");
            var index4 = allFiles.findIndex(val => val.fieldname == "bannerFile_4");
            var index5 = allFiles.findIndex(val => val.fieldname == "bannerFile_5");

            var exits = await db.AsyncfindOne('advertisement', {}, {});

            if (!exits) {
                exits = await db.AsyncInsert('advertisement', {});
            }

            var updateData = {};

            updateData.bannerFile_1 = (index1 != -1) ? req.files[index1].filename : exits.liqutity.bannerFile_1;
            updateData.bannerFile_2 = (index2 != -1) ? req.files[index2].filename : exits.liqutity.bannerFile_2;
            updateData.bannerFile_3 = (index3 != -1) ? req.files[index3].filename : exits.liqutity.bannerFile_3;
            updateData.bannerFile_4 = (index4 != -1) ? req.files[index4].filename : exits.liqutity.bannerFile_4;
            updateData.bannerFile_5 = (index5 != -1) ? req.files[index5].filename : exits.liqutity.bannerFile_5;

            await db.AsyncfindOneAndUpdate('advertisement', {}, { liqutity: updateData }, { new: true });
        }

        return res.status(200).json({ message: 'added successfully. Refreshing data...' })


    } catch (err) {
        res.send({ status: 400 });
    }
});

export const updatefarmsadv =(async (req, res) => {

    try {

        var allFiles = req.files;

        if (allFiles && allFiles.length > 0) {

            var index1 = allFiles.findIndex(val => val.fieldname == "bannerFile_1");
            var index2 = allFiles.findIndex(val => val.fieldname == "bannerFile_2");
            var index3 = allFiles.findIndex(val => val.fieldname == "bannerFile_3");
            var index4 = allFiles.findIndex(val => val.fieldname == "bannerFile_4");
            var index5 = allFiles.findIndex(val => val.fieldname == "bannerFile_5");

            var exits = await db.AsyncfindOne('advertisement', {}, {});

            if (!exits) {
                exits = await db.AsyncInsert('advertisement', {});
            }

            var updateData = {};

            updateData.bannerFile_1 = (index1 != -1) ? req.files[index1].filename : exits.farms.bannerFile_1;
            updateData.bannerFile_2 = (index2 != -1) ? req.files[index2].filename : exits.farms.bannerFile_2;
            updateData.bannerFile_3 = (index3 != -1) ? req.files[index3].filename : exits.farms.bannerFile_3;
            updateData.bannerFile_4 = (index4 != -1) ? req.files[index4].filename : exits.farms.bannerFile_4;
            updateData.bannerFile_5 = (index5 != -1) ? req.files[index5].filename : exits.farms.bannerFile_5;

            await db.AsyncfindOneAndUpdate('advertisement', {}, { farms: updateData }, { new: true });
        }

        return res.status(200).json({ message: 'added successfully. Refreshing data...' })


    } catch (err) {
        res.send({ status: 400 });
    }
});

export const updatepoolsadv = (async (req, res) => {

    try {

        var allFiles = req.files;

        if (allFiles && allFiles.length > 0) {

            var index1 = allFiles.findIndex(val => val.fieldname == "bannerFile_1");
            var index2 = allFiles.findIndex(val => val.fieldname == "bannerFile_2");
            var index3 = allFiles.findIndex(val => val.fieldname == "bannerFile_3");
            var index4 = allFiles.findIndex(val => val.fieldname == "bannerFile_4");
            var index5 = allFiles.findIndex(val => val.fieldname == "bannerFile_5");

            var exits = await db.AsyncfindOne('advertisement', {}, {});

            if (!exits) {
                exits = await db.AsyncInsert('advertisement', {});
            }

            var updateData = {};

            updateData.bannerFile_1 = (index1 != -1) ? req.files[index1].filename : exits.pools.bannerFile_1;
            updateData.bannerFile_2 = (index2 != -1) ? req.files[index2].filename : exits.pools.bannerFile_2;
            updateData.bannerFile_3 = (index3 != -1) ? req.files[index3].filename : exits.pools.bannerFile_3;
            updateData.bannerFile_4 = (index4 != -1) ? req.files[index4].filename : exits.pools.bannerFile_4;
            updateData.bannerFile_5 = (index5 != -1) ? req.files[index5].filename : exits.pools.bannerFile_5;

            await db.AsyncfindOneAndUpdate('advertisement', {}, { pools: updateData }, { new: true });
        }

        return res.status(200).json({ message: 'added successfully. Refreshing data...' })


    } catch (err) {
        res.send({ status: 400 });
    }
});


export const updatereferaladv = (async (req, res) => {

    try {

        var allFiles = req.files;

        if (allFiles && allFiles.length > 0) {

            var index1 = allFiles.findIndex(val => val.fieldname == "bannerFile_1");

            var exits = await db.AsyncfindOne('advertisement', {}, {});

            if (!exits) {
                exits = await db.AsyncInsert('advertisement', {});
            }

            var updateData = {};

            updateData.bannerFile_1 = (index1 != -1) ? req.files[index1].filename : exits.referal.bannerFile_1;

            await db.AsyncfindOneAndUpdate('advertisement', {}, { referal: updateData }, { new: true });
        }

        return res.status(200).json({ message: 'added successfully. Refreshing data...' })


    } catch (err) {
        res.send({ status: 400 });
    }
});
