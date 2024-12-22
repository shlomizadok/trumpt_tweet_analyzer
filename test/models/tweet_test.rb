require "test_helper"

class TweetTest < ActiveSupport::TestCase
  def setup
    @tweet = Tweet.new(
      tweet_id: "012345678",
      content: "This is a test tweet",
      retweet_count: 5,
      favorite_count: 10,
      tweet_created_at: Time.current,
      raw_data: { "text": "This is a test tweet" }
    )
  end

  test "should be valid with all attributes" do
    assert @tweet.valid?, "Tweet not valid: #{@tweet.errors.full_messages}"
  end

  test "should require tweet_id" do
    @tweet.tweet_id = nil
    assert_not @tweet.valid?
  end

  test "tweet_id should be unique" do
    duplicate_tweet = @tweet.dup
    @tweet.save
    assert_not duplicate_tweet.valid?
  end

  test "should have many linked_pages" do
    assert_respond_to @tweet, :linked_pages
  end
end
