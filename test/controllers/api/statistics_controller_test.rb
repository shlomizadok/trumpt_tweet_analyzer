require "test_helper"

class Api::StatisticsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_statistics_path
    assert_response :success

    # Verify response structure
    json = JSON.parse(response.body)
    assert_includes json.keys, "tweets_over_time"
    assert_includes json.keys, "tweets_by_hour"
    assert_includes json.keys, "engagement_over_time"
  end

  test "tweets_over_time should have correct format" do
    get api_statistics_path
    json = JSON.parse(response.body)

    # Each data point should be [timestamp, count]
    json["tweets_over_time"].each do |point|
      assert_equal 2, point.length
      assert point[0].is_a?(Integer)  # timestamp
      assert point[1].is_a?(Integer)  # count
    end
  end

  test "tweets_by_hour should have 24 hours" do
    get api_statistics_path
    json = JSON.parse(response.body)

    assert_equal 24, json["tweets_by_hour"].length
  end
end
