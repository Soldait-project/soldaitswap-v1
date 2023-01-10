import { ObjectId } from "mongodb"
import db from '../../commonQuery/commonQuery'

export const getCurrencyList = (async (req, res) => {

    try {
        const result = await db.AsyncFind('currency', {}, {}, {});
        res.send({ status: 200, 'result': result });
  
    } catch (err) {
        res.send({ status: 400, 'result': []});
    }
  });
  
  export const addPair = (async (req, res) => {

    try {
        let reqBody = req.body
        console.log(reqBody,'reqBody')

        let firstCurrencyData = await db.AsyncfindOne('currency', { currencySymbol: reqBody.firstCurrency }, {})
    if (!firstCurrencyData) {
      return res.status(400).json({ success: false, errors: { firstCurrency: "Invalid currency" } });
    } else if (firstCurrencyData.status!="active" && reqBody.status=="0") {
      return res.status(400).json({ success: false, message: "Can't activate this pair, base currency doesn't activated" });
    }

    let secondCurrencyData =  await db.AsyncfindOne('currency', { currencySymbol: reqBody.secondCurrency }, {})
    if (!secondCurrencyData) {
      return res.status(400).json({ success: false, errors: { secondCurrency: "Invalid currency" } });
    } else if (secondCurrencyData.status!="active" && reqBody.status=="0") {
      return res.status(400).json({ success: false, message: "Can't activate this pair, quote currency doesn't activated" });
    }
    
    let checkSpotPair =await db.AsyncfindOne('p2ppairs', { first_currency: reqBody.firstCurrency,
        second_currency: reqBody.secondCurrency}, {})
      if (checkSpotPair) {
        return res.status(400).json({
          success: false,
          errors: { firstCurrency: "Currency pair is already exists" },
        });
    }
        var saveData =
        {
            first_currency: reqBody.firstCurrency,
            firstCurrencyId:firstCurrencyData._id,
            status: reqBody.status,
            second_currency: reqBody.secondCurrency,
            secondCurrencyId:secondCurrencyData._id,
            mark_price: reqBody.Markprice,
            index_price: reqBody.markPrice,
            Transactionfee: reqBody.Transactionfee,
            tiker_root: reqBody.firstCurrency + reqBody.secondCurrency,
          }
          var data = await db.AsyncInsert('p2ppairs', saveData);
          console.log(data,'dddddddd')
            return res.status(200).json({ success: true,message: 'P2P Pair added successfully. Refreshing data...' })
     

    } catch (err) {
        console.log(err,'e')
        res.send({ status: 400, 'result': []});
    }
  });
  export const getP2pPair = (async (req, res) => {

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
            
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit }
          
        ];
  
        var countquery ={};
        const result = await db.AsyncAggregation('p2ppairs', query);
        const count = await db.AsynccountDocuments('p2ppairs', countquery);
  
        res.send({ status: 200, 'result': result, 'totalrecords': count });
  
    } catch (err) {
        res.send({ status: 400, 'result': [], 'totalrecords': 0 });
    }
  });
  export const UpdatePair = (async (req, res) => {

    try {
      let reqBody = req.body;
      console.log(reqBody,'updatepairr')
      let firstCurrencyData = await db.AsyncfindOne('currency', { currencySymbol: reqBody.firstCurrency }, {})
      if (!firstCurrencyData) {
        return res.status(400).json({ success: false, errors: { firstCurrencyId: "Invalid currency" } });
      }
      let secondCurrencyData = await db.AsyncfindOne('currency', { currencySymbol: reqBody.secondCurrency }, {})
    if (!secondCurrencyData) {
      return res.status(400).json({ success: false, errors: { secondCurrencyId: "Invalid currency" } });
    }
   
    let checkSpotPair =  await db.AsyncfindOne('p2ppairs', { first_currency: reqBody.firstCurrency, second_currency: reqBody.secondCurrency ,_id: { $ne: reqBody.pairId } }, {});
    if (checkSpotPair) {
      return res.status(400).json({ success: false, errors: { firstCurrencyId: "Currency pair is already exists" } });
    }
    let firstCurrencyActive = await db.AsyncfindOne('currency', { currencySymbol: reqBody.firstCurrency ,status: "active"  }, {})
    if (!firstCurrencyActive && reqBody.status=="0") {
      return res.status(400).json({ success: false, message: "Can't activate this pair, base currency doesn't activated" });
    }
    let secondCurrencyActive = await db.AsyncfindOne('currency', { currencySymbol: reqBody.secondCurrency ,status: "active"  }, {})
    if (!secondCurrencyActive && reqBody.status=="0") {
      return res.status(400).json({ success: false, message: "Can't activate this pair, base currency doesn't activated" });
    }
  
    const _id = ObjectId(reqBody.pairId);
    var cond = {
        _id: _id
    }
    let pairDoc = await db.AsyncfindOne('p2ppairs',cond, {});
    if(pairDoc){
      var updateData =
      {
          first_currency: reqBody.firstCurrency,
          firstCurrencyId:firstCurrencyData._id,
          status: reqBody.status,
          second_currency: reqBody.secondCurrency,
          secondCurrencyId:secondCurrencyData._id,
          mark_price: reqBody.Markprice,
          index_price: reqBody.markPrice,
          Transactionfee: reqBody.Transactionfee,
          tiker_root: reqBody.firstCurrency + reqBody.secondCurrency,
        }
        await db.AsyncfindOneAndUpdate('p2ppairs', cond, updateData, { new: true });
        return res.status(200).json({ success: true,message: 'Pair updated successfully. Refreshing data...' })
    }
    
      
    } catch (err) {
      console.log(err)
        res.send({ status: 400, 'result': []});
    }
  });