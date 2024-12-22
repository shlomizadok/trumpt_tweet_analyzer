require "test_helper"

class Api::WordCountsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_word_counts_url
    assert_response :success
  end
end
