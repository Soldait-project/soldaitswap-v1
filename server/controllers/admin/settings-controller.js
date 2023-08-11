import { ObjectId } from "mongodb"
import db from '../../commonQuery/commonQuery'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../../config/config'

import CryptoJS from "crypto-js"
const SecretKey = config.secretKey;
import { sendEmail } from '../../helper/emailGateway'

export const getsettings = (async (req, res) => {

    try {

        var settings = await db.AsyncfindOne('settings', {}, {});

        var bytes = CryptoJS.AES.decrypt(settings.secretKey, SecretKey);
        var decryptKey = bytes.toString(CryptoJS.enc.Utf8);
        settings.secretKey = decryptKey;
        res.send({
            'status': 200,
            'result': settings
        });

    } catch (err) {
        res.send({ status: 400 });
    }
});

export const updatesettings = (async (req, res) => {

    try {

        const secretKey = req.body.secretKey;
        const adminaddress = req.body.adminaddress;

        var encryptKey = CryptoJS.AES.encrypt(secretKey, SecretKey);

        var update = {
            secretKey: encryptKey.toString(),
            adminaddress: adminaddress
        }

        await db.AsyncfindOneAndUpdate('settings', {}, update, { new: true });
        return res.status(200).json({ message: 'Settings updated successfully. Refreshing data...' });

    } catch (err) {
        res.send({ status: 400 });
    }
});

export const sitesocialurl = (async (req, res) => {

    try {
        console.log(req.body, 'req')
        var _id = "";
        var exits;
        if (req.body._id) {
            _id = ObjectId(req.body._id);
            var cond = {
                _id: _id
            }
            exits = await db.AsyncfindOne('siteurl', cond, {});
        }


        var update = {
            'facebook': req.body.facebook,
            'twitter': req.body.twitter,
            'linkedin': req.body.linkedin,
            'telegram': req.body.telegram,
            'youtube': req.body.youtube,
        };
        if (exits) {
            console.log("exites")
            let data = await db.AsyncfindOneAndUpdate('siteurl', cond, update, { new: true });
        } else {
            console.log("new");
            let data = await db.AsyncInsert('siteurl', update);
        }
        return res.status(200).json({ message: 'site settings added successfully. Refreshing data...' })


    } catch (err) {
        console.log(err, "error");
        res.send({ status: 400 });
    }
});

export const getsocialurl = (async (req, res) => {

    try {
        let exits = await db.AsyncfindOne('siteurl', {}, {});

        return res.status(200).json({ message: 'site settings fetched successfully.', data: exits })


    } catch (err) {
        return res.status(400).json({ message: 'error on server', status: 400 });
    }
});



export const getnewslettersubscriber = (async (req, res) => {

    try {
        const subscribermail = await db.AsyncFind('subscribe', {status: "Live" }, {});

        return res.status(200).json({ message: 'site settings fetched successfully.', data: subscribermail })


    } catch (err) {
        console.log(err,"error")
        res.send({ status: 400 });
    }
});

export const getsubscriberslist = (async (req, res) => {

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
        var cond ={status: "Live"};
        if (req.query.search && req.query.search != "") {
            var search = req.query.search;
            cond = {
                status: "Live",email: { '$regex': new RegExp('.*' + search + '.*', 'i') }
              };
        }
        console.log(cond,"cond")
        var query =[{ $match: cond },
        { $skip: skip },
        { $limit: limit }]
        const subscribermail = await db.AsyncAggregation('subscribe', query);

        return res.status(200).json({ message: 'subscribers list fetched successfully.', data: subscribermail })


    } catch (err) {
        console.log(err,"error")
        res.send({ status: 400,message: 'Error on server' });
    }
});

export const admindeletesuscribers = (async (req, res) => {
    try {
        const _id = ObjectId(req.body._id);
        console.log(_id, 'id')
        var cond = {
            _id: _id
        }
        let update = {
            'status': "Deleted"
        };
        var resp = await db.AsyncfindOneAndUpdate('subscribe', cond, update, { new: true });
        console.log(resp, 'dbres')
        return res.status(200).send({ message: 'suscrbers deleted successfully. Refreshing data...', success: true })

    } catch (err) {
        res.send({ status: 400 });
    }
});

export const sendnewsletter = (async (req, res) => {

    try {
        let toEmail = req.body.email;
        let content = req.body.message;
        console.log(req.body.email, 'email')
        let mailContent = {
            "subject": " Soldait Newsletter",
            "template": content
        };
        // mailContent['subject'] = "Babypink Newsletter";
        // mailContent['template'] = content;
        console.log(mailContent.subject, 'post')
        sendEmail(toEmail, mailContent);
        return res.status(200).json({ message: 'site settings added successfully. Refreshing data...' })


    } catch (err) {
        res.send({ status: 400 });
    }
});

export const forgotpassword = (async (req, res) => {

    try {
        var toEmail = req.body.email;
        var identifier = req.body.identifier;

        var randHex = function (len) {
            var maxlen = 10;
            var min = Math.pow(16, Math.min(len, maxlen) - 1);
            var max = Math.pow(16, Math.min(len, maxlen)) - 1;
            var n = Math.floor(Math.random() * (max - min + 1)) + min;
            var r = n.toString(16);
            while (r.length < len) {
                r = r + randHex(len - maxlen);
            }
            return r;
        };

        var user = await db.AsyncfindOne('admin', { email: toEmail }, {});
        if (user) {
            var random = await randHex(8)
            let check = {
                email: user.email
            }
            let mailcodes = {
                mailcode: random
            }
            let data = await db.AsyncfindOneAndUpdate('admin', check, mailcodes, { new: true });
            console.log(data.mailcode, 'code');
            console.log(req.body.email, 'email');
            console.log(identifier, 'identifier');
            let cond = {
                identifier: identifier
            }
            var template = await db.AsyncfindOne('template', cond, {});
            if (template) {
                let mailContent = {
                    "subject": template.subject,
                    "template": template.content
                };
                console.log(template, 't')

                var templateurl = config.adminpanel + 'reset-password/' + random;
                console.log(templateurl, 'url');


                mailContent['template'] = mailContent['template']
                    .replace("##SITEURL##", config.frontUrl)
                    .replace("##templateInfo_url##", templateurl)

                console.log(mailContent.template, 'template')
                sendEmail(toEmail, mailContent);
                return res.status(200).json({ message: 'Forgot mail send successfully. check your mail', status: true })
            } else {
                return res.status(200).json({ error: 'template missing on database', message: 'Template Not Found', status: false })
            }
        } else {
            return res.status(200).json({ error: 'please enter admin email', message: 'User Not Found', status: false })
        }

    } catch (err) {
        res.status(400).json({ message: 'error on server', status: false })
    }
});

export const verifyurl = (async (req, res) => {

    try {
        console.log(req.body.protocal, 'req')
        const code = req.body.protocal;
        var cond = {
            mailcode: code
        }
        var exits = await db.AsyncfindOne('admin', cond, {});
        if (exits) {
            // let data =  await db.AsyncfindOneAndUpdate('admin', {email: exits.email}, {mailcode: ""}, { new: true });
            return res.status(200).json({ message: 'verifed', reply: true })
        } else {
            return res.status(200).json({ message: 'Url Not Found', reply: false })
        }

    } catch (err) {
        res.send({ status: 400 });
    }
});


export const resetpassword = (async (req, res) => {

    try {
        const password = req.body.password;
        const code = req.body.protocal;
        var encpassword = CryptoJS.AES.decrypt(password, SecretKey);
        var decryptKey = encpassword.toString(CryptoJS.enc.Utf8);
        var hash = bcrypt.hashSync(decryptKey, 8);
        var cond = {
            mailcode: code
        }
        var exits = await db.AsyncfindOne('admin', cond, {});

        if (exits) {
            let check = {
                email: exits.email
            }
            let update = {
                password: hash,
                mailcode: ""
            }
            let data = await db.AsyncfindOneAndUpdate('admin', check, update, { new: true });
        } else {
            return res.status(400).json({ message: 'Reset password failed. Refreshing data...' })
        }
        return res.status(200).json({ message: 'Reset password successfully. Refreshing data...' })

    } catch (err) {
        res.status(400).json({ message: 'error on server' })
    }
});

export const gettemplate = (async (req, res) => {

    try {
        console.log(req.query.identifier, "params")
        let cond = { "identifier": req.query.identifier }
        var template = await db.AsyncfindOne('template', cond, {});

        return res.status(200).json({ message: 'fetch Template successfully', result: template })

    } catch (err) {
        res.status(400).json({ message: 'error on server' })
    }
});

export const settemplate = (async (req, res) => {

    try {
        console.log(req.body.identifier, "params")
        let cond = { "identifier": req.body.identifier }
        let update = { "content": req.body.template }
        var template = await db.AsyncfindOneAndUpdate('template', cond, update, {});

        return res.status(200).json({ message: 'Template successfully updated' })

    } catch (err) {
        res.status(400).json({ message: 'error on server' })
    }
});

export const getapy = (async (req, res) => {

    try {

        let exits = await db.AsyncfindOne('siteurl', {}, {});

        return res.status(200).json({ message: 'apy fetched successfully.', data: exits })


    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'error on server', status: 400 });
    }
});

export const updateapy = (async (req, res) => {

    try {
        console.log(req.body.apy, "params")
        var update = { "apy": req.body.apy }
        if (req.body._id) {
            let cond = { "_id": req.body._id };
            var template = await db.AsyncfindOneAndUpdate('siteurl', cond, update, {});
        } else {
            let data = await db.AsyncInsert('siteurl', update);
        }

        return res.status(200).json({ status: true, message: 'APY successfully updated' })

    } catch (err) {
        res.status(400).json({ status: false, message: 'error on server' })
    }
});

export const AddFaq = (async (req, res) => {

    try {

        console.log(req.body, '----------------')
        var saveData = {
            question: req.body.question,
            answer: req.body.answer,
        }
        await db.AsyncInsert('faq', saveData);
        return res.status(200).send({ success: true, message: 'Added successfully. Refreshing data...' })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: 'error on server', status: 400 });
    }
});
export const getFaq = (async (req, res) => {

    try {
        var limit = 10;
        var skip = 0;
        if (req.query.limit && req.query.limit != "") {
            limit = parseInt(req.query.limit);
        }
        if (req.query.skip && req.query.skip != "") {
            var page = parseInt(req.query.skip);
            skip = (page - 1) * limit;
        }
        var cond = {}
        var sort = { sort: { _id: -1 }, limit: limit, skip: skip }
        const count = await db.AsynccountDocuments('faq', cond);
        const faqList = await db.AsyncFind('faq', {}, {}, sort);;
        return res.status(200).send({ success: true, result: faqList, message: 'success..', 'totalrecords': count })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: 'error on server', status: 400 });
    }
});
export const updateFaq = (async (req, res) => {

    try {

        const _id = ObjectId(req.body.id);
        var cond = {
            _id: _id
        }
        var update = {
            question: req.body.question,
            answer: req.body.answer,
        };
        await db.AsyncfindOneAndUpdate('faq', cond, update, { new: true });
        return res.status(200).send({ message: 'Faq Updated successfully. Refreshing data...', success: true })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: 'error on server', status: 400 });
    }
});