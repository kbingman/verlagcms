require root_path('app/models/parts/part.rb')

class Page
  include MongoMapper::Document
  include Canable::Ables
  
  # Plugins
  # ----------------------------------------
  # plugin MongoMapper::Plugins::IdentityMap 
  plugin Hunt
  searches :title, :tags  
  before_save :index_search_terms  
  
  plugin MongoMapper::Plugins::ActsAsTree
  key :parent_id, ObjectId
  # belongs_to :parent, :class_name => 'Page', :foreign_key => :parent_id  
  # many :children, :class_name => 'Page', :dependent => :destroy, :foreign_key => :parent_id
  acts_as_tree :order => :slug
  
  
  # Attributes
  # ----------------------------------------
  key :title, String, :required => true
  key :slug, String, :required => true #, :unique => { :scope => :parent_id }
  key :description, String 
  key :level, Integer 
  key :tags, Array, :index => true  
  
  many :parts, :class_name => 'Part', :dependent => :destroy 
   
  # TODO Depracated please remove
  key :asset_ids, Array
  many :assets, :in => :asset_ids
  
  key :site_id, ObjectId, :required => true 
  belongs_to :site, :foreign_key => :site_id 
  
  key :layout_id, ObjectId, :required => true 
  belongs_to :layout, :foreign_key => :layout_id
  
  # Activity monitor
  many :activities, :as => :loggable

  timestamps!
  userstamps!
  
  attr_accessor :active
  
  # Permissions
  # ----------------------------------------
  def viewable_by?(user)
    user.site_ids.include? self.site_id
  end
  
  def updatable_by?(user)
    user.site_ids.include? self.site_id
  end
  
  # Validations
  # ----------------------------------------
  validates :title, :presence => true
  validates :slug, :uniqueness => { :scope => [:site_id, :parent_id] }
  
  # Accessible attributes
  # ----------------------------------------
  attr_accessible :title, :content, :slug, :parent_id, :layout_id, :parts, :assets_list, :tag_list

  # Scopes
  # ----------------------------------------  
  scope :all_roots, lambda { where(:parent_id => nil) } 
  scope :by_site,  lambda { |site| where(:site_id => site.id) } 
  
  
  # Page Tree
  # ----------------------------------------
  def root?
    self.parent.nil? ? true : false
  end 
  
  def child?
    self.parent.nil? ? false : true
  end 
  
  def children?
    self.children.empty? ? false : true
  end
  
  def child_count
    self.children.count
  end
  
  def padding  
    # this needs to be moved out of the model...
    self.level * 12
  end   
  
  def ancestor_ids
    self.ancestors.collect{ |a| a.id.to_s }
  end
  
  def class_name
    self.class.to_s
  end
  
  def contents
    # TODO bad hack. remove...
    JSON.parse(self.parts.to_json)
  end
  
  def open 
    self.root?
  end
  
  # def child_pages
  #   self.children.as_json
  # end
  
  # JSON API
  # ----------------------------------------
  def as_json(options)
    {
      :id           => self.id,
      :title        => self.title,
      :slug         => self.slug, 
      :path         => self.path, 
      :admin_path   => self.admin_path, 
      :level        => self.level,
      :padding      => self.padding, # remove
      :parent_id    => self.parent_id,
      :layout_id    => self.layout_id,
      :updated_at   => self.updated_at,
      :created_at   => self.created_at,
      :root?        => self.parent.nil? ? true : false,
      :child?       => self.parent.nil? ? false : true, 
      # :child_pages  => self.children.as_json, 
      :children?    => self.children?, 
      :open?        => self.children.empty? ? false : true, 
      :child_count  => self.children.count, 
      :contents     => self.parts.as_json
    }

    # super(:only => [
    #   :title, :slug, :path, :id, :level, :parent_id, :class_name, :created_at, :updated_at, :layout_id
    # ], :methods => [
    #   :path, :admin_path, :class_name, :padding, :tag_list, :root?, :child_pages, :children?, :child?, :open?, :child_count, :contents
    # ])
  end  
  
  def render(options={})
    edit = options[:edit] || false
    page_view = Main::Views::Page.new self, edit
    page_view.render()
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
  
  # TODO Depracated please remove
  # Assets
  # ----------------------------------------
  def assets_list
    self.assets.collect{ |a| a.id }.join(',')
  end
  
  def assets_list=(list)
    new_ids = list.split(',').map{ |t| t.strip }
    self.asset_ids = new_ids.uniq
  end  
  
  # Parts
  # ----------------------------------------
  def part_names
    self.parts.collect{ |p| p.name } 
  end
  
  def find_part_by_name(name)
    self.parts.detect { |p| p.name.downcase == name.downcase } 
  end
  
  # Paths
  # ----------------------------------------   
  def path
    self.parent.nil? ? slug : parent.child_path(self)
  end
  
  def edit_path
    "/edit#{self.path}"
  end
  
  def admin_path
    "/admin/pages/#{self.id}"
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
  
  # Class Methods
  # ----------------------------------------
  def self.find_by_path(path, site)
    root = site.root
    root.find_by_path(path)
  end
  
  protected
  
    # Before Validation
    # ----------------------------------------
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
    
    
    # Before Save
    # ----------------------------------------
    before_save :create_parts 
    def create_parts  
      # if self.parts.empty?
        types = self.layout.part_types 
        types.each do |type|    
          unless self.part_names.include?(type.name)
            klass = type.kind.constantize
            part = klass.new :name => type.name, :page_id => self.id
            self.parts << part 
          end
        end
      # end
    end  
    
    before_save :update_parts 
    def update_parts
      self.parts.each do |p|
        p.page_id = self.id
      end
    end
    
    
    # After Save
    # ----------------------------------------
    after_save :set_activity
    def set_activity
      a = Activity.new(:loggable => self)
      a.save
    end

    def sanitize(text)
      ActiveSupport::Inflector.parameterize(text, '-')
    end  
    
    def clean_path(path)
      "/#{ path.strip }/".gsub(%r{//+}, '/')
    end    

end