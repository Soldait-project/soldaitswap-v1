import e from "express";
import fs from "fs";
import path from "path";
import bcrypt from 'bcrypt';
import mongoose, { now } from "mongoose";
import cron from "node-cron";
import Web3 from "web3";
import settingDB from "../models/setting";
import FAQ from "../models/faq";
import Token from "../models/tokenMinted";
import ABI from "../ABI/ABI.json";
import config from "../config/config";
import Admin from '../models/admin';
import whitelist from '../models/whitelist';
import TokenMinted from "../models/tokenMinted";
import SupportTicket from '../models/support';
import sendmail from "./sendmail";
import user from "../models/user";
import gameapi from "../models/game-api-logs";
const jwt = require('jsonwebtoken');




const ObjectId = mongoose.Types.ObjectId;

export const userLogin = async (req, res) => {
  try {
    // let reqBody =JSON.parse(JSON.stringify(req.body))
    let reqBody = req.body, checkUser;
    let web3 = new Web3(config.dataseed);
    let address = await web3.utils.toChecksumAddress(reqBody.address);

    var newcommer;
    checkUser = await user.findOne({ "address": address });
    console.log(checkUser)
    if (!checkUser) {
      const salt = bcrypt.genSaltSync(config.saltRounds);
      const hash = bcrypt.hashSync(reqBody.password, salt);
      console.log(hash, "hash")
      const newuser = new user({
        address: reqBody.address,
        email: reqBody.email,
        password: hash,
      });
      newcommer = await newuser.save();
    }
    if (!newcommer) {
      console.log(checkUser.email == reqBody.email,checkUser.email , reqBody.email)
      if (!(checkUser.email == reqBody.email)) {
        return res.status(400).json({ "responseCode": 400, "success": false, 'errors': { "email": "Wrong Email ID please enter This metamask address Email" } })
      }
      let checkemail = await user.findOne({ "email": reqBody.email });
      if (!checkemail) {
        return res.status(400).json({ "responseCode": 400, "success": false, 'errors': { "email": "Invalid Email" } })
      }
      var passwordStatus = bcrypt.compareSync(reqBody.password, checkUser.password);
      if (!passwordStatus) {
        return res.status(400).json({ "responseCode": 400, "success": false, 'errors': { "password": "Invalid Password" } })
      }
    } else {
      checkUser = newcommer;
    }

    let payload = {
      "_id": checkUser._id
    }
    var token = await jwt.sign(
      payload,
      config.secretOrKey);
    var tokenName = "Operon-" + token;

    console.log(token, 'token')
    let result = {
      '_id': checkUser._id,
      'email': checkUser.email,
      'name': checkUser.name
    }

    return res.status(200).json({ 'responseCode': 200, 'responseMessage': "Login successfully", tokenName, result })
  }
  catch (err) {
    console.log(err, 'eeeeeeeeerrr')
    return res.status(500).json({ 'responseCode': 500, "success": false, 'errors': { 'messages': "Error on server" } })
  }
}

export const userRegister = async (req, res) => {
  try {
    let reqBody = req.body;
    reqBody.email = reqBody.email.toLowerCase();
    var checkUser = await user.findOne({ "email": reqBody.email });
    if (checkUser) {
      return res.status(400).json({ "success": false, 'errors': { 'email': "Email Already found" } })
    }
    const newuser = new user({
      address: reqBody.address,
      email: reqBody.email,
      password: reqBody.password,
    });
    newuser.save(function (err, data) {
      if (err) {
        return res.status(200).json({
          message: "some error occurred on DB",
        });
      } else {
        return res.status(200).json({
          message: "New user created successfully",
        });
      }
    }
    )
  }
  catch (err) {
    return res.status(400).json({
      message: "some error on server",
    });

  }

}


export const getusers = async (req, res) => {
  try {

    var data = await user.aggregate([
      {
        $project: {
          _id: 1,
          address: 1,
          email: 1,
          card: 1,
        },
      },
    ]);
    return res.status(200).json({ 'responseCode': 200, 'responseMessage': "success", data })
  }
  catch (err) {
    return res.status(400).json({
      'responseCode': 400,
      'responseMessage': "some error on server",
    });

  }

}

export const getuserById = async (req, res) => {
  try {
    console.log(req.query.id, 'id');
    let reqquery = req.body.loginId;
    let checkUser = await user.findOne({ "_id": ObjectId(reqquery) });
    if (!checkUser) {
      return res.status(200).json({ 'responseCode': 200, 'responseMessage': "Not found any user" })
    }
    return res.status(200).json({ 'responseCode': 200, 'responseMessage': "success", checkUser })
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({
      'responseCode': 400,
      'responseMessage': "some error on server",
    });

  }

}

export const addrewards = async (req, res) => {
  try {
    let reqBody = req.body;
    let newuser = new gameapi({
      userId: reqBody.loginId,
      zoro_coins: reqBody.zoro_coins,
      nft_card_id: reqBody.nft_card_id,
    });
    newuser.save();
    let checkUser = await user.findOneAndUpdate({ "_id": ObjectId(reqBody.loginId) }, { "zoro_coins": reqBody.zoro_coins, "nft_card_id": reqBody.nft_card_id }, { new: true });
    return res.status(200).json({
      'responseCode': 200,
      'responseMessage': "success",
    });
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "some error on server",
    });

  }

}

export const consumeEnergy = async (req, res) => {
  try {
    let reqBody = req.body;
    console.log(reqBody, 'reqBody');
    let newuser = new gameapi({
      userId: reqBody.loginId,
      energy_count: reqBody.energy_count,
    });
    newuser.save();
    let checkUser = await user.findOneAndUpdate({ "_id": ObjectId(reqBody.loginId) }, { "energy_count": reqBody.energy_count }, { new: true });
    return res.status(200).json({
      'responseCode': 200,
      'responseMessage': "success",
    });
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "some error on server",
    });

  }

}

export const gamedeatails = async (req, res) => {
  try {
    let reqBody = req.body;
    console.log(reqBody, 'reqBody');
    let User = await user.aggregate([
      { $match: { "_id": ObjectId(reqBody.loginId) } },
      {
        $project: {
          _id: 1,
          email: 1,
          address: 1,
          nft_card_id: 1,
          zoro_coins: 1,
          energy_count: 1,
          card: 1,
        },
      },
    ]);
    console.log(User, "UserUser");
    let nft = await TokenMinted.aggregate([
      { $match: { userId: User[0].address, qty: { $gt: 0 } } },
      {
        $project: {
          _id: 1,
          name: 1,
          rarity: 1,
          affnity: 1,
          attack: 1,
          defence: 1,
          health: 1,
          imageDataUrl: 1,
          qty: 1,
        },
      },
    ]);
    return res.status(200).json({
      'responseCode': 200,
      'responseMessage': "success",
      "responseData": {
        "NFT_Details": nft ? nft : [],
        // "nft_card_id": User[0].nft_card_id,
        // "zoro_coins": User[0].zoro_coins,
        // "energy_count": User[0].energy_count,
        "user_details": User[0],
      }
    });
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "some error on server",
    });

  }

}

export const getUsernft = async (req, res) => {
  try {
    console.log(req.body.loginId, 'id');
    let reqquery = req.body.loginId;
    let checkUser = await user.findOne({ "_id": ObjectId(reqquery) });
    console.log(checkUser.address, 'address')
    if (!checkUser) {
      return res.status(400).json({ 'responseCode': 400, 'responseMessage': "Not found any user" })
    }
    let result = await TokenMinted.aggregate([
      { $match: { userId: checkUser.address, qty: { $gt: 0 } } },
      {
        $project: {
          _id: 1,
          name: 1,
          descp: 1,
          properties: 1,
          cat: 1,
          qty: 1,
          rarity: 1,
          affnity: 1,
          attack: 1,
          defence: 1,
          health: 1,
          tokenId: 1,
          jsonDataUrl: 1,
          imageDataUrl: 1,
          userId: 1,
          originalowner: 1,
          mintedQty: 1,
          status: 1,
          price: 1,
          createdAt: 1,
        }
      },
    ]);
    var nft = result ? result : [];
    return res.status(200).json({ 'responseCode': 200, 'responseMessage': "success", 'nft': nft })
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({
      'responseCode': 400,
      'responseMessage': "some error on server",
    });

  }

}

export const getallnfts = async (req, res) => {
  try {
    console.log(req.body.loginId, 'id');
    let reqquery = req.body.loginId;
    let checkUser = await user.findOne({ "_id": ObjectId(reqquery) });
    if (!checkUser) {
      return res.status(400).json({ 'responseCode': 400, 'responseMessage': "Not found any user" })
    }
    // let nft = await TokenMinted.find({});
    let nft = await TokenMinted.aggregate([
      { $match: { qty: { $gt: 0 } } },
      {
        $project: {
          _id: 1,
          name: 1,
          descp: 1,
          properties: 1,
          cat: 1,
          qty: 1,
          rarity: 1,
          affnity: 1,
          attack: 1,
          defence: 1,
          health: 1,
          tokenId: 1,
          jsonDataUrl: 1,
          imageDataUrl: 1,
          userId: 1,
          originalowner: 1,
          mintedQty: 1,
          status: 1,
          price: 1,
          createdAt: 1,
        }
      },
    ]);
    return res.status(200).json({ 'responseCode': 200, 'responseMessage': "success", nft })
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({
      'responseCode': 400,
      'responseMessage': "some error on server",
    });

  }

}