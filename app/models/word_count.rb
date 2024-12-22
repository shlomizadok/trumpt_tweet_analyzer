class WordCount < ApplicationRecord
  belongs_to :linked_page
  validates :word, presence: true
  validates :count, presence: true, numericality: { greater_than_or_equal_to: 0 }

  scope :for_word, ->(word) { where(word: word) }
  scope :most_frequent, -> { order(count: :desc) }
end
