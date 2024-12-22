class LinkedPage < ApplicationRecord
  belongs_to :tweet
  has_many :word_counts, dependent: :destroy
  
  validates :url, presence: true, uniqueness: true

  TRACKED_WORDS = %w[conspiracy russia scandal outrage china]

  def self.analyze_url(url, content)
    linked_page = find_or_create_by(url: url)
    
    TRACKED_WORDS.each do |word|
      count = content.downcase.scan(/\b#{word}\b/i).size
      linked_page.word_counts.create_or_find_by(word: word) do |wc|
        wc.count = count
      end
    end
    
    linked_page
  end
end