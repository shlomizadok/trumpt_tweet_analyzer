# Trump Tweets Analysis Project

A data analysis platform that processes and visualizes Donald Trump's tweets, analyzing both tweet patterns and linked content.

## Features

- Import and store tweets from JSON data
- Analyze URLs mentioned in tweets
- Track word frequencies in linked pages
- Visualize tweet patterns and analytics using Highcharts
- Background processing for efficient data analysis

## Technology Stack

- **Backend**: Ruby on Rails
- **Database**: PostgreSQL
- **Background Processing**: Sidekiq
- **Frontend**: React
- **Visualization**: Highcharts

## System Requirements

- Ruby 3.3.6
- Rails 8
- PostgreSQL 
- Redis (for Sidekiq)
- Node.js and yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/shlomizadok/trumpt_tweet_analyzer
cd trumpt_tweet_analyzer
```

2. Install Ruby dependencies:
```bash
bundle install
```

3. Install JavaScript dependencies:
```bash
yarn install
```

4. Set up the database:
```bash
rails db:create db:migrate
```

5. Start Redis server (required for Sidekiq):
```bash
redis-server
```

## Data Import and Processing

### Importing Tweet Data

Use the provided Rake task to import tweets from a JSON file:

```bash
rails tweets:import_json
```

The import process will:
- Parse the JSON data
- Create Tweet records
- Extract URLs from tweet content
- Store raw tweet data

### Analyzing URLs and Word Frequencies

Process URLs and analyze word frequencies using:

```bash
rails tweets:cleanup_and_analyze
```

This will:
- Clear existing word count and linked page data
- Queue analysis jobs for tweets containing URLs
- Process URLs asynchronously using Sidekiq

## Architecture

### Key Architectural Decisions

The project uses a granular data storage approach for word counts, maintaining relationships between words and their source URLs instead of just aggregate counts. This decision was made to support:

1. Deep analysis capabilities (e.g., finding source URLs for specific words)
2. Future feature flexibility
3. Sophisticated querying options
4. Data granularity preservation

While this approach requires more storage (approximately 16k records vs. simple aggregates), the benefits of maintaining data relationships outweigh the storage overhead. To optimize performance, the system uses:
- Proper database indexing
- Materialized views for common aggregations
- Efficient query patterns

### Features Born from Architecture

#### Word Explorer
A dedicated page (/word-explorer) that allows users to:
- Select specific words (e.g., "china", "russia")
- View all connected URLs containing those words

This feature demonstrates the value of maintaining granular word-URL relationships in our data model.

### Data Models

1. **Tweet**
   - Stores tweet metadata and content
   - Associates with linked pages
   - Maintains original tweet data

2. **LinkedPage**
   - Stores content from URLs mentioned in tweets
   - Associates with word counts

3. **WordCount**
   - Tracks frequency of specified words
   - Associates with linked pages

### Background Processing

The system uses Sidekiq for asynchronous processing:

- `AnalyzeUrlsJob`: Processes URLs from tweets
- URL content fetching and word counting run in background

### Services

1. **JsonImportService**
   - Handles tweet data import
   - Extracts URLs from tweet content
   - Manages batch processing

2. **UrlAnalyzerService**
   - Analyzes content from linked URLs
   - Counts specified word frequencies
   - Manages page content storage

## Visualizations

The frontend provides several interactive charts:

1. Tweets over time
2. Retweet counts over time
3. Tweet distribution by hour
4. Word frequency analysis

## Development

Start the development servers:

1. Rails server:
```bash
rails server
```

2. Sidekiq worker:
```bash
bundle exec sidekiq
```

3. Frontend development server:
```bash
yarn start
```

## Monitoring

Monitor background jobs through the Sidekiq web interface:
- Available at `/sidekiq` when running in development
- Requires authentication in production

## Extending Word Analysis

To add new words for tracking:

1. Add words to the tracking list in the configuration (`config/initializers/constants`)
2. Run the cleanup and analysis task to reprocess data:
```bash
rails tweets:cleanup_and_analyze
```

## Acknowledgments

- Data source: thetrumparchive.com