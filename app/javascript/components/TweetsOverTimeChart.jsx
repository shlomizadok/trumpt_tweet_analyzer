import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TweetsOverTimeChart = ({ data }) => {
  const tweetsOverTimeConfig = {
    chart: {
      type: 'line',
      zoomType: 'x'
    },
    title: {
      text: 'Tweets Over Time'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Number of Tweets'
      }
    },
    series: [{
      name: 'Tweets',
      data: data
    }]
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <HighchartsReact highcharts={Highcharts} options={tweetsOverTimeConfig} />
    </div>
  );
};

export default TweetsOverTimeChart;