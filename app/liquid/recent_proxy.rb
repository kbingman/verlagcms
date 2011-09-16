class RecentProxy
  
  def initialize page, request=nil
    @page = page 
    @request = request
  end  
  
  def to_liquid
    RecentDrop.new(@page, @request)
  end  
  
  def method_missing(meth) 
    children = @page.children.all(:limit => meth.to_i)
    children
  end

end