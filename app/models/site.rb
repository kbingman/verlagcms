class Site
  include MongoMapper::Document
  include Canable::Ables
  
  key :name, String, :required => true, :unique => true 
  key :subdomain, String, :required => true, :unique => true 
  key :domain, String, :required => true, :unique => true 

  many :pages
  many :items
  many :assets
  many :folders 
  many :templates
  many :layouts   
  
  key :group_id, ObjectId #, :required => true
  belongs_to :group, :foreign_key => :group_id
  
  # key :user_ids, Array
  # many :users, :in => :user_ids
  
  def users
    User.by_site(self).all
  end
  
  def published?
    false
  end
  
  # Need to rename this... used in the REST controllers
  def self.by_site(site, admin = false)
    Site
  end
  
  def sites
    Site.all
  end
  
  def root
    self.pages.first :conditions => { :parent_id => nil }
  end  
  
  def children
    self.root.children
  end   
  
  def active_pages(parent_ids=nil)
    parent_ids = parent_ids ? (parent_ids << self.root.id) : [self.root.id]
    pages = Page.all(:conditions => { :site_id => self.id, :parent_id => parent_ids})  
    pages << self.root
    pages
  end
  
  def as_json(options)
    super(:methods => [:domain])
  end
  
  def tree(page=self.root)
    self.root.branch(page) 
  end
  
  def find_by_path(path)
    self.root.find_by_path(path)
  end
  
  # liquid_methods :name, :root, :children 
  
  # Permissions
  
  def viewable_by?(user)
    user.site_ids.include? self.site_id
  end
  
  def updatable_by?(user)
    user.site_ids.include?(self.id) && user.is_admin?
  end
  
  protected
    
    before_validation :set_subdomain
    def set_subdomain
      self.subdomain = self.subdomain.blank? ? sanitize(self.name) : sanitize(self.subdomain)
    end
    
    before_validation :set_domain
    def set_domain
      self.domain = self.domain.blank? ? "#{self.subdomain}.#{monk_settings(:domain)}" : sanitize(self.domain)
    end
    
    def sanitize(text)
      text.gsub(/[^a-z0-9\-.]+/i, '-').gsub(/\-$/,'').downcase
    end    
    
    after_create :create_default_template
    def create_default_template
       t = Layout.new :name => 'default'
       t.site_id = self.id 
       t.save   
     end
    
    after_create :create_root
    def create_root
      r = Page.new :slug => '/', :layout_id => self.templates.first.id, :title => 'Root' 
      r.site_id = self.id   
      r.save
    end
  
end