class Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  key :content, String
  
  key :page_id, ObjectId
  belongs_to :page
  
  liquid_methods :name, :content, :render   
  
  def render(edit=false)
    if edit == 'true' 
      # This is used for the inline editor, setting a small flag with the edit page / part path
      r =  "<div class='part-editor' id='editor-#{self.id}'>"
      r += "<a class='verlag-editor' href='#/pages/#{self.page_id}/parts/#{self.id}/edit'>"
      r += "<span>Edit #{self.name}</span></a></div>"
      r += self.content ? "#{RedCloth.new(self.content).to_html}" : 'Placeholder'
      r
    else
      RedCloth.new(self.content).to_html
    end
  end
  
  

  def image_path
    self.asset.image_path if self.asset 
  end
  
  def as_json(options)
    super(:methods => [:image_path])
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