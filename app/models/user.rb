class User
  include MongoMapper::Document
  include Canable::Cans
  include Canable::Ables
  # plugin MongoMapper::Plugins::IdentityMap
  
  key :name, String 
  key :slug, String
  key :email, String
  key :crypted_password, String
  
  key :site_ids, Array
  many :sites, :in => :site_ids  
  
  validates_presence_of :name, :message => :required
  validates_uniqueness_of :slug, :message => :must_be_unique
  
  timestamps!
  
  # scope :by_site
  def self.by_site(site, admin = false)
    self.where :site_ids => { :$all => [site.id] }
  end
  
  def password
    @password ||= BCrypt::Password.new(self.crypted_password) if self.crypted_password
  end

  def password=(new_password)
    if new_password == '' && !self.crypted_password.nil?
      @confirm_password = false
    else
      @password = BCrypt::Password.create(new_password, :cost => 10)
      self.crypted_password = @password
    end
  end

  # Class Methods
  def self.authenticate(site, email, password)
    u = self.find_by_email email
    if u && u.site_ids.include?(site.id) && u.password == password # 
      u
    else
      nil
    end
  end
  
  protected
  
    before_save :set_slug
    def set_slug
      if self.slug.nil?
        self.slug = ActiveSupport::Inflector.parameterize(self.name, '-') 
      else
        self.slug = ActiveSupport::Inflector.parameterize(self.slug, '-') 
      end
    end
    
    # This is required because of the one sided has_many issues
    after_save :set_sites
    def set_sites
      sites = self.sites
      sites.each do |site|
        site.users << self
        site.save
      end
    end
  
  
end