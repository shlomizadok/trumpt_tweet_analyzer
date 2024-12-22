import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const WordCountChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/word_counts')
      .then(response => response.json())
      .then(setData);
  }, []);

  const chartOptions = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Word Frequency in Linked Pages'
    },
    xAxis: {
      categories: data.map(item => item.word)
    },
    yAxis: {
      title: {
        text: 'Total Occurrences'
      },
      stackLabels: {
        enabled: true
      }
    },
    legend: {
      enabled: true
    },
    plotOptions: {
      bar: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [{
      name: 'Occurrences',
      data: data.map(item => item.count),
      colorByPoint: true
    }]
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

export default WordCountChart;