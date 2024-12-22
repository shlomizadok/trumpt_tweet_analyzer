// components/charts/EngagementChart.jsx
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const EngagementChart = ({ data }) => {
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
     data: data.map(d => [d.date, d.favorites]),
     color: '#FFB6C1'
   }, {
     name: 'Retweets', 
     data: data.map(d => [d.date, d.retweets]),
     color: '#90EE90'
   }]
 };

 return (
   <div className="bg-white rounded-lg shadow p-6">
     <HighchartsReact highcharts={Highcharts} options={engagementConfig} />
   </div>
 );
};

export default EngagementChart;