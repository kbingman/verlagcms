require 'mini_magick'

class Asset
  
  include MongoMapper::Document
  
  plugin Joint # add the plugin
  attachment :file # declare an attachment named file
  
  plugin Hunt
  searches :title, :tags, :artist_name
  
  # before_save :set_title
  
  key :title, String 
  key :description, String 
  key :tags, Array, :index => true
  key :artist_name, String

  # key :story_id, ObjectId
  # belongs_to :story, :foreign_key => :story_id
  
  key :artist_id, ObjectId
  belongs_to :artist, :foreign_key => :artist_id
  
  
  timestamps!
  
  validates_presence_of :title, :message => :required
  validates_presence_of :artist_id # :story_id
  
  scope :by_artist_ids,  lambda { |artist_ids| artist_ids.empty? ? where({}) : where(:artist_id => {'$in' => artist_ids}) }
  scope :by_tag,  lambda { |tag| where(:tags => /#{tag}/i) }
  scope :by_title, lambda { |title| where(:title => /#{title}/i) }
  scope :by_all_tags,  lambda { |tags| where({:tags => {'$all' => tags}}) }
  scope :by_title_desc_tag,  lambda { |query| where({ '$or' => [{:title=>/#{query}/i}, 
                                                                {:description=>/#{query}/i}, 
                                                                {:tags => /#{query}/i}] }) }                                                        
  
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
      Asset.search(query)
    when terms_without_artist.empty?
      self.by_artist_ids(artist_ids)
    else
      new_query = terms_without_artist.join(' ')
      self.search(new_query).by_artist_ids(artist_ids)
    end   
  end
      
  def self.new_with_attachment(params)  
    file = params.delete(:file) 
    asset = self.new(params) 
    if file
      asset.file = file[:tempfile]
      asset.file_name = file[:filename]
    end
    asset.title = File.basename(asset.file_name, '.*') if asset.title.blank? rescue nil
    # asset.set_tags(params[:tag_list]) 
    asset
  end
  
  def update_with_attachment(params)
    file = params.delete('file') 
    if file
      self.file = file[:tempfile] 
      self.file_name = file[:filename]
    end
    self.set_tags(params[:tag_list]) 
    self.attributes = params
    self.title = File.basename(self.file_name, '.*') if self.title.blank?
    self.save
  end
  
  def render_image(width=nil, height=nil, options={})
    file = self.file.read
    image = MiniMagick::Image.read(file)
    quality = options[:quality] || '72'
    if width && height
      if options[:crop] == true
        image = resize_and_crop(image, width, height)
      else
        image = resize(image, width, height)
      end
    end
    image.quality(quality)
    return image
  end
  
  def image_path(name='display')
    "/images/#{name}/#{self.file_id}/#{self.file_name}" 
  end
  
  def thumb_path
    image_path('thumbnails')
  end
  
  def icon_path
    image_path('icons')
  end
  
  def api_attributes
    hash = {}
    hash[:id] = self.id.to_s
    hash[:artist_name] = self.artist ? self.artist.name : ''
    hash[:artist_id] = self.artist ? self.artist.id.to_s : ''
    hash[:class] = self.class.to_s.downcase
    hash[:created_at] = self.created_at ? self.created_at.strftime('%S%M%H%d%m%Y') : ''
    [:title, :tags, :tag_list, :thumb_path, :image_path, :file_size].each do |attr|
      hash[attr.to_sym] = self.send(attr)
    end
    hash
  end
  
  def tag_list
    self.tags.join(', ')
  end
  
  def set_tags(tag_list)
    if tag_list
      self.tags = []
      tag_names = tag_list.split(',')
      tag_names.each{ |n| self.tags << n.strip.downcase }
    end
  end
  
  private
    def resize(image, width, height)
      # Doesn't resize images if they are smaller than the given sizes
      image.resize("#{width}x#{height}") if ((image[:width] >= width) || (image[:height] >= height))
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
      image.resize("#{width}x#{height}")
      return image
    end     
    
    before_validation :set_title
    def set_title
      self.title ||= File.basename self.file_name, '.*'
    end
  
end