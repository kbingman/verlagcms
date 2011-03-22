class Artist
  include MongoMapper::Document
  plugin MongoMapper::Plugins::IdentityMap
  
  key :name, String 
  key :bio, String
  key :slug, String
  
  many :assets, :dependent => :destroy
  # many :stories
  
  plugin Hunt
  searches :name
  
  validates_presence_of :name, :message => :required
  validates_uniqueness_of :slug, :message => :must_be_unique
  
  timestamps!
  scope :by_name, lambda { |name| where(:name => /#{name}/i) }
  
  # def self.search(query='') 
  #   terms = []
  #   query.split(' ').collect{ |q| terms << /#{q}/i}
  #   where('$or' => [{ :name => {'$in' => terms} }])
  # end
  
  def api_attributes
    hash = {}
    hash[:id] = self.id.to_s
    hash[:class] = self.class.to_s.downcase
    hash[:created_at] = self.created_at ? self.created_at.strftime('%S%M%H%d%m%Y') : ''
    [:name, :bio, :slug].each do |attr|
      hash[attr.to_sym] = self.send(attr)
    end
    hash
  end

  protected
  
    before_save :set_slug
    def set_slug
      self.slug = ActiveSupport::Inflector.parameterize(self.name, '-') if self.slug.nil?
    end
    
    before_save :set_asset_artist_name
    def set_asset_artist_name
      self.assets.each do |asset|
        asset.write_attribute(:artist_name, self.name)
      end
    end
  
end