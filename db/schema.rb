# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2024_12_18_172313) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "linked_pages", force: :cascade do |t|
    t.string "url"
    t.text "content"
    t.bigint "tweet_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.tsvector "searchable_content"
    t.jsonb "metadata", default: {}
    t.index ["metadata"], name: "index_linked_pages_on_metadata", using: :gin
    t.index ["searchable_content"], name: "index_linked_pages_on_searchable_content", using: :gin
    t.index ["tweet_id"], name: "index_linked_pages_on_tweet_id"
  end

  create_table "tweets", force: :cascade do |t|
    t.string "tweet_id"
    t.text "content"
    t.integer "retweet_count"
    t.integer "favorite_count"
    t.datetime "tweet_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "raw_data"
    t.text "urls", default: [], array: true
    t.index ["raw_data"], name: "index_tweets_on_raw_data", using: :gin
    t.index ["tweet_created_at"], name: "index_tweets_on_tweet_created_at"
    t.index ["urls"], name: "index_tweets_on_urls", using: :gin
  end

  create_table "word_counts", force: :cascade do |t|
    t.string "word"
    t.integer "count"
    t.bigint "linked_page_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["linked_page_id"], name: "index_word_counts_on_linked_page_id"
    t.index ["word", "count"], name: "index_word_counts_on_word_and_count"
    t.index ["word"], name: "index_word_counts_on_word"
  end

  add_foreign_key "linked_pages", "tweets"
  add_foreign_key "word_counts", "linked_pages"
end
