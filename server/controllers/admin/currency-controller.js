import { ObjectId } from "mongodb"
import db from '../../commonQuery/commonQuery'
import isEmpty from "is-empty"
export const addCurrency=(async (req, res) => {

    try {
        let reqBody = req.body,
        reqFile = req.files;
        var exits = await db.AsyncfindOne('currency', { currencySymbol: reqBody.currencySymbol }, {});
        console.log(exits,'exits')
        if (exits) {
            return res.status(400).json({
                success: false,
                errors: { currencySymbol: "Currency symbol already exists" },
              });
        } else {
            console.log(req.body,'rrr')
            console.log(reqFile[0].filename,'reqFil')
            if (reqBody.currencytype == "crypto") {
            var saveData = {
                currencyName: reqBody.currencyName,
                currencySymbol: reqBody.currencySymbol,
                currencyimage: reqFile[0].filename,
                WithdrawFee: reqBody.WithdrawFee,
                MinimumWithdraw: reqBody.MinimumWithdraw,
                currencytype: reqBody.currencytype,
            }
            var data = await db.AsyncInsert('currency', saveData);
            return res.status(200).json({ success: true,message: 'Crypto Currency added successfully. Refreshing data...' })
        }

        else if (reqBody.currencytype == "token") {
            var saveData = {
              currencyName: reqBody.currencyName,
              currencySymbol: reqBody.currencySymbol,
              contractAddress: reqBody.contractAddress,
              minAbi: reqBody.minAbi,
              decimals: reqBody.decimals,
              currencyimage: reqFile[0].filename,
              WithdrawFee: reqBody.WithdrawFee,
              MinimumWithdraw: reqBody.MinimumWithdraw,
              currencytype: reqBody.currencytype,
              tokenType: reqBody.tokenType,
            };
      
            await db.AsyncInsert('currency', saveData);
            
            return res
              .status(200)
              .json({ success: true, message: "Token currency added successfully" });
          }
          else if (reqBody.currencytype == "fiat") {
            var saveData = {
              currencyName: reqBody.currencyName,
              currencySymbol: reqBody.currencySymbol,
              currencyimage: reqFile[0].filename,
              "bankDetails.bankName": reqBody.bankName,
              "bankDetails.accountNo": reqBody.accountNo,
              "bankDetails.holderName": reqBody.holderName,
              "bankDetails.bankcode": reqBody.bankcode,
              "bankDetails.country": reqBody.country,
              WithdrawFee: reqBody.WithdrawFee,
              MinimumWithdraw: reqBody.MinimumWithdraw,
              currencytype: reqBody.currencytype,
            }
            var data = await db.AsyncInsert('currency', saveData);
           
            return res
              .status(200)
              .json({ success: true, message: "Fiat Currency added successfully" });
          }
    }

    } catch (err) {
        console.log(err,'errr')
        res.send({ status: 400 });
    }
});
export const getCurrency = (async (req, res) => {

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
      const result = await db.AsyncAggregation('currency', query);
      const count = await db.AsynccountDocuments('currency', countquery);

      res.send({ status: 200, 'result': result, 'totalrecords': count });

  } catch (err) {
      res.send({ status: 400, 'result': [], 'totalrecords': 0 });
  }
});
export const updateCurrency = async (req, res) => {
    try {
      let reqBody = req.body;
      let reqFile = req.files;
      console.log(reqBody,'reqBody')
      let checkCurrency = await db.AsyncfindOne('currency', { currencySymbol: reqBody.currencySymbol ,_id: { $ne: reqBody.currencyId } }, {});
      if (checkCurrency) {
        return res.status(400).json({ success: false, errors: { currencySymbol: "Currency symbol already exists" } });
      }
      let currencyType, currencySymbol;

      const _id = ObjectId(reqBody.currencyId);
                var cond = {
                    _id: _id
                }
                
    if (reqBody.currencytype == "crypto") {
        let currencyDoc = await db.AsyncfindOne('currency',cond, {});
        if(currencyDoc){
   var update={
    currencyName: reqBody.currencyName,
    currencySymbol: reqBody.currencySymbol,
    currencyimage: (reqFile && reqFile[0] &&reqFile[0].filename!=undefined) ? reqFile[0].filename: reqBody.currencyimage,
    WithdrawFee: reqBody.WithdrawFee,
    MinimumWithdraw: reqBody.MinimumWithdraw,
    currencytype: reqBody.currencytype,
    status: reqBody.status,
   }
await db.AsyncfindOneAndUpdate('currency', cond, update, { new: true });
return res.status(200).json({ success: true,message: 'Crypto Currency updated successfully. Refreshing data...' })

        }
      currencySymbol = currencyDoc.currencySymbol;
      currencyType = currencyDoc.type;
      }

      if(reqBody.currencytype == "token"){
        let currencyDoc = await db.AsyncfindOne('currency',cond, {});
        if(currencyDoc){
   var update={
    currencyName: reqBody.currencyName,
    currencySymbol: reqBody.currencySymbol,
    currencyimage: (reqFile && reqFile[0] &&reqFile[0].filename!=undefined) ? reqFile[0].filename: reqBody.currencyimage,
    WithdrawFee: reqBody.WithdrawFee,
    MinimumWithdraw: reqBody.MinimumWithdraw,
    currencytype: reqBody.currencytype,
    tokenType: reqBody.tokenType,
    contractAddress: reqBody.contractAddress,
    minAbi: reqBody.minAbi,
    decimals: reqBody.decimals,
    status: reqBody.status,
   }
await db.AsyncfindOneAndUpdate('currency', cond, update, { new: true });
return res.status(200).json({ success: true,message: 'Token Currency updated successfully. Refreshing data...' })

        }
      currencySymbol = currencyDoc.currencySymbol;
      currencyType = currencyDoc.type;
      }
      if(reqBody.currencytype == "fiat"){
        let currencyDoc = await db.AsyncfindOne('currency',cond, {});
        if(currencyDoc){
            var update = {
                currencyName: reqBody.currencyName,
                currencySymbol: reqBody.currencySymbol,
                currencyimage: (reqFile && reqFile[0] &&reqFile[0].filename!=undefined) ? reqFile[0].filename: reqBody.currencyimage,
                "bankDetails.bankName": reqBody.bankName,
                "bankDetails.accountNo": reqBody.accountNo,
                "bankDetails.holderName": reqBody.holderName,
                "bankDetails.bankcode": reqBody.bankcode,
                "bankDetails.country": reqBody.country,
                WithdrawFee: reqBody.WithdrawFee,
                MinimumWithdraw: reqBody.MinimumWithdraw,
                currencytype: reqBody.currencytype,
              }
              await db.AsyncfindOneAndUpdate('currency', cond, update, { new: true });
    return res.status(200).json({ success: true,message: 'Fiat Currency updated successfully. Refreshing data...' })
        }
      }
    }
    catch(err){
        console.log(err,'e')
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}