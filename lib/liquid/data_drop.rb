class DataDrop < Liquid::Drop
  
  def initialize page, request=nil
    @page = page 
    @request = request
  end   
  
  def title
    @page.title
  end  
  
  def slug
    @page.slug
  end
   
  def before_method(meth) 
    part = @page.parts.detect { |p| p.name == meth.to_s }   
    edit = @request.params['edit'] unless @request.nil?
    if part
      if edit == 'true' 
        # This is used for the inline editor, setting a small flag with the edit page / part path
        "<div class='edit'><a href='#/pages/#{@page.id}/edit'>Edit</a></div>#{part.render}" 
      else
        part.render 
      end
    else
      ''
    end 
  end

end