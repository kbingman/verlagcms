class RequestDrop < Liquid::Drop 
    
  def initialize(request)
    @request ||= request
  end 
   
  def debug
    @request.inspect
  end
  
  def host
    @request.host
  end 
  
  def uri
    @request.path
  end 
  
  def params
    @request.params.inspect
  end
  
end