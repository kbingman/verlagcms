class Site
  include MongoMapper::Document
  
  key :name, String, :required => true, :unique => true 
  key :subdomain, String, :required => true, :unique => true 

  many :pages
  many :assets
  many :templates   
  
  def root
    self.pages.first :conditions => { :parent_id => nil }
  end  
  
  def children
    self.root.children
  end  
  
  liquid_methods :name, :root, :children 
  
  protected
    
    before_validation :set_subdomain
    def set_subdomain
      self.subdomain = self.subdomain.blank? ? sanitize(self.name) :sanitize(self.subdomain)
    end
    
    def sanitize(text)
      text.gsub(/[^a-z0-9\-.]+/i, '-').gsub(/\-$/,'').downcase
    end
  
end