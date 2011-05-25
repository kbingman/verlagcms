class Site
  include MongoMapper::Document
  
  key :name, String, :required => true, :unique => true 
  key :subdomain, String, :required => true, :unique => true 

  many :pages, :class_name => 'Page', :dependant => :destroy 
  many :assets, :class_name => 'Asset', :dependant => :destroy  
    
  # def page_id
  #   self.page.id
  # end        
  
  protected
    
    before_validation :set_subdomain
    def set_subdomain
      self.subdomain = self.subdomain.blank? ? sanitize(self.name) :sanitize(self.subdomain)
    end
    
    def sanitize(text)
      text.gsub(/[^a-z0-9\-.]+/i, '-').gsub(/\-$/,'').downcase
    end
  
end