import moment from 'moment';

export function getWeeksMonth(period) {
    period = parseFloat(period);
    var dates = new Date(new Date() - period * 60 * 60 * 24 * 1000);
    var weeksMonthArray = [];
    for (var i = 1; i <= period; i++) {
        var date = new Date(dates);
        date.setDate(date.getDate() + i);
        var d = new Date(date);
        var month = (d.getMonth() + 1);
        var day = d.getDate();
        var year = d.getFullYear();
        day = (day < 10) ? '0' + day : day
        month = (month < 10) ? '0' + month : month
        var dateFormat = year + "-" + month + "-" + day;
        weeksMonthArray.push(dateFormat);
    }
    return weeksMonthArray;
}

export function getWeekMonthData(categories, series) {

    var seriesList = [];
    var categoryList = [];
    for (let i = 0; i < categories.length; i++) {
        if (categories && categories[i]) {
            var index = series.findIndex(val => val.date === categories[i]);
            if (index !== -1) {
                var amt = (series[index].toamount > 0) ? series[index].toamount.toFixed(4) : 0
                seriesList.push(amt);
            } else {
                seriesList.push(0);
            }
            var dateFormat = moment(categories[i]).format('MMM DD');
            categoryList.push(dateFormat)
        }


    }
    return {
        categories1: categoryList,
        series1: seriesList
    }

}


export function getYearChart() {

    // var d = new Date();
    //var month = d.getMonth();
    //var currMonth = parseInt(month) + parseInt(1);
    var MonthArray = [];

    // for (var i = currMonth + 1; i <= 12; i++) {
    //     let m = (i <= 9) ? '0' + i : i
    //     MonthArray.push(m);
    // }

    for (var j = 1; j <= 12; j++) {
        let m = (j <= 9) ? '0' + j : j.toString()
        MonthArray.push(m);
    }

    return MonthArray;
}

export function getYearData(categories, series) {

    var seriesList = [];
    var categoryList = [];
    var currd = new Date();
    var month = currd.getMonth();
    var currMonth = parseInt(month) + parseInt(1);
    for (let i = 0; i < categories.length; i++) {
        var index = series.findIndex(val => val.date === categories[i]);
        if (index !== -1) {
            var amt = (series[index].toamount > 0) ? series[index].toamount.toFixed(2) : 0
            seriesList.push(amt);
        } else {
            if (parseInt(categories[i]) <= currMonth) {
                seriesList.push(0);
            } else {
                seriesList.push(0);
            }

        }
        var d = new Date();
        var year = d.getFullYear();
        var date = year + "-" + categories[i] + "-" + +"01";
        date = new Date(date);
        var dateFormat = moment(date).format('MMM');
        categoryList.push(dateFormat);
    }

    return {
        categories2: categoryList,
        series2: seriesList
    }
}

export function getDayChart(period) {

    period = parseFloat(period);
    var daysArray = [];
    for (var i = 1; i <= 23; i++) {
        var minutes = 30;
        var hr = (i <= 9) ? 0 + "" + i : i;
        var hr1 = (i <= 9) ? 0 + "" + i : i;
        var hrmin = hr + ":" + minutes;
        daysArray.push(hr1);
        daysArray.push(hrmin);
    }

    return daysArray;
}

export function getDayData(categories, series) {

    var displayDays = [];
    for (var i = 0; i < categories.length; i++) {
        var timeVal = categories[i].toString();
        var splitTime = timeVal.split(":");

        if (splitTime.length === 1) {
            let hr = parseFloat(splitTime[0]);
            let index = series.findIndex(val => (val && val.Hour) === hr);
            if (index !== -1) {
                var amount = (series[index] && series[index].toamount && series[index].toamount > 0) ? series[index].toamount.toFixed(2) : 0
                displayDays.push(amount);
            } else {
                displayDays.push(0);
            }
        } else if (splitTime.length === 2) {

            let hr = parseFloat(splitTime[0]);
            let min = parseFloat(splitTime[1]);
            let index = series.findIndex(val =>
                (val && val.interval && val.Hour === hr) &&
                (val && val.interval && val.Minute === min)
            );
            if (index !== -1) {
                let amount = (series[index] && series[index].toamount && series[index].toamount > 0) ? series[index].toamount.toFixed(2) : 0
                displayDays.push(amount);
            } else {
                displayDays.push(0);
            }

        }

    }

    return {
        categories3: categories,
        series3: displayDays
    }
}


export function getreferalMonthData(categories, series) {

    var seriesList = [];
    var categoryList = [];

    for (let i = 0; i < categories.length; i++) {
        var index = series.findIndex(val => val.date === categories[i]);
        if (index !== -1) {
            var amt = (series[index].amount > 0) ? series[index].amount.toFixed(2) : 0
            seriesList.push(amt);
        } else {
            seriesList.push(0);
        }
        var dateFormat = moment(categories[i]).format('MMM DD');
        categoryList.push(dateFormat)

    }
    return {
        categories: categoryList,
        series: seriesList
    }

}

export function getBinanceData(list) {

    var seriesList = [];
    var categoryList = [];
    for (var i = 0; i < list.length; i++) {
        seriesList.push(list[i].tvl);
        var dateFormat = moment(list[i].showDate).format('MMM DD');
        categoryList.push(dateFormat)

    }
    return {
        categories: categoryList,
        series: seriesList
    }

}
