class Story
  include MongoMapper::Document
  
  key :title, String 
  key :description, String
  many :assets, :foreign_key => :story_id, :dependent => :destroy
  
  key :artist_id, ObjectId
  belongs_to :artist, :foreign_key => :artist_id
  
  timestamps!
  
  validates_presence_of :title
  validates_presence_of :artist_id
  
  def api_attributes
    hash = {}
    hash[:id] = self.id.to_s
    hash[:artist_id] = self.artist.id.to_s
    hash[:class] = self.class.to_s.downcase
    hash[:created_at] = self.created_at.strftime('%S%M%H%d%m%Y')
    [:title].each do |attr|
      hash[attr.to_sym] = self.send(attr)
    end
    hash
  end
  
end