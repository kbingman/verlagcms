class DataDrop < Liquid::Drop
  
  def initialize page, request=nil
    @page = page 
    @request = request
  end
  
  def before_method(meth) 
    part = @page.parts.detect { |p| p.name == meth.to_s }   
    edit = @request.params['edit'] unless @request.nil?
    if part
      part.render(edit)
    else
      ''
    end 
  end

end