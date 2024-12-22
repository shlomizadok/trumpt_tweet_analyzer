require "test_helper"

class LinkedPageTest < ActiveSupport::TestCase
  def setup
    @tweet = tweets(:one)  # We'll need to create this fixture
    @linked_page = LinkedPage.new(
      url: "https://example.com",
      tweet: @tweet
    )
  end

  test "should be valid with all attributes" do
    assert @linked_page.valid?
  end

  test "should require url" do
    @linked_page.url = nil
    assert_not @linked_page.valid?
  end

  test "should require tweet" do
    @linked_page.tweet = nil
    assert_not @linked_page.valid?
  end

  test "should have many word_counts" do
    assert_respond_to @linked_page, :word_counts
  end
end
