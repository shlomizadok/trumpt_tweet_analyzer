import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import Dashboard from '../../components/Dashboard';

// Mock the child components
jest.mock('../../components/WordCountChart', () => () => <div>WordCountChart</div>);
jest.mock('../../components/TweetsOverTimeChart', () => () => <div>TweetsOverTimeChart</div>);
jest.mock('../../components/TweetsByHourChart', () => () => <div>TweetsByHourChart</div>);
jest.mock('../../components/EngagementChart', () => () => <div>EngagementChart</div>);

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          tweets_over_time: [],
          tweets_by_hour: [],
          engagement_over_time: [],
        }),
    })
  );
});

afterAll(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('Dashboard', () => {
  it('renders loading state initially', () => {
    /*
      This test raises console.error:
      act(() => {
        fire events that update state
      });
      however, when wrapping the render function with act, the error is gone. but it fails the test - as act already loads the other components.
      @todo: find a way to fix this.
    */
    render(<Dashboard />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders charts after data is loaded', async () => {
    await act(async () => {
      render(<Dashboard />);
    });

    await waitFor(() => {
      expect(screen.getByText('TweetsOverTimeChart')).toBeInTheDocument();
      expect(screen.getByText('TweetsByHourChart')).toBeInTheDocument();
      expect(screen.getByText('EngagementChart')).toBeInTheDocument();
      expect(screen.getByText('WordCountChart')).toBeInTheDocument();
    });

    // Clean up the mock
    global.fetch.mockRestore();
  });
});
