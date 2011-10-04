class Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true #, :unique => true 
  key :content, String
  
  key :page_id, ObjectId
  belongs_to :page
  
  # validates :name, :uniqueness => true
  
  liquid_methods :name, :content, :render, :id 
  
  def path
   "/admin/pages/#{self.page_id}/parts/#{self.id}" 
  end
  
  # This needs to be moved into the liquid methods, like the image part editor...
  def render(edit=false)
    if edit == 'true' 
      # This is used for the inline editor, setting a small flag with the edit page / part path
      r =  "<span class='part-editor' id='editor-#{self.id}' style='display:none;'>"
      r += "<a class='verlag-editor' href='#{self.path}/edit'>"
      r += "<span>Edit #{self.name}</span></a></span>"
      r += !self.content.blank? ? "#{RedCloth.new(self.content).to_html}" : 'Add Content Here'
      r
    else
      RedCloth.new(self.content).to_html if self.content
    end
  end
  
  def as_json(options)
    super(:methods => [:path])
  end
    
end