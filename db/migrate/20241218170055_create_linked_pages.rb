class CreateLinkedPages < ActiveRecord::Migration[8.0]
  def change
    create_table :linked_pages do |t|
      t.string :url
      t.references :tweet, null: false, foreign_key: true

      t.timestamps
    end

    add_index :linked_pages, :url, unique: true
  end
end
