class Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  key :content, String
  
  key :page_id, ObjectId
  belongs_to :page
  
  # validates :name, :uniqueness => true
  
  liquid_methods :name, :content, :render, :id 
  
  def path
   "/pages/#{self.page_id}/parts/#{self.id}" 
  end
  
  def render(edit=false)
    if edit == 'true' 
      # This is used for the inline editor, setting a small flag with the edit page / part path
      r =  "<span class='part-editor' id='editor-#{self.id}'>"
      r += "<a class='verlag-editor' href='##{self.path}/edit'>"
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
  
  # validate :unique_name
  # 
  # def unique_name 
  #   exisiting_names = self.parts.collect{ |p| p.name }
  #   if exisiting_names.include(self.name)
  #     errors.add( :name, "Name must be unique")
  #   end
  # end
  
end