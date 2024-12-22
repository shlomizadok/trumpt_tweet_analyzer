class AnalyzeUrlsJob < ApplicationJob
  queue_as :default
  retry_on StandardError, attempts: 3, wait: 5.seconds

  def perform(tweet_id)
    tweet = Tweet.find(tweet_id)
    Rails.logger.info "Processing tweet #{tweet_id} with content: #{tweet.content}"
    UrlAnalyzerService.analyze_urls_from_tweet(tweet)
  end
end
