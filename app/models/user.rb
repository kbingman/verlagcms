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
  
  key :role_id, Integer, :default => 1
  def role 
    Role.find self.role_id
  end
  
  def is_admin?
    self.role_id >= Role['admin'].id
  end
  
  def is_super_user?
    self.role_id >= Role['superuser'].id
  end
  
  def updatable_by?(user)
    user == self || user.is_admin?
  end
  
  validates_presence_of :name, :message => :required
  validates_uniqueness_of :slug, :message => :must_be_unique
  
  timestamps!
  
  # scope :by_site
  def self.by_site(site, admin = false)
    self.where :site_ids => { :$all => [site.id] }
  end
  
  def self.by_multiple_sites(sites, admin = false)
    site_ids = sites.collect{ |s| s.id }
    self.where :site_ids => { :$in => site_ids }
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
  
  def as_json(options)
    super(:except => [:site_ids], :methods => [:role]) 
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
    # after_save :set_sites
    # def set_sites
    #   sites = self.sites
    #   sites.each do |site|
    #     site.users << self
    #     site.save
    #   end
    # end
  
  
end