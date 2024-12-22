require "test_helper"

class WordCountTest < ActiveSupport::TestCase
  def setup
    @linked_page = linked_pages(:one)  # We'll need to create this fixture
    @word_count = WordCount.new(
      word: "test",
      count: 5,
      linked_page: @linked_page
    )
  end

  test "should be valid with all attributes" do
    assert @word_count.valid?
  end

  test "should require word" do
    @word_count.word = nil
    assert_not @word_count.valid?
  end

  test "should require count" do
    @word_count.count = nil
    assert_not @word_count.valid?
  end

  test "should require linked_page" do
    @word_count.linked_page = nil
    assert_not @word_count.valid?
  end

  test "count should be zero or positive" do
    @word_count.count = -1
    assert_not @word_count.valid?
  end

  test "most_frequent returns words in correct order" do
    results = WordCount.most_frequent
    # Assuming we have some word counts in our fixtures
    assert_equal ["test", "example"], results.map(&:word)
  end
end