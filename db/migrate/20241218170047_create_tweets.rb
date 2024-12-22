class CreateTweets < ActiveRecord::Migration[8.0]
  def change
    create_table :tweets do |t|
      t.string :tweet_id
      t.text :content
      t.integer :retweet_count
      t.integer :favorite_count
      t.datetime :tweet_created_at

      t.timestamps
    end
    
    add_index :tweets, :tweet_id, unique: true
    add_index :tweets, :tweet_created_at
  end
end
