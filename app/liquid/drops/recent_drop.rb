class RecentDrop < Liquid::Drop
  
  def initialize page, request=nil
    @page = page 
    @request = request
  end
  
  def before_method(meth) 
    children = @page.children.all(:limit => meth.to_i)
    children
  end

end