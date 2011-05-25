class Page
  include MongoMapper::Document
  # plugin MongoMapper::Plugins::IdentityMap 
  
  plugin Hunt
  searches :title, :tags  
  before_save :index_search_terms
  
  key :title, String, :required => true
  key :slug, String
  key :description, String 
  key :level, Integer 
  key :tags, Array, :index => true  
  
  many :parts, :class_name => 'Part', :dependent => :destroy 
  many :assets, :class_name => 'Asset'
  
  key :parent_id, ObjectId
  belongs_to :parent, :class_name => 'Page', :foreign_key => :parent_id  
  
  key :site_id, ObjectId, :required => true 
  belongs_to :site, :foreign_key => :site_id 
  scope :by_site,  lambda { |id| where(:site_id => id) }

  many :children, :class_name => 'Page', :dependent => :destroy, :foreign_key => :parent_id
  
  timestamps!
  
  validates_presence_of :title
  
  scope :all_roots, lambda { where(:parent_id => nil) } 
  
  
  def root?
    self.parent_id.nil? ? true : false
  end 
  
  def padding
    self.level * 24
  end  
    
  def as_json(options)
    super(:methods => [:padding, :assets])
  end     
  
  def path
    self.parent.nil? ? slug : parent.child_path(self)
  end
  
  def edit_path
    "/edit#{self.path}"
  end
  
  def child_path(child)
    clean_path(path + '/' + child.slug)
  end
  
  def find_by_path(path)
    my_path = self.path
    if (my_path == path)
      self
    elsif (path =~ /^#{Regexp.quote(my_path)}([^\/]*)/)
      slug_child = children.first :conditions => { :slug => ($1) }
      if slug_child
        found = slug_child.find_by_path(clean_path(path))
        return found if found
      end
      children.each do |child|
        found = child.find_by_path(clean_path(path))
        return found if found
      end
      return nil
    end
  end
  
  def self.find_by_path(path)
    root = self.first :conditions => { :parent_id => nil }
    root.find_by_path(path)
  end 
  
  # TODO move to lib
  def tag_list
    self.tags.join(', ')
  end
  
  def tag_list=(list)
    new_tags = list.split(',').map{ |t| t.strip.downcase }
    self.tags = new_tags.uniq
  end
  
  protected
    
    before_validation :set_level
    def set_level
      self.level = self.root? ? 0 : self.parent.level + 1
    end
    
    before_validation :set_slug
    def set_slug  
      self.slug = if root?
        '/'
      else
        self.slug.nil? ? sanitize(self.title) : sanitize(self.slug)
      end 
    end  
    
    before_save :set_part_page_id 
    def set_part_page_id
      self.parts.each{ |p| p.page_id = self.id }
    end  
    
    def sanitize(text)
      text.gsub(/[^a-z0-9-]+/i, '-').downcase
    end  
    
    def clean_path(path)
      "/#{ path.strip }/".gsub(%r{//+}, '/')
    end    

end