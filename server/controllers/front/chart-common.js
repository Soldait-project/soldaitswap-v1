function getCondition(period) {

    var cond = {};

    if (period == 30 || period == 7) {

        cond = {
            "createdAt": {
                "$gte": new Date(new Date() - period * 60 * 60 * 24 * 1000)
            }
        }
    }
    if (period == 365) {

        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var start = new Date(year, 0, 1);
        start.setHours(0, 0, 0, 0);
        var end = new Date(year, 12, 31);
        // cond = {
        //     createdAt: { $gte: start, $lt: end },
        // }
        cond = {
            "createdAt": {
                "$gte": start
            }
        }

    }
    if (period == 24) {//24 hrs

        var start = new Date();
        start.setHours(0, 0, 0, 0);
        //start.setHours(start.getHours() + 5);
        //start.setMinutes(start.getMinutes() + 30);

        var end = new Date();
        //end.setHours(end.getHours() + 5);
        //end.setMinutes(end.getMinutes() + 30);
        end.setHours(23, 59, 59, 999);


        cond = {
            createdAt: { $gte: start, $lte: end }
        }
    }
    return cond;

}
function getgroupBy(period) {

    var pushQuery = {};

    if (period == 30) {
        pushQuery = {
            $group: {
                _id: {
                    day: { $dayOfMonth: "$createdAt" },
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                },
                createdAt: { $first: "$createdAt" },
                toamount: { $sum: "$toamount" }
            },
        };
    }

    if (period == 365) {
        pushQuery = {
            $group: {
                _id: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                },
                createdAt: { $first: "$createdAt" },
                toamount: { $sum: "$toamount" }
            },
        };
    }

    if (period == 7) {
        pushQuery = {
            $group: {
                _id: {
                    month: { $month: "$createdAt" },
                    week: { $week: "$createdAt" },
                    year: { $year: "$createdAt" },
                    day: { $dayOfMonth: "$createdAt" },
                },
                createdAt: { $first: "$createdAt" },
                toamount: { $sum: "$toamount" }
            },
        };
    }

    if (period == 24) {//24 hrs
        pushQuery = {
            $group: {
                _id: {
                    year: { "$year": "$createdAt" },
                    dayOfYear: { "$dayOfYear": "$createdAt" },
                    hour: { "$hour": "$createdAt" },
                    interval: {
                        $subtract: [
                            { "$minute": "$createdAt" },
                            { "$mod": [{ "$minute": "$createdAt" }, 30] }
                        ]
                    }
                },
                createdAt: { $first: "$createdAt" },
                toamount: { "$sum": "$toamount" },
                Hour: { $first: "$Hour" },
                Minute: { $first: "$Minute" },

            }
        };
    }

    return pushQuery;
}

function getCondition1(period) {

    var cond = {};

    if (period == 30 || period == 7) {
        var period1 = parseFloat(period) * 2
        cond = {
            "createdAt": {
                "$gte": new Date(new Date() - period1 * 60 * 60 * 24 * 1000)
            }
        }
    }
    if (period == 365) {

        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var last = parseFloat(year) - 1;
        var start = new Date(last, 1, 1);
        var end = new Date(last, 12, 31);
        cond = {
            createdAt: { $gte: start, $lt: end },
        }

    }
    if (period == 24) {//24 hrs
        cond = {
            "createdAt": {
                "$gte": new Date(new Date() - 2 * 60 * 60 * 24 * 1000)
            }
        }
    }
    return cond;

}

function getgroupBy1(period) {

    var pushQuery = {};

    if (period == 30) {
        pushQuery = {
            $group: {
                _id: {
                    day: { $dayOfMonth: "$createdAt" },
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                },
                createdAt: { $first: "$createdAt" },
                lpamount: { $sum: "$lpamount" },
                avglpamount: { $avg: "$lpamount" }
            },
        };
    }

    if (period == 365) {
        pushQuery = {
            $group: {
                _id: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                },
                createdAt: { $first: "$createdAt" },
                lpamount: { $sum: "$lpamount" },
                avglpamount: { $avg: "$lpamount" }
            },
        };
    }

    if (period == 7) {
        pushQuery = {
            $group: {
                _id: {
                    month: { $month: "$createdAt" },
                    week: { $week: "$createdAt" },
                    year: { $year: "$createdAt" },
                    day: { $dayOfMonth: "$createdAt" },
                },
                createdAt: { $first: "$createdAt" },
                lpamount: { $sum: "$lpamount" },
                avglpamount: { $avg: "$lpamount" }
            },
        };
    }

    if (period == 24) {

        pushQuery = {
            $group: {
                _id: {
                    year: { "$year": "$createdAt" },
                    dayOfYear: { "$dayOfYear": "$createdAt" },
                    hour: { "$hour": "$createdAt" },
                    interval: {
                        $subtract: [
                            { "$minute": "$createdAt" },
                            { "$mod": [{ "$minute": "$createdAt" }, 30] }
                        ]
                    }
                },
                lpamount: { "$sum": "$lpamount" },

            }
        };
    }

    return pushQuery;
}

module.exports =
{
    getCondition,
    getgroupBy,
    getCondition1,
    getgroupBy1
}