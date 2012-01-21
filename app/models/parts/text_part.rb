require './app/models/parts/part.rb'

class TextPart < Part
  
  # def admin_path
  #  "/admin/pages/#{self.page.id}/parts/#{self.id}" 
  # end

  def render
    if self.edit == true 
      # This is used for the inline editor, setting a small flag with the edit page / part path
      r =  "<div class='editable part #{self.name} textile' id='part-#{self.id}'>"
      r += self.content.blank? ? '<p>&nbsp;</p>' : RedCloth.new(self.content).to_html 
      r += '</div>'
    else
      # TODO figure out if we want to wrap this in a div...
      # r =  "<div class='part #{self.name}' id='#{self.name}_part'>"
      r = self.content.blank? ? '<p>&nbsp;</p>' : RedCloth.new(self.content).to_html 
      # r += '</div>'
      #
    end
    r
  end
  
  def as_json(options)
    super(:methods => [:admin_path, :file_name, :title])
  end
    
end