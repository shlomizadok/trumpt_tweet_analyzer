# Disclaimer: This method was built with the help of claude.ai
require "httparty"
require "nokogiri"

class UrlAnalyzerService
  # Disclaimer: This method was built with the help of claude.ai
  def self.analyze_urls_from_tweet(tweet)
    urls = extract_urls(tweet.content)
    results = []

    urls.each do |url|
      begin
        Rails.logger.info "Analyzing URL: #{url} for tweet: #{tweet.id}"

        response = HTTParty.get(url,
          follow_redirects: true,
          limit: 5,  # Maximum number of redirects to follow
          headers: { 'User-Agent': "Mozilla/5.0" }  # Some sites require a user agent
        )

        if response.success?
          text = extract_text(response.body)
          results << analyze_page(tweet, url, text)
        end
      rescue => e
        Rails.logger.error("Error analyzing #{url} from tweet #{tweet.id}: #{e.message}")
      end
    end
    results
  end

  private

  def self.extract_urls(content)
    URI.extract(content, [ "http", "https" ]).uniq
  end

  def self.extract_text(html)
    Nokogiri::HTML(html).text.downcase
  end

  def self.analyze_page(tweet, url, content)
    ActiveRecord::Base.transaction do
      linked_page = LinkedPage.find_or_create_by(tweet: tweet, url: url)

      # Delete existing word counts to prevent duplicates
      linked_page.word_counts.delete_all

      AppConstants::TRACKED_WORDS.each do |word|
        count = content.scan(/\b#{word}\b/i).size
        Rails.logger.info "Found #{count} occurrences of '#{word}' in #{url}"

        WordCount.create!(
          linked_page: linked_page,
          word: word,
          count: count
        )
      end

      linked_page
    end
  end
end
