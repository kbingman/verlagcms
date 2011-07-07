class SearchDrop < Liquid::Drop
  
  def initialize site, request 
    @site = site
    @request = request 
  end   
  
  def results 
    query = @request.params['query']
    assets = Asset.by_site(@site.id).by_title(query).all  
    # assets = Asset.by_site(@site.id).by_title(query).search(query).all
    assets
  end

end