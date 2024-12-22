import React from 'react';
import { render, screen } from '@testing-library/react';
import EngagementChart from '../../components/EngagementChart';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

// Mock HighchartsReact to avoid rendering the actual chart
jest.mock('highcharts-react-official', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Highcharts</div>),
}));

describe('EngagementChart', () => {
  it('renders correctly with data', () => {
    const mockData = [
      { date: 1635285600000, favorites: 10, retweets: 5 },
      { date: 1635289200000, favorites: 15, retweets: 10 },
    ];

    render(<EngagementChart data={mockData} />);

    // Check that the mocked chart is rendered
    expect(screen.getByText('Mocked Highcharts')).toBeInTheDocument();
  });

  it('correctly formats data for the chart', () => {
    const mockData = [
      { date: 1635285600000, favorites: 10, retweets: 5 },
      { date: 1635289200000, favorites: 15, retweets: 10 },
    ];

    render(<EngagementChart data={mockData} />);

    // Check if HighchartsReact was called with the correct options
    expect(HighchartsReact).toHaveBeenCalledWith(
      expect.objectContaining({
        highcharts: Highcharts,
        options: expect.objectContaining({
          series: expect.arrayContaining([
            expect.objectContaining({
              data: expect.arrayContaining([
                [1635285600000, 10], // Verify the date and favorites mapping
                [1635289200000, 15],
              ]),
            }),
            expect.objectContaining({
              data: expect.arrayContaining([
                [1635285600000, 5], // Verify the date and retweets mapping
                [1635289200000, 10],
              ]),
            }),
          ]),
        }),
      }),
      {}
    );
  });
});
