require 'mini_magick'

class Asset
  
  include MongoMapper::Document
  
  plugin Joint # add the plugin
  attachment :file # declare an attachment named file
  
  plugin Hunt
  searches :title, :tags  
  before_save :index_search_terms 
  
  # before_save :set_title
  
  key :title, String, :required => { :message => :required }, :unique => true 
  key :description, String 
  key :tags, Array, :index => true      
  
  key :site_id, ObjectId, :required => true
  belongs_to :site, :foreign_key => :site_id 
  scope :by_site,  lambda { |id| where(:site_id => id) }

  # key :story_id, ObjectId
  # belongs_to :story, :foreign_key => :story_id
  
  key :artist_id, ObjectId
  belongs_to :artist, :foreign_key => :artist_id  
  
  # key :page_id, ObjectId
  # belongs_to :page, :foreign_key => :artist_id  
  
  has_one :image_part
  
  timestamps!   
  
  liquid_methods :title, :image_path, :thumb_path, :find, :id_string, :tag_list
  
  # validates_presence_of :artist_id # :story_id
  
  scope :by_artist_ids,  lambda { |artist_ids| artist_ids.empty? ? where({}) : where(:artist_id => {'$in' => artist_ids}) }
  # scope :by_tag,  lambda { |tag| where(:tags => /#{tag}/i) }
  scope :by_title, lambda { |title| where(:title => /#{title}/i) }
  # scope :by_all_tags,  lambda { |tags| where({:tags => {'$all' => tags}}) }
  # scope :by_title_desc_tag,  lambda { |query| where({ '$or' => [{:title=>/#{query}/i}, 
  #                                                               {:description=>/#{query}/i}, 
  #                                                               {:tags => /#{query}/i}] }) }                                                        
  
  def self.per_page
    48
  end
  
  def self.search_with_artist(query)
    terms = query ? query.split(' ').collect{ |q| q.downcase } : []
    artists = []
    terms_without_artist = []
    terms.each do |t|
      a = Artist.search(t).all
      artists += a
      terms_without_artist << t if a.empty?
    end
    artist_ids = artists.uniq.collect{ |a| a._id }
        
    case
    when terms_without_artist.empty? && artist_ids.empty?
      self.search_all(query)
    when terms_without_artist.empty?
      self.by_artist_ids(artist_ids)
    else
      new_query = terms_without_artist.join(' ')
      self.search_all(new_query).by_artist_ids(artist_ids)
    end   
  end
    
  def render_image(width=nil, height=nil, options={})
    file = self.file.read
    image = MiniMagick::Image.read(file)
    quality = options[:quality] || '72' 

    if width && height && width != 0
      if options[:crop] == true
        image = resize_and_crop(image, width, height)
      else
        image = resize(image, width, height)
      end
    end
    image.quality(quality)
    return image
  end
  
  def image_path(name='originals')
    "/images/#{name}/#{self.id}/#{self.file_name}" 
  end
  
  def thumb_path
    image_path('thumbnails')
  end
  
  def icon_path
    image_path('icons')
  end   
  
  def id_string
    self.id.to_s
  end
  
  def as_json(options)
    super(:only => [:id, :file_name, :created_at, :title, :tags], :methods => [:tag_list]) #:artist_id, 
  end
  
  def tag_list
    self.tags.join(', ')
  end
  
  def tag_list=(list)
    new_tags = list.split(',').map{ |t| t.strip.downcase }
    self.tags = new_tags.uniq
  end
  
  private
    def resize(image, width, height)
      # Doesn't resize images if they are smaller than the given sizes
      image.resize("#{width}x#{height}") # if ((image[:width] >= width) || (image[:height] >= height))
      return image
    end
    
    def resize_and_crop(image, width, height)
      if image[:width] < image[:height]
        shave_off = ((image[:height] - image[:width])/2).round
        image.shave("0x#{shave_off}")
      elsif image[:width] > image[:height]
        shave_off = ((image[:width] - image[:height])/2).round
        image.shave("#{shave_off}x0")
      end
      image.resize("#{width}x#{height}") if ((image[:width] >= width) || (image[:height] >= height))
      return image
    end     
    
    before_validation :set_title
    def set_title
      self.title ||= File.basename self.file_name, '.*'
    end
  
end