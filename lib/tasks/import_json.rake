namespace :tweets do
  desc "Import tweets from JSON file"
  task import_json: :environment do
    file_path = Rails.root.join("data", "trump_tweets.json")
    JsonImportService.import_from_file(file_path)
  end
end
