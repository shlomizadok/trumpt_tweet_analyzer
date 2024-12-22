class JsonImportService
  def self.import_from_file(file_path)
    puts "Starting import..."

    json_data = File.read(file_path)
    tweets = JSON.parse(json_data)

    total = tweets.size
    imported = 0

    Tweet.transaction do
      tweets.each_with_index do |tweet_data, index|
        # Parse the Twitter date format
        created_at = Time.parse(tweet_data["date"]) rescue nil

        tweet = Tweet.create_or_find_by(tweet_id: tweet_data["id"].to_s) do |t|
          t.content = tweet_data["text"]
          t.retweet_count = tweet_data["retweets"]
          t.favorite_count = tweet_data["favorites"]
          t.tweet_created_at = created_at
          t.raw_data = tweet_data
          t.urls = extract_urls_from_text(tweet_data["text"])
        end

        imported += 1
        if (index + 1) % 1000 == 0
          puts "Imported #{index + 1} of #{total} tweets..."
        end
      end
    end

    puts "Import completed! Imported #{imported} tweets."
  end

  private

  def self.extract_urls_from_text(text)
    text.to_s.scan(/(https?:\/\/[^\s]+)/).flatten
  end
end
