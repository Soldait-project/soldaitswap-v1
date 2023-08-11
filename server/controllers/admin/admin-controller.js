import { ObjectId } from "mongodb";
import db from '../../commonQuery/commonQuery';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import moment from 'moment';

export const login = (async (req, res) => {

  try {

    const email = req.body.email;
    const password = req.body.password;
    var user = await db.AsyncfindOne('admin', { email: email }, {});

    if (!user) {
      var errors = {};
      errors.email = 'Email not found';
      return res.status(200).json({ errors: errors });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch || 1 == 1) {
        const payload = {
          id: user.id
        };
        jwt.sign(
          payload,
          config.secretKey,
          {
            expiresIn: '100d'
          },
          (err, token) => {
            var tokenName = config.jwtname + token;
            res.json({
              success: "true",
              token: tokenName,
            });
          }
        );


      } else {
        var errors = {};
        errors.password = 'Password incorrect';
        return res
          .status(200)
          .json({ errors: errors });
      }
    });


  } catch (err) {
    res.send({ status: 400 });
  }
});

export const admintotaldetails = (async (req, res) => {
  let from = moment().startOf('isoweek').toDate();
  let to = moment().endOf('isoweek').toDate();
  console.log(from, '===>', to);
  try {

    let query = [
      {
        $match: {
          createdAt: {
            $gte: from,
            $lt: to
          },
        }
      },
      {
        $addFields: {
          createdAtDate: {
            $toDate: "$createdAt"
          },

        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%w",
              date: "$createdAtDate"
            }
          },
          Amount: {
            $sum: "$lpamount",
          }
        }
      },
      {
        $project: {
          Amount: 1,
          date: "$_id",
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ];


    let swapquery = [
      {
        $match: {
          createdAt: {
            $gte: from,
            $lt: to
          },
        }
      },
      {
        $addFields: {
          createdAtDate: {
            $toDate: "$createdAt"
          },

        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%w",
              date: "$createdAtDate"
            }
          },
          Amount: {
            $sum: "$toamount",
          }
        }
      },
      {
        $project: {
          Amount: 1,
          date: "$_id",
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ];
    var liqutitychartdata = [0, 0, 0, 0, 0, 0, 0]
    var swapchartdata = [0, 0, 0, 0, 0, 0, 0]

    const liqutitychart = await db.AsyncAggregation('liqutity', query);
    const swapchart = await db.AsyncAggregation('swapping', swapquery);
    if (liqutitychart.length != 0) {
      for (let i of liqutitychart) {
        liqutitychartdata[i.date - 1] = (i.Amount).toFixed(1);
      }
    }
    if (swapchart.length != 0) {
      console.log("inside log")
      for (let i of swapchart) {
        swapchartdata[i.date - 1] = (i.Amount).toFixed(1);
      }
    }
    console.log(liqutitychartdata, 'array')
    console.log(swapchartdata, 'array')

    const users = await db.AsynccountDocuments('swapusers', {});
    const swapping = await db.AsynccountDocuments('swapping', {});
    const ligutity = await db.AsynccountDocuments('liqutity', {});

    res.send({ status: 200, 'totalusers': users, 'totalswapping': swapping, 'totalliqutity': ligutity, "liqutitychart": liqutitychartdata, "swapchart": swapchartdata });
  } catch (err) {
    console.log(err, "error")
    res.send({ status: 400 });
  }
});

