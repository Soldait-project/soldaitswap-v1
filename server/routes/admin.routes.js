import express from "express";
const router = express();
import multer from 'multer'
import path from "path"
import jwt from "jsonwebtoken"

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/forms')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
});

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'public/tokens/')
    },
    filename: function (req, file, cb) {
        console.log(file,"fill------")
        cb(null, file.originalname)
    }
});

var Storageone = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'public/currency/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
});
var upload_swap = multer({ storage: storage }).any();
var upload_token = multer({ storage: Storage }).any();
var upload_currency = multer({ storage: Storageone }).any();

const authVerify = (req, res, next) => {

    try {

        var secfetchsite = req.headers["sec-fetch-site"];
        var name = "Bearer ";
        var authToken = req.headers.authorization;
        var token = authToken.replace(name, "");
        if (req.headers.authorization && req.headers.authorization != "") {
            jwt.verify(token, config.secretKey, (err, verified) => {
                if (!err && verified && verified.id && secfetchsite == "same-site") {
                    next();
                } else {
                    return res.status(400).json({
                        errmessage: "authorization required.",
                    });

                }
            });
        } else {
            next();
        }
    } catch (err) {
        return res.status(400).json({
            errmessage: "authorization required.",
        });
    }
}



import * as adminCtrl from "../controllers/admin/admin-controller";
import * as swapCtrl from "../controllers/admin/adminswap-controller";
import * as advCtrl from "../controllers/admin/adv-controller";
import * as formCtrl from "../controllers/admin/form-controller";
import * as poolCtrl from "../controllers/admin/pool-controller";
import * as settingCtrl from "../controllers/admin/settings-controller";
import * as currencyCtrl from "../controllers/admin/currency-controller";
import * as p2pCtrl from "../controllers/admin/p2p-controllers";

router.route("/login").post(adminCtrl.login);
router.route("/admin-total-details").get(adminCtrl.admintotaldetails);

router.route("/admin-swap-history").get(swapCtrl.adminswaphistory);
router.route("/admin-liqutity-history").get(swapCtrl.adminliqutityhistory);
router.route("/admin-users-list").get(swapCtrl.adminuserslist);
router.route("/admin-update-user").post(swapCtrl.adminLockuser);
router.route("/userlist-CSV-report").get(swapCtrl.userlistCSVreport);
router.route("/swaplist-CSV-report").get(swapCtrl.SwappingCSVreport);
router.route("/liqutity-CSV-report").get(swapCtrl.LiqutityCSVreport);

router.route("/update-swap-adv").post(upload_swap,advCtrl.updateswapadv);
router.route("/get-adv").get(advCtrl.getadv);
router.route("/update-liqutity-adv").post(upload_swap,advCtrl.updateliqutityadv);
router.route("/update-farms-adv").post(upload_swap,advCtrl.updatefarmsadv);
router.route("/update-pools-adv").post(upload_swap,advCtrl.updatepoolsadv);
router.route("/update-referal-adv").post(upload_swap,advCtrl.updatereferaladv);

router.route("/admin-farms-list").get(formCtrl.adminfarmslist);
router.route("/admin-pools-list").get(formCtrl.adminpoolslist);
router.route("/admin-add-forms").post(upload_swap,formCtrl.adminaddforms);
router.route("/admin-update-forms").post(upload_swap,formCtrl.adminupdateforms);
router.route("/form-data").post(formCtrl.formdata);
router.route("/admin-delete-forms").post(formCtrl.admindeleteforms);
router.route("/admin-add-token").post(upload_token,formCtrl.addtoken);
router.route("/admin-update-token").post(upload_token,formCtrl.updatetoken);
router.route("/admin-token-list").get(formCtrl.admintokenlist);
router.route("/admin-delete-token").post(formCtrl.admindeletetokens);
router.route("/admin-star-token").post(formCtrl.adminstartokens);


router.route("/pool-add").post(poolCtrl.pooladd);
router.route("/pool-update").post(poolCtrl.poolupdate);
router.route("/Pool-data").post(poolCtrl.Pooldata);
router.route("/pool-delete").post(poolCtrl.pooldelete);

router.route("/update-APY").post(settingCtrl.updateapy);
router.route("/get-APY").get(settingCtrl.getapy);
router.route("/get-site-template").get(settingCtrl.gettemplate);
router.route("/update-site-template").post(settingCtrl.settemplate);
router.route("/get-settings").post(authVerify,settingCtrl.getsettings);
router.route("/update-settings").post(settingCtrl.updatesettings);
router.route("/site-social-url").post(settingCtrl.sitesocialurl);
router.route("/get-social-url").get(settingCtrl.getsocialurl);
router.route("/get-news-letter-subscriber").get(settingCtrl.getnewslettersubscriber);
router.route("/send-news-letter").post(settingCtrl.sendnewsletter);
router.route("/forgot-password").post(settingCtrl.forgotpassword);
router.route("/verify-url").post(settingCtrl.verifyurl);
router.route("/reset-password").post(settingCtrl.resetpassword);

router.route("/add-currency").get(currencyCtrl.getCurrency).post(upload_currency,currencyCtrl.addCurrency).put(upload_currency,currencyCtrl.updateCurrency);
router.route("/get-currency").get(p2pCtrl.getCurrencyList)
router.route("/p2p-pair").post(p2pCtrl.addPair).get(p2pCtrl.getP2pPair).put(p2pCtrl.UpdatePair)
export default router;
