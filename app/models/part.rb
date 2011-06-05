class Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  key :content, String
  
  liquid_methods :name, :content, :render   
  
  def render 
    if self.content
      RedCloth.new(self.content).to_html
    else
      ''
    end
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