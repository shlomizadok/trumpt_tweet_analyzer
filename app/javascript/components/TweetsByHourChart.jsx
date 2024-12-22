import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TweetsByHourChart = ({ data }) => {
  const tweetsByHourConfig = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Tweets by Hour of Day'
    },
    xAxis: {
      title: {
        text: 'Hour of Day'
      },
      categories: Array.from({ length: 24 }, (_, i) => 
        i.toString().padStart(2, '0') + ':00'
      )
    },
    yAxis: {
      title: {
        text: 'Number of Tweets'
      }
    },
    series: [{
      name: 'Tweets',
      data: data.map(([_, count]) => count)
    }]
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <HighchartsReact highcharts={Highcharts} options={tweetsByHourConfig} />
    </div>
  );
};

export default TweetsByHourChart;