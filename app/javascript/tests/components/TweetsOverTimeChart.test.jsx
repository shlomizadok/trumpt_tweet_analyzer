import React from 'react';
import { render, screen } from '@testing-library/react';
import TweetsOverTimeChart from '../../components/TweetsOverTimeChart';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

// Mock HighchartsReact to avoid rendering the actual chart
jest.mock('highcharts-react-official', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Highcharts</div>),
}));

describe('TweetsOverTimeChart', () => {
  it('renders correctly with data', () => {
    const mockData = [
      [1635285600000, 10], [1635289200000, 15], [1635292800000, 20]
    ];

    render(<TweetsOverTimeChart data={mockData} />);

    // Check that the mocked chart is rendered
    expect(screen.getByText('Mocked Highcharts')).toBeInTheDocument();
  });

  it('correctly formats data for the chart', () => {
    const mockData = [
      [1635285600000, 10], [1635289200000, 15], [1635292800000, 20]
    ];

    render(<TweetsOverTimeChart data={mockData} />);

    // Check if HighchartsReact was called with the correct options
    expect(HighchartsReact).toHaveBeenCalledWith(
      expect.objectContaining({
        highcharts: Highcharts,
        options: expect.objectContaining({
          xAxis: expect.objectContaining({
            type: 'datetime'
          }),
          series: expect.arrayContaining([
            expect.objectContaining({
              data: [
                [1635285600000, 10], // Verify timestamp and tweet count
                [1635289200000, 15],
                [1635292800000, 20]
              ]
            })
          ])
        })
      }),
      {}
    );
  });
});
