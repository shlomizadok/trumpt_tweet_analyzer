require "test_helper"

class UrlAnalyzerServiceTest < ActiveSupport::TestCase
  def setup
    @tweet = tweets(:one)
  end

  test "extracts urls from tweet content" do
    tweet = Tweet.new(content: "Check this https://example.com and this http://test.com")
    urls = UrlAnalyzerService.send(:extract_urls, tweet.content)
    assert_equal 2, urls.length
    assert_includes urls, "https://example.com"
    assert_includes urls, "http://test.com"
  end

  test "handles empty content" do
    tweet = Tweet.new(content: "No URLs here")
    urls = UrlAnalyzerService.send(:extract_urls, tweet.content)
    assert_empty urls
  end

  test "counts words in content" do
    content = "This russia scandal is about russia and china"
    linked_page = UrlAnalyzerService.analyze_page(@tweet, "https://example.com", content)
    
    # Verify word counts were created
    assert_equal 2, linked_page.word_counts.find_by(word: 'russia').count
    assert_equal 1, linked_page.word_counts.find_by(word: 'scandal').count
    assert_equal 1, linked_page.word_counts.find_by(word: 'china').count
    assert_equal 0, linked_page.word_counts.find_by(word: 'conspiracy').count
    assert_equal 0, linked_page.word_counts.find_by(word: 'outrage').count
  end
end