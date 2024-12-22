# lib/tasks/cleanup.rake
namespace :tweets do
  desc "Clean up and reanalyze URLs"
  task cleanup_and_analyze: :environment do
    puts "Cleaning up existing data..."
    WordCount.delete_all
    LinkedPage.delete_all

    total = Tweet.where("content LIKE '%http%'").count
    processed = 0

    Tweet.where("content LIKE '%http%'").find_each do |tweet|
      AnalyzeUrlsJob.perform_later(tweet.id)

      processed += 1
      if processed % 100 == 0
        puts "Queued #{processed} of #{total} tweets for analysis..."
      end
    end

    puts "All #{processed} tweets have been queued for analysis!"
  end
end
