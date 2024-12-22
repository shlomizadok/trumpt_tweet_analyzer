require "test_helper"
require "webmock/minitest"

class AnalyzeUrlsJobTest < ActiveJob::TestCase
  test "job enqueues and processes tweet" do
    tweet = tweets(:one)

    assert_enqueued_with(job: AnalyzeUrlsJob, args: [ tweet.id ]) do
      AnalyzeUrlsJob.perform_later(tweet.id)
    end
  end

  test "job handles missing tweet gracefully" do
    assert_nothing_raised do
      AnalyzeUrlsJob.perform_now(-1)
    end
  end
end
