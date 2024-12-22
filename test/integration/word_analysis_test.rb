require "test_helper"

class WordAnalysisTest < ActionDispatch::IntegrationTest
  test "complete flow from tweet to word counts" do
    tweet = Tweet.create!(
      tweet_id: "integration_test",
      content: "Check this https://example.com about russia scandal",
      tweet_created_at: Time.current
    )
    
    # Stub HTTP request
    stub_request(:get, "https://example.com")
      .to_return(body: "Article about russia scandal and more russia content")
    
    UrlAnalyzerService.analyze_urls_from_tweet(tweet)
    
    # Verify word counts were created
    assert_equal 2, tweet.linked_pages.first.word_counts.find_by(word: 'russia').count
    assert_equal 1, tweet.linked_pages.first.word_counts.find_by(word: 'scandal').count
  end
end