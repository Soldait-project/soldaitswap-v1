import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const LineChart = ({ height, color = [],liqutitydata,swapdata }) => {
  const theme = useTheme();
  console.log("swapdata---------->",swapdata)
  console.log("liqutitydata---------->",liqutitydata)

  const option = {
    grid: { top: '10%', bottom: '10%', left: '5%', right: '5%' },
    legend: {
      itemGap: 20,
      icon: 'circle',
      textStyle: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    xAxis: {
      type: 'category',
      data: [ 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 },
      },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    series: [
      {
        data: swapdata,
        type: 'line',
        stack: 'Swap',
        name: 'Swap',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
      {
        data: liqutitydata,
        type: 'line',
        stack: 'Liquidity',
        name: 'Liquidity',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
};

export default LineChart;
