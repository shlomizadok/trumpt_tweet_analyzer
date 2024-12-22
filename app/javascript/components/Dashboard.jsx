import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import WordCountChart from './WordCountChart';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/statistics')
      .then(response => response.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-4">Loading...</div>;

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
      data: data.tweets_over_time
    }]
  };

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
      data: data.tweets_by_hour.map(([_, count]) => count)
    }]
  };

  const engagementConfig = {
    chart: {
      type: 'area',
      zoomType: 'x'
    },
    title: {
      text: 'Engagement Metrics Over Time'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Average Count'
      }
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        marker: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Favorites',
      data: data.engagement_over_time.map(d => [d.date, d.favorites]),
      color: '#FFB6C1'
    }, {
      name: 'Retweets',
      data: data.engagement_over_time.map(d => [d.date, d.retweets]),
      color: '#90EE90'
    }]
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Trump Twitter Analysis
        </h1>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <HighchartsReact
              highcharts={Highcharts}
              options={tweetsOverTimeConfig}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <HighchartsReact
              highcharts={Highcharts}
              options={tweetsByHourConfig}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <HighchartsReact
              highcharts={Highcharts}
              options={engagementConfig}
            />
          </div>
          <WordCountChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;