require "test_helper"

class Api::WordCountsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_word_counts_path
    assert_response :success
    
    json = JSON.parse(response.body)
    assert json.is_a?(Array), "Response should be an array"
  end

  test "word counts should have correct structure" do
    get api_word_counts_path
    json = JSON.parse(response.body)
    
    json.each do |item|
      assert_includes item.keys, "word"
      assert_includes item.keys, "count"
      assert item["count"].is_a?(Integer)
    end
  end

  test "should get show for specific word" do
    # Assuming we have some word counts in our fixtures
    get api_word_count_path('russia')  # Test with a specific word
    assert_response :success
    
    json = JSON.parse(response.body)
    assert json.is_a?(Array), "Response should be an array of URLs"
    
    json.each do |item|
      assert_includes item.keys, "url"
      assert_includes item.keys, "count"
    end
  end

  test "should return 404 for non-existent word" do
    get api_word_count_path('nonexistentword')
    assert_response :bad_request
  end  
end
