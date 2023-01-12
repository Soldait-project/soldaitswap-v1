
import DB from "../../commonQuery/commonQuery"

export const getFarms = async (req, res) => {

    try {

        var limit = 6;
        var skip = 0;
        var status = "Live"
        if (req.query.limit && req.query.limit != "") {
            limit = parseInt(req.query.limit);
        }
        if (req.query.skip && req.query.skip != "") {
            var skip = parseInt(req.query.skip);
            skip = (skip - 1) * limit;
        }
        if (req.query.status && req.query.status != "") {
            status = req.query.status;
        }

        var query = [
            { $match: { isTokenOnly: false, status: (status == "Live") ? 1 : 0 } },
            { $sort: { updated_time: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    _id: 1,
                    risk: 1,
                    pid: 1,
                    alloc: 1,
                    lpAddresses: 1,
                    lpSymbol: 1,
                    isTokenOnly: 1,
                    tokenSymbol: 1,
                    tokenAddresses: 1,
                    quoteTokenSymbol: 1,
                    quoteTokenAdresses: 1,
                    depositFee: 1,
                    logoURI: 1,
                    updated_time: 1,
                    lpSymbol: 1,
                    status: 1,
                }
            }
        ];

        const result = await DB.AsyncAggregation('forms', query);

        res.send({ status: 200, 'list': result });

    } catch (err) {
        return res.status(200).json({ status: true, 'list': [] })
    }

};

export const getPools = async (req, res) => {

    try {

        // var limit = 10;
        var limit = 6;
        var skip = 0;
        var status = "Live";
        if (req.query.limit && req.query.limit != "") {
            limit = parseInt(req.query.limit);
        }
        if (req.query.skip && req.query.skip != "") {
            var skip = parseInt(req.query.skip);
            skip = (skip - 1) * limit;
        }
        if (req.query.status && req.query.status != "") {
            status = req.query.status;
        }

        var query = [
            { $match: { isTokenOnly: true, status: status } },
            { $sort: { updated_time: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    _id: 1,
                    risk: 1,
                    pid: 1,
                    alloc: 1,
                    lpAddresses: 1,
                    lpSymbol: 1,
                    isTokenOnly: 1,
                    tokenSymbol: 1,
                    tokenAddresses: 1,
                    quoteTokenSymbol: 1,
                    quoteTokenAdresses: 1,
                    depositFee: 1,
                    logoURI: 1,
                    updated_time: 1,
                    lpSymbol: 1,
                    status: 1,
                }
            }
        ];
        const result = await DB.AsyncAggregation('forms', query);

        res.send({ status: 200, 'list': result });

    } catch (err) {
        res.send({ status: 400, 'list': [] });
    }

};

