import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WordCountChart from '../../components/WordCountChart';
import HighchartsReact from 'highcharts-react-official';

// Mock HighchartsReact to return an object with the expected structure
jest.mock('highcharts-react-official', () => ({
  __esModule: true,
  default: jest.fn((props) => {
    // Here, mock the expected structure of the chart with only `options`
    return <div>{JSON.stringify(props.options)}</div>;
  }),
}));

// Mock fetch to simulate API call
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { word: 'example', count: 5 },
        { word: 'test', count: 10 },
        { word: 'hello', count: 3 },
      ]),
  })
);

describe('WordCountChart', () => {
  it('renders the chart with data after fetch', async () => {
    await act(() => {
      render(<WordCountChart />);
    });
  
    // Wait for the data to load and check if the chart is rendered
    await waitFor(() => {
      // Match the categories or data part in the JSON output
      expect(screen.getByText(/"categories":\["example","test","hello"\]/)).toBeInTheDocument();
      expect(screen.getByText(/"data":\[5,10,3\]/)).toBeInTheDocument();
    });
  
    // Verify that HighchartsReact is called with the correct options
    expect(HighchartsReact).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          xAxis: expect.objectContaining({
            categories: ['example', 'test', 'hello'],
          }),
          series: expect.arrayContaining([
            expect.objectContaining({
              data: [5, 10, 3],
            }),
          ]),
        }),
      }),
      expect.anything() // Allow any other props passed to HighchartsReact
    );
  });  

  it('makes a fetch request to the correct API endpoint', async () => {
    await act(() => {
      render(<WordCountChart />);
    });

    // Wait for fetch to be called and check if it's called with the correct URL
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/word_counts');
    });
  });
});
