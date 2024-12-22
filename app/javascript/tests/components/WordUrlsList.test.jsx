import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WordUrlsList from '../../components/WordUrlsList';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { url: 'https://example.com/1', count: 5 },
        { url: 'https://example.com/2', count: 3 },
      ]),
  })
);

describe('WordUrlsList', () => {
  it('renders loading state initially', () => {
    render(<WordUrlsList word="test" />);
    
    // Check if "Loading..." text is present initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders URLs after data is fetched', async () => {
    render(<WordUrlsList word="test" />);

    // Wait for the data to load and check if the URLs are rendered
    await waitFor(() => {
      expect(screen.getByText('https://example.com/1')).toBeInTheDocument();
      expect(screen.getByText('https://example.com/2')).toBeInTheDocument();
      expect(screen.getByText('(mentioned 5 times)')).toBeInTheDocument();
      expect(screen.getByText('(mentioned 3 times)')).toBeInTheDocument();
    });
  });

  it('makes a fetch request with the correct URL', async () => {
    render(<WordUrlsList word="test" />);

    // Wait for fetch to be called and check if it's called with the correct URL
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('api/word_counts/test');
    });
  });

  it('handles no URLs gracefully (empty data)', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });

    render(<WordUrlsList word="test" />);

    await waitFor(() => {
      expect(screen.queryByText(/https:\/\/example.com/)).not.toBeInTheDocument();
    });
  });
});
