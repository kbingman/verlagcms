require 'mini_magick'

class Asset < Item
  
  include MongoMapper::Document
  include Canable::Ables
  
  # Plugins
  # ----------------------------------------
  plugin Joint # add the plugin
  attachment :file # declare an attachment named file
  
  plugin Hunt
  searches :name, :tags  
  before_save :index_search_terms 
  
  
  # Attributes
  # ----------------------------------------
  key :name, String, :required => { :message => :required }
  key :description, String 
  key :tags, Array, :index => true      
  
  
  # key :page_id, ObjectId
  # belongs_to :page, :foreign_key => :artist_id  
  
  # has_one :image_part
  
  timestamps!   
  
  # Valiations
  # ----------------------------------------
  # validates :title, :uniqueness => { :scope => :site_id }
  # validates_presence_of :artist_id # :story_id
  # validate :ensure_proper_file_size 
  # def ensure_proper_file_size 
  #   if file_size? && file_size > 3.megabytes 
  #     errors.add(:file, 'must be smaller than 3 megabytes') 
  #   end 
  # end
  
  # Scopes
  # ----------------------------------------
   # scope :by_tag,  lambda { |tag| where(:tags => /#{tag}/i) }
  scope :by_name, lambda { |name| where(:name => /#{name}/i) }
  # scope :by_all_tags,  lambda { |tags| where({:tags => {'$all' => tags}}) }
  # scope :by_title_desc_tag,  lambda { |query| where({ '$or' => [{:title=>/#{query}/i}, 
  #                                                               {:description=>/#{query}/i}, 
  #                                                               {:tags => /#{query}/i}] }) }                                                        
  
  
  # Search
  # ----------------------------------------
  def self.search_all_with_title(term)
    where('$or' => [{ 'searches.default' => {'$all' => Hunt::Util.to_stemmed_words(term) }}, { :name => /#{term}/i }])
  end
  
  
  # Pagination
  # ----------------------------------------
  def self.per_page
    24
  end
  
  # Import
  # ----------------------------------------
  def self.import(file)
    # FileUtils.mkdir(root_path('tmp/import'))
    counter = 0
    errors = []

    json = JSON.parse(file.read)
    assets =  json['assets']
    assets.each do |asset|
      open(root_path("tmp/import/#{asset['filename']}"), 'w') do |f| 
        f << ActiveSupport::Base64.decode64( asset['file'] )
      end
      a = Asset.new(
        :id => BSON::ObjectId(asset['id']),
        :title => asset['title'], 
        :tag_list => asset['tags'],
        :site_id => BSON::ObjectId(asset['site_id']),
        :file => File.open(root_path("tmp/import/#{asset['filename']}"))
      )
      if a.save
        counter += 1
      else
        errors << asset['title']
      end
      FileUtils.rm root_path("tmp/import/#{asset['filename']}")
    end
    
    [counter, errors]
  end

  # TODO move to a presenter  
  def image_path
    "/images/#{self.id}/#{self.file_name}" 
  end
  
  def thumb_path
    "/images/thumbnail/#{self.id}/#{self.file_name}" 
  end
  
  def icon_path
    "/images/icon/#{self.id}/#{self.file_name}" 
  end   
  
  def ext
    self.file_name.split('.').last if self.file_name
  end
  
  def is_image
    self.file_type.match(/image/) && !self.file_type.match(/svg/) ? true : false
  end
  
  def admin_path
    "/admin/folders/#{self.parent_id}/children/#{self.id}"
  end
  
  # JSON API
  # ----------------------------------------
  def as_json(options)
    super(
      :only => [ :id, :created_at, :file_name,  :folder_id, :name, :file_type, :_type ], 
      :methods => [ :tag_list, :admin_path, :image_path, :is_image, :ext ]
    )
  end
  
  # Tags
  # ----------------------------------------
  def tag_list
    self.tags.join(', ')
  end
  
  def tag_list=(list)
    new_tags = list.split(',').map{ |t| t.strip.downcase }
    self.tags = new_tags.uniq
  end
  
  private
  
    before_validation :set_file_type
    def set_file_type
      if fonts_extensions.include?(self.ext) 
        self.file_type = 'application/font'
      end
    end
    
    before_validation :set_title
    def set_title
      self.name ||= File.basename self.file_name, '.*'
    end
    
    def fonts_extensions
      ['eot', 'woff', 'ttf', 'otf']
    end
  
end