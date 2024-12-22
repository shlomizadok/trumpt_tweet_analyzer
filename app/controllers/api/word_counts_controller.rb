module Api
  class WordCountsController < ApplicationController
    def index
      data = WordCount.joins(:linked_page)
        .group(:word)
        .select("word, SUM(count) as total_count")
        .order("total_count DESC")
        .map do |record|
          {
            word: record.word,
            count: record.total_count.to_i
          }
        end

      render json: data
    end

    def show
      word = params[:id].downcase
      return render json: { error: "Invalid word" }, status: :bad_request unless valid_word?(word)

      urls = LinkedPage.joins(:word_counts)
                      .where(word_counts: { word: word })
                      .where("word_counts.count > 0")
                      .select("linked_pages.url, word_counts.count")
                      .order("word_counts.count DESC")
                      .map do |page|
                        {
                          url: page.url,
                          count: page.count
                        }
                      end

      render json: urls
    end

    private

    def valid_word?(word)
      %w[conspiracy russia scandal outrage china].include?(word)
    end
  end
end
