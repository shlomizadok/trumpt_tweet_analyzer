class CreateWordCounts < ActiveRecord::Migration[8.0]
  def change
    create_table :word_counts do |t|
      t.string :word
      t.integer :count
      t.references :linked_page, null: false, foreign_key: true

      t.timestamps
    end

    add_index :word_counts, :word
    add_index :word_counts, [:word, :count]
  end
end
