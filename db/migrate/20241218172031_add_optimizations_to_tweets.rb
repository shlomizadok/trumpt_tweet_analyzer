# Disclaimer: This optimization was built with the help of claude.ai
class AddOptimizationsToTweets < ActiveRecord::Migration[8.0]
  def change
    add_column :tweets, :raw_data, :jsonb
    add_index :tweets, :raw_data, using: :gin
  end
end
