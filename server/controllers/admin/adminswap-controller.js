
import events from'events';
const eventEmitter = new events.EventEmitter();
import isEmpty from 'is-empty';
import db from'../../commonQuery/commonQuery';
import syncEach from 'sync-each';
import Web3 from"web3";
import fs from'fs';
import config from'../../config/config';
import { ObjectId } from "mongodb"
var {  isAddress } = require('../../validation/validate');
export const adminswaphistory=(async (req, res) => {

  try {

    var limit = 10;
    var skip = 0;
    var cond ={};
    if (req.query.limit && req.query.limit != "") {
      limit = parseInt(req.query.limit);
    }
    if (req.query.skip && req.query.skip != "") {
      var skip = parseInt(req.query.skip);
      skip = (skip - 1) * limit;
    }
    if(req.query.search && req.query.search !=""){
      let searchkeyword = req.query.search;
      cond = {
        useraddress: { '$regex': new RegExp('.*' + searchkeyword + '.*', 'i') }
      };

    }

    var query = [
      { $match: cond },
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
    const result = await db.AsyncAggregation('swapping', query);
   
    
    if(req.query.search && req.query.search !=""){
      var  count = result.length
    }
    else{
      var count = await db.AsynccountDocuments('swapping', {});
    }
    const tokenList = await db.AsyncFind('tokens', {}, {}, {});

    var allList = [];
    for (var s = 0; s < result.length; s++) {

      var index = tokenList.findIndex(val => val && val.address == result[s].fromaddress);
      var index1 = tokenList.findIndex(val => val && val.address == result[s].toaddress);

      var fromamount = result[s].fromamount;
      var toamount = result[s].toamount;
      var fromSym = (index != -1) ? tokenList[index].symbol : "-";
      var fromAmt = (fromamount && fromamount > 0) ? fromamount.toFixed(4) : "0";
      var toSym = (index1 != -1) ? tokenList[index1].symbol : "-";
      var toAmt = (toamount && toamount > 0) ? toamount.toFixed(4) : "0";

      allList.push({
        fromSym,
        fromAmt,
        toSym,
        toAmt,
        txid: result[s].txid,
        useraddress: result[s].useraddress,
        createdAt: result[s].createdAt
      });

    }

    res.send({ status: 200, 'result': allList, 'totalrecords': count });

  } catch (err) {
    res.send({ status: 400, 'result': [], 'totalrecords': 0 });
  }
});


export const adminliqutityhistory =(async (req, res) => {

  try {
    var limit = 10;
    var skip = 0;
    var cond ={};
    if (req.query.limit && req.query.limit != "") {
      limit = parseInt(req.query.limit);
    }
    if (req.query.skip && req.query.skip != "") {
      var skip = parseInt(req.query.skip);
      skip = (skip - 1) * limit;
    }
    if(req.query.search && req.query.search !=""){
      let searchkeyword = req.query.search;
      cond = {
        useraddress: { '$regex': new RegExp('.*' + searchkeyword + '.*', 'i') }
      };
    }

    var query = [
      { $match: cond },
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
    const result = await db.AsyncAggregation('liqutity', query);
   
    if(req.query.search && req.query.search !=""){
      var  count = result.length
    }
    else{
      var count = await db.AsynccountDocuments('liqutity', {});
    }

    const tokenList = await db.AsyncFind('tokens', {}, {}, {});

    var allList = [];
    for (var s = 0; s < result.length; s++) {

      var index = tokenList.findIndex(val => val && val.address == result[s].fromaddress);
      var index1 = tokenList.findIndex(val => val && val.address == result[s].toaddress);

      var fromamount = result[s].fromamount;
      var toamount = result[s].toamount;
      var fromSym = (index != -1) ? tokenList[index].symbol : "-";
      var fromAmt = (fromamount && fromamount > 0) ? fromamount.toFixed(4) : "0";
      var toSym = (index1 != -1) ? tokenList[index1].symbol : "-";
      var toAmt = (toamount && toamount > 0) ? toamount.toFixed(4) : "0";

      allList.push({
        fromSym,
        fromAmt,
        toSym,
        toAmt,
        txid: result[s].txid,
        useraddress: result[s].useraddress,
        createdAt: result[s].createdAt
      });

    }

    res.send({ status: 200, 'result': allList, 'totalrecords': count });

  } catch (err) {
    res.send({ status: 400, 'result': [], 'totalrecords': 0 });
  }
});

export const adminuserslist = (async (req, res) => {
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
    var cond = {};
    if (req.query.search && req.query.search != "" && typeof req.query.search != "undefined"
      && req.query.search != "undefined") {
      var searchkeyword = req.query.search;
      cond = {
        address: { '$regex': new RegExp('.*' + searchkeyword + '.*', 'i') }
      };
    }

    var query = [
      { $match: cond },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          address: 1,
          createdAt: 1,
          status:1,
        }
      }
    ];
    const count = await db.AsynccountDocuments('swapusers', cond);
    const result = await db.AsyncAggregation('swapusers', query);
    res.send({ status: 200, 'result': result, 'totalrecords': count });
  } catch (err) {
    res.send({ status: 400, 'result': [], 'totalrecords': 0 });
  }
});


export const userlistCSVreport = (async (req, res) => {

  console.log(req.query.type, 'querytype')
  var type = req.query.type;
  var today = new Date();
  today.setHours(0, 0, 0, 0)
  var first = today.getDate() - today.getDay();
  var last = first + 6;
  var firstday = new Date(today.setDate(first)).toUTCString();
  var lastday = new Date(today.setDate(last)).toUTCString();
  var firstDayMonth = new Date(today.setDate(1));
  var lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  lastDayMonth.setHours(23, 59, 59, 0);
  today = new Date().setHours(0, 0, 0, 0);


  var cond = {};
  switch (type) {
    case "daily":
      cond = { createdAt: { $gte: today } }
      break;
    case "weekly":
      cond = {
        createdAt: {
          $gte: firstday,
          $lte: lastday
        }
      }
      break;
    case "monthly":
      cond = {
        createdAt:
        {
          $gte: firstDayMonth,
          $lte: lastDayMonth
        }
      }
      break;
    default:
      cond = {}
  }

  var query = [
    { $match: cond },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        _id: 0,
        address: 1,
        createdAt: 1
      }
    }
  ];
  const getData = await db.AsyncAggregation('swapusers', query);
  console.log(getData.length, 'getdata')
  if (getData.length == 0) {
    return res.status(200).send({ 'result': getData });
  } else {
    return res.status(200).send({ 'result': getData });
  }
});

export const suscriberslistCSVreport = (async (req, res) => {

  console.log(req.query.type, 'querytype')
  var type = req.query.type;
  var today = new Date();
  today.setHours(0, 0, 0, 0)
  var first = today.getDate() - today.getDay();
  var last = first + 6;
  var firstday = new Date(today.setDate(first)).toUTCString();
  var lastday = new Date(today.setDate(last)).toUTCString();
  var firstDayMonth = new Date(today.setDate(1));
  var lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  lastDayMonth.setHours(23, 59, 59, 0);
  today = new Date().setHours(0, 0, 0, 0);


  var cond = {};
  switch (type) {
    case "daily":
      cond = { createdAt: { $gte: today }, status: "Live" }
      break;
    case "weekly":
      cond = {
        createdAt: {
          $gte: firstday,
          $lte: lastday,
          status: "Live"
        }
      }
      break;
    case "monthly":
      cond = {
        createdAt:
        {
          $gte: firstDayMonth,
          $lte: lastDayMonth,
          status: "Live"
        }
      }
      break;
    default:
      cond = {status: "Live"}
  }

  var query = [
    { $match: cond },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        _id: 0,
        email: 1,
        createdAt: 1
      }
    }
  ];
  const getData = await db.AsyncAggregation('subscribe', query);
  console.log(getData.length, 'getdata')
  if (getData.length == 0) {
    return res.status(200).send({ 'result': getData });
  } else {
    return res.status(200).send({ 'result': getData });
  }
});

export const SwappingCSVreport = (async (req, res) => {

  console.log(req.query.type, 'querytype')
  var type = req.query.type;
  var today = new Date();
  today.setHours(0, 0, 0, 0)
  var first = today.getDate() - today.getDay();
  var last = first + 6;
  var firstday = new Date(today.setDate(first)).toUTCString();
  var lastday = new Date(today.setDate(last)).toUTCString();
  var firstDayMonth = new Date(today.setDate(1));
  var lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  lastDayMonth.setHours(23, 59, 59, 0);
  today = new Date().setHours(0, 0, 0, 0);


  var cond = {};
  switch (type) {
    case "daily":
      cond = { createdAt: { $gte: today } }
      break;
    case "weekly":
      cond = {
        createdAt: {
          $gte: firstday,
          $lte: lastday
        }
      }
      break;
    case "monthly":
      cond = {
        createdAt:
        {
          $gte: firstDayMonth,
          $lte: lastDayMonth
        }
      }
      break;
    default:
      cond = {}
  }

  var query = [
    { $match:cond },
    { $sort: { createdAt: -1 } },
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
  const result = await db.AsyncAggregation('swapping', query);
    const tokenList = await db.AsyncFind('tokens', {}, {}, {});

    var allList = [];
    for (var s = 0; s < result.length; s++) {

      var index = tokenList.findIndex(val => val && val.address == result[s].fromaddress);
      var index1 = tokenList.findIndex(val => val && val.address == result[s].toaddress);

      var fromamount = result[s].fromamount;
      var toamount = result[s].toamount;
      var fromSym = (index != -1) ? tokenList[index].symbol : "-";
      var fromAmt = (fromamount && fromamount > 0) ? fromamount.toFixed(4) : "0";
      var toSym = (index1 != -1) ? tokenList[index1].symbol : "-";
      var toAmt = (toamount && toamount > 0) ? toamount.toFixed(4) : "0";

      allList.push({
        fromSym,
        fromAmt,
        toSym,
        toAmt,
        txid: result[s].txid,
        useraddress: result[s].useraddress,
        createdAt: result[s].createdAt
      });

    }
  console.log(result.length, 'getdata')
  if (allList.length == 0) {
    return res.status(200).send({ 'result': [] });
  } else {
    return res.status(200).send({ 'result': allList });
  }
});

export const LiqutityCSVreport = (async (req, res) => {

  console.log(req.query.type, 'querytype')
  var type = req.query.type;
  var today = new Date();
  today.setHours(0, 0, 0, 0)
  var first = today.getDate() - today.getDay();
  var last = first + 6;
  var firstday = new Date(today.setDate(first)).toUTCString();
  var lastday = new Date(today.setDate(last)).toUTCString();
  var firstDayMonth = new Date(today.setDate(1));
  var lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  lastDayMonth.setHours(23, 59, 59, 0);
  today = new Date().setHours(0, 0, 0, 0);


  var cond = {};
  switch (type) {
    case "daily":
      cond = { createdAt: { $gte: today } }
      break;
    case "weekly":
      cond = {
        createdAt: {
          $gte: firstday,
          $lte: lastday
        }
      }
      break;
    case "monthly":
      cond = {
        createdAt:
        {
          $gte: firstDayMonth,
          $lte: lastDayMonth
        }
      }
      break;
    default:
      cond = {}
  }

  var query = [
    { $match:cond },
    { $sort: { createdAt: -1 } },
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
  const result = await db.AsyncAggregation('liqutity', query);
    const tokenList = await db.AsyncFind('tokens', {}, {}, {});

    var allList = [];
    for (var s = 0; s < result.length; s++) {

      var index = tokenList.findIndex(val => val && val.address == result[s].fromaddress);
      var index1 = tokenList.findIndex(val => val && val.address == result[s].toaddress);

      var fromamount = result[s].fromamount;
      var toamount = result[s].toamount;
      var fromSym = (index != -1) ? tokenList[index].symbol : "-";
      var fromAmt = (fromamount && fromamount > 0) ? fromamount.toFixed(4) : "0";
      var toSym = (index1 != -1) ? tokenList[index1].symbol : "-";
      var toAmt = (toamount && toamount > 0) ? toamount.toFixed(4) : "0";

      allList.push({
        fromSym,
        fromAmt,
        toSym,
        toAmt,
        txid: result[s].txid,
        useraddress: result[s].useraddress,
        createdAt: result[s].createdAt
      });

    }
  console.log(result.length, 'getdata')
  if (allList.length == 0) {
    return res.status(200).send({ 'result': [] });
  } else {
    return res.status(200).send({ 'result': allList });
  }
});


export const adminLockuser = (async (req, res) => {
  try {
      const _id = ObjectId(req.body._id);
      console.log(_id, 'idddddddddd')
      var cond = {
          _id: _id
      }
      var getstatus = await db.AsyncfindOne('swapusers', cond, {});
      console.log(getstatus,'getstatus')
      var address = await isAddress(getstatus.address);

      var updatestatus = getstatus && getstatus.status == 'active'?'deactive':'active'
    
      if (!address) {
      console.log('ifffffffff')
        return res.status(200).send({ message: 'Invalid address', success: false })
    }
      let update = {
          'status': updatestatus
      };
      var resp = await db.AsyncfindOneAndUpdate('swapusers', cond, update, { new: true });
      console.log(resp, 'dbres')
      return res.status(200).send({ message: 'Lock Status Updated successfully. Refreshing data...', success: true })

  } catch (err) {
      res.send({ status: 400 });
  }
});
