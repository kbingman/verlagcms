class Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true #, :unique => true 
  key :content, String
  
  # key :page_id, ObjectId
  # belongs_to :page
  
  embedded_in :page
  
  attr_accessor :edit
  
  # validates :name, :uniqueness => true
  
  # def admin_path
  #  "/admin/pages/#{self.page.id}/parts/#{self.id}" 
  # end
    
  def klass
    self.class.to_s.underscore.pluralize
  end
  
  def render
    if self.edit == true 
      # This is used for the inline editor, setting a small flag with the edit page / part path
      r =  "<div class='editable part #{self.name} textile' id='part-#{self.id}'>"
      r += self.content.blank? ? '<p>&nbsp;</p>' : self.content
      r += '</div>'
    else
      r = self.content.blank? ? '<p>&nbsp;</p>' : self.content
    end
    r
  end
  
  
  def as_json(options)
    super(
      :only => [ :id, :created_at, :name, :content ], 
      :methods => [ :path, :klass, :file_name, :render ]
    )
  end
    
end