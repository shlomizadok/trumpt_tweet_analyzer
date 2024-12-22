class CreateLinkedPages < ActiveRecord::Migration[8.0]
  def change
    create_table :linked_pages do |t|
      t.string :url
      t.text :content
      t.references :tweet, null: false, foreign_key: true

      t.timestamps
    end
  end
end
