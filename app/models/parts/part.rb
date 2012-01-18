class Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true #, :unique => true 
  key :content, String
  
  key :page_id, ObjectId
  belongs_to :page
  
  attr_accessor :edit
  
  # validates :name, :uniqueness => true
  
  liquid_methods :name, :content, :render, :id 
  
  def admin_path
   "/admin/pages/#{self.page_id}/parts/#{self.id}" 
  end
    
  def klass
    self.class.to_s.underscore.pluralize
  end
  
  def as_json(options)
    super(:methods => [:path, :klass, :admin_path, :file_name])
  end
    
end