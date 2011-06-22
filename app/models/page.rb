class Page
  include MongoMapper::Document
  # plugin MongoMapper::Plugins::IdentityMap 
  
  plugin Hunt
  searches :title, :tags  
  before_save :index_search_terms  
  
  key :title, String, :required => true
  key :slug, String, :required => true #, :unique => { :scope => :parent_id }
  key :description, String 
  key :level, Integer 
  key :tags, Array, :index => true  
  
  many :parts, :class_name => 'Part', :dependent => :destroy 
   
  key :asset_ids, Array
  many :assets, :in => :asset_ids
  
  key :parent_id, ObjectId
  belongs_to :parent, :class_name => 'Page', :foreign_key => :parent_id  
  
  key :site_id, ObjectId, :required => true 
  belongs_to :site, :foreign_key => :site_id 
  scope :by_site,  lambda { |id| where(:site_id => id) } 
  
  key :layout_id, ObjectId, :required => true 
  belongs_to :layout, :foreign_key => :layout_id

  many :children, :class_name => 'Page', :dependent => :destroy, :foreign_key => :parent_id
  
  timestamps!
  
  validates_presence_of :title 
  
  attr_accessible :title, :content, :slug, :parent_id, :layout_id, :parts, :assets_list, :tag_list
  
  scope :all_roots, lambda { where(:parent_id => nil) } 
  
  # Liquid Stuff
  # liquid_methods :title, :path, :assets, :children, :data, :parts 
  def to_liquid request = nil   
    PageDrop.new self, request
  end  
  
  def data request = nil 
    DataProxy.new self, request
  end
  
  def render format='html', request=nil 
    if format.to_s == 'json'  
      self.to_json
    else 
      template = Liquid::Template.parse(self.layout.content)
      template.render({
        'page' => PageDrop.new(self, request), 
        'site' => self.site, 
        'request' => RequestDrop.new(request),  
        # TOTO move this into a page subclass?
        'search' => SearchDrop.new(self.site, request) 
      })
    end
  end
  
  def root?
    self.parent.nil? ? true : false
  end 
  
  def child?
    self.parent.nil? ? false : true
  end 
  
  def children?
    self.children.empty? ? false : true
  end
  
  def padding  
    # this needs to be moved out of the model...
    self.level * 12
  end   
    
  def as_json(options)
    super(:methods => [:path, :padding, :assets, :assets_list, :tag_list, :root?, :children?, :child?])
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
  
  def self.find_by_path(path, site)
    root = site.root
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
  
  def assets_list
    self.assets.collect{ |a| a.id }.join(', ')
  end
  
  def assets_list=(list)
    new_ids = list.split(',').map{ |t| t.strip }
    self.asset_ids = new_ids.uniq
  end  
  
  def part_names
    self.parts.collect{ |p| p.name } 
  end
  
  protected
    
    before_validation :set_level
    def set_level    
      self.level = self.parent.nil? ? 0 : self.parent.level + 1
    end   
    
    # TODO probably everything needs this check...
    # JSON sometimes sends weird info...
    before_validation :set_parent_id
    def set_parent_id 
      self.parent_id = self.parent_id == 'null' ? nil : self.parent_id
    end  
    
    before_validation :set_layout_id
    def set_layout_id 
      self.layout_id = self.parent.layout_id if self.layout_id.blank? && self.parent_id
    end   
    
    before_validation :set_site_id
    def set_site_id 
      self.site_id = self.parent.site_id if self.site_id.blank? && self.parent_id
    end
    
    before_validation :set_slug
    def set_slug  
      self.slug = if root?
        '/'
      else
        self.slug = self.slug.blank? ? sanitize(self.title) : sanitize(self.slug) 
      end 
    end  
    
    before_save :create_parts 
    def create_parts  
      if self.parts.empty?
        types = self.layout.part_types 
        types.each do |type|
          part = Part.new :name => type.name
          self.parts << part
        end
      end
    end  
    
    def sanitize(text)
      text.gsub(/[^a-z0-9-]+/i, '-').downcase
    end  
    
    def clean_path(path)
      "/#{ path.strip }/".gsub(%r{//+}, '/')
    end    

end