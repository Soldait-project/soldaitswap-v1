import express from "express";
import jwt from 'jsonwebtoken'
import config from '../config/config'
import DB from "../commonQuery/commonQuery"
const router = express();

import * as userCtrl from "../controllers/front/userController";
import * as tokenCtrl from "../controllers/front/tokenController";
import * as farmsCtrl from "../controllers/front/farmspoolsController";
import * as liqutityCtrl from "../controllers/front/liqutitycontroller";
import * as swapCtrl from "../controllers/front/swapcontroller";
import * as siteCtrl from "../controllers/front/siteController"

const authVerify = async (req, res, next) => {

    try {

        var name = config.jwtname;
        var authentication = req.headers.authentication;
        var token = authentication.replace(name, "");
        if (req.headers.authentication && req.headers.authentication != "") {
            var getId = jwt.verify(token, config.Auth_key);
            req.body.loginId = (getId && getId._id) ? getId._id : "";
            let data = { _id: getId._id };
            let checkUser = await DB.AsyncfindOne('users', data, {});
            if (!checkUser) {
                return res.status(400).json({ 'responseCode': 400, 'responseMessage': "User Not found" })
            }
            next();
        } else {
            next();
        }
    } catch (err) {
        return res.status(400).json({
            'responseCode': 400,
            responseMessage: "authorization required.",
        });
    }
}

router.route("/save-users").post(userCtrl.saveUsers);
router.route("/check-users").post(userCtrl.checkUsers);
router.route("/token-list").get(tokenCtrl.getTokens);
router.route("/add-token").post(tokenCtrl.addToken);
router.route("/get-currency-list").post(tokenCtrl.getCurrencyList);
router.route("/all-token-list").get(tokenCtrl.allTokenList);

router.route("/get-settings").get(userCtrl.getsettings);
router.route("/site-template").get(siteCtrl.gettemplate);

router.route("/add-liqutity").post(liqutityCtrl.addLiqutity);
router.route("/remove-liqutity").post(liqutityCtrl.removeLiqutity);
router.route("/liqutity-history").get(liqutityCtrl.liqutityHistory);
router.route("/recent-liqutity-history").get(liqutityCtrl.recentLiqutityHistory);

router.route("/get-forms").post(farmsCtrl.getFarms);
router.route("/get-pools").post(farmsCtrl.getPools);

router.route("/add-swap").post(swapCtrl.addSwap);
router.route("/swap-history").get(swapCtrl.swapHistory);
router.route("/recent-swap-history").get(swapCtrl.recentSwapHistory);
router.route("/swap-history-chart").get(swapCtrl.swapHistoryChart);


export default router;
