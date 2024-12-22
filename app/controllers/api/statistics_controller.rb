module Api
  class StatisticsController < ApplicationController
    def index
      render json: {
        tweets_over_time: tweets_by_month,
        tweets_by_year: tweets_by_year,
        tweets_by_hour: tweets_by_hour,
        engagement_over_time: engagement_metrics
      }
    end

    private

    def tweets_by_month
      Tweet.group_by_month(:tweet_created_at)
          .count
          .map { |date, count| [ date.to_time().to_i * 1000, count ] }
    end

    def tweets_by_year
      Tweet.group("date_part('year', tweet_created_at)")
          .count
          .map { |year, count| [ year.to_i, count ] }
          .sort
    end

    def tweets_by_hour
      Tweet.group("EXTRACT(HOUR FROM tweet_created_at)")
          .count
          .map { |hour, count| [ hour.to_i, count ] }
          .sort
    end

    def engagement_metrics
      Tweet.group("DATE_TRUNC('month', tweet_created_at)")
          .select(
            "DATE_TRUNC('month', tweet_created_at) as month_date",
            "COUNT(*) as tweets_count",
            "AVG(retweet_count) as avg_retweets",
            "AVG(favorite_count) as avg_favorites"
          )
          .order("month_date")
          .map do |record|
            {
              date: record.month_date.to_i * 1000,
              tweets: record.tweets_count,
              retweets: record.avg_retweets.to_i,
              favorites: record.avg_favorites.to_i
            }
          end
    end
  end
end
