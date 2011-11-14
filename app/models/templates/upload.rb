require './app/models/template.rb'

class Upload < Template
  
  # Plugins
  # ----------------------------------------
  plugin Joint # add the plugin
  attachment :file # declare an attachment named file
  
  # key :part_types_ids, Array
  # many :part_types, :in => :part_types_ids
  
  def path
    "/templates/files/#{self.id}/#{self.file_name}"
  end
  
  def content 
    nil
  end
  
  def mode
    'file'
  end
  
  
  def as_json(options)
    super(:methods => [:klass, :class_name, :mode, :part_types, :layout?, :path])
  end
  
  protected

  
end
