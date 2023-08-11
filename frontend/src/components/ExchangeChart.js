import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Button } from "@material-ui/core";
import $ from "jquery";
import {
    swapHistoryChart
} from "../Api/SwapActions";

import {
    getWeeksMonth,
    getWeekMonthData,
    getYearChart,
    getYearData,
    getDayChart,
    getDayData
} from "../helper/chartData";


var currentData = { amount: 0, name: "" }

export default function ExchangeChart(props) {

    const [currentLP, setcurrentLP] = useState({ amount: 0, name: "" });
    const [currentClass, setcurrentClass] = useState(24);
    //const [range, setrange] = useState({ percentage: 0, amount: 0 });
    const [showchart, setshowchart] = useState(false);

    var fromValue = props.fromValue;
    var toValue = props.toValue;

    var fromsymbol = fromValue.symbol;
    var tosymbol = toValue.symbol;

    var pairname = fromsymbol + "-" + tosymbol;

    useEffect(() => {
        loadChart(7);
        //loadMouserOver();
        //eslint-disable-next-line
    }, []);


    const [optionseries, setoptionseries] = useState({
        options: [
            {
                name: pairname,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ], series: [
            {
                name: pairname,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
    });

    function nFormatter(num, digits) {
        var si = [
            { value: 1, symbol: "" },
            { value: 1E3, symbol: "k" },
            { value: 1E6, symbol: "M" },
            { value: 1E9, symbol: "B" },
            { value: 1E12, symbol: "T" },
            { value: 1E15, symbol: "P" },
            { value: 1E18, symbol: "E" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }

    async function loadChart(period) {

        setcurrentClass(period);
        var currentBtn = period;

        var data = `period=${period}&from=${fromValue.address}&to=${toValue.address}`;
        var list = await swapHistoryChart(data);
        var displayList = (list && list.result) ? list.result : [];
        var LastPrice = (list && list.LastPrice) ? list.LastPrice : 0;

        var categories = [];
        var series = [];
        if (period === 7 || period === 30) {
            var weeks = await getWeeksMonth(period);
            var { categories1, series1 } = await getWeekMonthData(weeks, displayList);
            categories = categories1;
            series = series1;
        } else if (period === 365) {
            var years = await getYearChart(period);
            var { categories2, series2 } = await getYearData(years, displayList);
            categories = categories2;
            series = series2;
        } else if (period === 24) {
            var hours = await getDayChart(period);
            var { categories3, series3 } = await getDayData(hours, displayList);
            categories = categories3;
            series = series3;
        }

        var amount = 0;
        if (series && series.length > 0) {
            try {
                var last_element = displayList[displayList.length - 1].toamount;
                amount = (last_element > 0) ? last_element.toFixed(2) : 0;
            } catch (err) {
                amount = 0;
            }
        }

        setcurrentLP({ name: pairname, amount: amount });

        currentData = { name: pairname, amount: amount }

        var opts = {
            chart: {
                id: "basic-bar",
                events: {
                    mouseMove: function (event, chartContext, config) {

                        var dataPointIndex = config.dataPointIndex;
                        var data = (config && config.config && config.config.series
                            && config.config.series[0] && config.config.series[0].data) ? config.config.series[0].data : []

                        if (dataPointIndex > 0) {
                            currentData = { name: currentData.name, amount: data[dataPointIndex] }
                            setcurrentLP({ name: currentLP.name, amount: data[dataPointIndex] })
                        }
                        if (currentBtn === 30) {
                            $('.apexcharts-xaxis-texts-g').addClass("monthgraph");
                        }
                        if (currentBtn === 24) {
                            for (var t = 1; t < 46; t++) {
                                var val = t % 3;
                                if (val !== 0) {
                                }

                                if (
                                    (t === 2 || t === 3 || t === 4) ||
                                    (t === 6 || t === 7 || t === 8) ||
                                    (t === 10 || t === 11 || t === 12) ||
                                    (t === 14 || t === 15 || t === 16) ||
                                    (t === 18 || t === 19 || t === 20) ||
                                    (t === 22 || t === 23 || t === 24) ||
                                    (t === 26 || t === 27 || t === 28) ||
                                    (t === 30 || t === 31 || t === 32) ||
                                    (t === 34 || t === 35 || t === 36) ||
                                    (t === 38 || t === 39 || t === 40) ||
                                    (t === 42 || t === 43 || t === 44 || t === 45)
                                ) {
                                    $(".apexcharts-xaxis-texts-g text:nth-child(" + t + ")").css('display', 'none')
                                }
                            }
                        }
                    },

                },
            },

            xaxis: {
                categories: categories,
                labels: {
                    show: true
                },
                tooltip: {
                    enabled: false,
                    offsetX: 0,
                },
                axisBorder: {
                    show: false
                },
            },
            dataLabels: {
                enabled: false
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return nFormatter(value, 4) + " " + tosymbol;
                    }
                },
                tooltip: {
                    enabled: false,
                    offsetX: 0,
                },
                axisBorder: {
                    show: false
                },
            },

            tooltip: {
                enabled: true,

            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false,
            },
            stroke: {
                colors: ["#5500ff"],
                curve: 'smooth',
            },
            fill: {
                type: 'gradient',
                opacity: 0.3,
                gradient: {
                    shade: 'light',
                    type: "vertical",
                    shadeIntensity: 0.5,
                    gradientToColors: ['#5500ff'],
                    inverseColors: false,
                    opacityTo: 0.5,
                    stops: [0, 90, 100]
                }
            },

        }

        var seriesVal = [{
            name: pairname,
            data: series

        }];


        setoptionseries({ options: opts, series: seriesVal })


        if (period === 30) {
            $('.apexcharts-xaxis-texts-g').addClass("monthgraph");
        }

        if (period === 24) {
            for (var t = 1; t < 46; t++) {
                var val = t % 3;
                if (val !== 0) {
                }

                if (
                    (t === 2 || t === 3 || t === 4) ||
                    (t === 6 || t === 7 || t === 8) ||
                    (t === 10 || t === 11 || t === 12) ||
                    (t === 14 || t === 15 || t === 16) ||
                    (t === 18 || t === 19 || t === 20) ||
                    (t === 22 || t === 23 || t === 24) ||
                    (t === 26 || t === 27 || t === 28) ||
                    (t === 30 || t === 31 || t === 32) ||
                    (t === 34 || t === 35 || t === 36) ||
                    (t === 38 || t === 39 || t === 40) ||
                    (t === 42 || t === 43 || t === 44 || t === 45)
                ) {
                    $(".apexcharts-xaxis-texts-g text:nth-child(" + t + ")").css('display', 'none')
                }
            }
        }
        setshowchart(true);
        calculatePercenatge(amount, LastPrice);

    }

    async function calculatePercenatge(current, last) {
        // var differce = current - last;
        // var percentage = current / last;
        // percentage = percentage.toFixed(2);
        // differce = differce.toFixed(2);

        // percentage = await isNumberCheck(percentage);
        // differce = await isNumberCheck(differce);

        //setrange({ percentage: percentage, amount: differce });

    }

    // async function loadMouserOver() {
    //     $(document).on('mousemove', '.apexcharts-svg', function () {
    //         var amt = parseFloat($('.apexcharts-tooltip-text-y-value').text());
    //         $('#lpamt').html(amt);
    //     });
    // }

    return (
        <div className="whitebox w-100" data-aos="fade-up" data-aos-duration="2000">
            <div className="d-flex align-items-start justify-content-between">
                <div>
                    <div className="exchange_value"><h2 id="lpamt">{currentData.amount}<span>{currentData.name}</span></h2>
                        {/* <p className={(range && range.amount < 0) ? "red_txt" : "green_txt"}>
                            {(range && range.amount < 0) ? range.amount + "(-" + range.percentage + ")" + "%" : range.amount + "(" + range.percentage + ")" + "%"}
                            <i className={(range && range.amount < 0) ? "fas fa-sort-down" : "fas fa-sort-up"}></i></p> */}
                    </div>
                </div>
                <div className="chart_btns">
                    {/* <Button className={(currentClass == 24) ? "active" : ""} onClick={() => { loadChart(24) }}>24 Hours--{showchart}</Button> */}
                    <Button className={(currentClass === 7) ? "active" : ""} onClick={() => { loadChart(7) }}>1 Week</Button>
                    <Button className={(currentClass === 30) ? "active" : ""} onClick={() => { loadChart(30) }}>1 Month</Button>
                    <Button className={(currentClass === 365) ? "active" : ""} onClick={() => { loadChart(365) }}>1 Year</Button>
                </div>
            </div>
            {showchart &&
                <div>
                    <Chart
                        options={optionseries.options}
                        series={optionseries.series}
                        type={"area"}
                        width="100%"
                        height={400}
                    />
                </div>
            }
        </div>

    );

}

