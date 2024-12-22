# app/models/tweet.rb
class Tweet < ApplicationRecord
  has_many :linked_pages
  
  validates :tweet_id, presence: true, uniqueness: true
end