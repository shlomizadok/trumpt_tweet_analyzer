# Disclaimer: This migration was built with the help of claude.ai
class CreateTweetAnalyticsView < ActiveRecord::Migration[8.0]
  def up
    execute <<-SQL
      CREATE MATERIALIZED VIEW tweet_analytics AS
      SELECT 
        date_trunc('hour', tweet_created_at) AS hour,
        COUNT(*) as tweet_count,
        SUM(retweet_count) as total_retweets,
        SUM(favorite_count) as total_favorites
      FROM tweets
      GROUP BY date_trunc('hour', tweet_created_at)
      ORDER BY hour;

      CREATE UNIQUE INDEX ON tweet_analytics (hour);
    SQL
  end

  def down
    execute "DROP MATERIALIZED VIEW IF EXISTS tweet_analytics;"
  end
end
