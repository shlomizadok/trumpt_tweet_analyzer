namespace :tweets do
  desc "Analyze URLs in all tweets"
  task analyze_urls: :environment do
    total = Tweet.count
    processed = 0

    Tweet.find_each do |tweet|
      AnalyzeUrlsJob.perform_later(tweet.id)
      
      processed += 1
      if processed % 100 == 0
        puts "Queued #{processed} of #{total} tweets for analysis..."
      end
    end

    puts "All #{processed} tweets have been queued for analysis!"
  end
end