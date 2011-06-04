# Adds a search_all method to Hunt, which finds only items with all terms 
module Hunt
  module ClassMethods   
    def search_all(term)
      where('searches.default' => {'$all' => Util.to_stemmed_words(term) })
    end
  end
end