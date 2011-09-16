class SiteDrop < Liquid::Drop     
  
  def initialize site, request=nil
    @site ||= site   
    @request = request
  end
  
  def name
    @site.name 
  end
  
  def root 
    PageDrop.new @site.root, @request
  end
  
  def children
    children = []   
    @site.root.children.each do |child|
       children << PageDrop.new(child, @request) 
    end 
    children
  end
  
end