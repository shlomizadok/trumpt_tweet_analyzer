import React from 'react';
import { render, screen } from '@testing-library/react';
import TweetsByHourChart from '../../components/TweetsByHourChart';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

// Mock HighchartsReact to avoid rendering the actual chart
jest.mock('highcharts-react-official', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Highcharts</div>),
}));

describe('TweetsByHourChart', () => {
  it('renders correctly with data', () => {
    const mockData = [
      [0, 10], [1, 20], [2, 30], [3, 40], [4, 50], [5, 60], [6, 70],
      [7, 80], [8, 90], [9, 100], [10, 110], [11, 120], [12, 130],
      [13, 140], [14, 150], [15, 160], [16, 170], [17, 180], [18, 190],
      [19, 200], [20, 210], [21, 220], [22, 230], [23, 240]
    ];

    render(<TweetsByHourChart data={mockData} />);

    // Check that the mocked chart is rendered
    expect(screen.getByText('Mocked Highcharts')).toBeInTheDocument();
  });

  it('correctly formats data for the chart', () => {
    const mockData = [
      [0, 10], [1, 20], [2, 30], [3, 40], [4, 50], [5, 60], [6, 70],
      [7, 80], [8, 90], [9, 100], [10, 110], [11, 120], [12, 130],
      [13, 140], [14, 150], [15, 160], [16, 170], [17, 180], [18, 190],
      [19, 200], [20, 210], [21, 220], [22, 230], [23, 240]
    ];

    render(<TweetsByHourChart data={mockData} />);

    // Check if HighchartsReact was called with the correct options
    expect(HighchartsReact).toHaveBeenCalledWith(
      expect.objectContaining({
        highcharts: Highcharts,
        options: expect.objectContaining({
          xAxis: expect.objectContaining({
            categories: [
              '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
              '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
              '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
              '21:00', '22:00', '23:00'
            ]
          }),
          series: expect.arrayContaining([
            expect.objectContaining({
              data: [
                10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140,
                150, 160, 170, 180, 190, 200, 210, 220, 230, 240
              ]
            })
          ])
        })
      }),
      {}
    );
  });
});
