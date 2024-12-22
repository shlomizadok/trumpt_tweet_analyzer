import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import WordCountChart from './WordCountChart';
import TweetsOverTimeChart from './TweetsOverTimeChart';
import TweetsByHourChart from './TweetsByHourChart';
import EngagementChart from './EngagementChart';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/statistics')
      .then(response => response.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-4">Loading...</div>;
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Trump Twitter Analysis
        </h1>
        
        <div className="grid grid-cols-1 gap-8">
          <TweetsOverTimeChart data={data.tweets_over_time} />
          <TweetsByHourChart data={data.tweets_by_hour} />
          <EngagementChart data={data.engagement_over_time} />
          <WordCountChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;