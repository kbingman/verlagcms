object false
code(:now) { (Time.now.to_f * 1000).to_i }
code :pages do 
  @pages 
end
code :folders do 
  @site.folders 
end
# code(:assets) { 
#   @site.assets 
# }
code(:templates) { 
 @site.templates 
}
code(:users) { 
  @site.users 
}