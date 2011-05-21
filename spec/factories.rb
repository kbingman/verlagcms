Factory.define :artist do |f|
  f.name 'Egon'
  f.bio 'Bio' 
end 

Factory.define :asset do |f|
  f.title 'Image'
  f.tag_list  'tag1, tag2'
  f.file File.open root_path('/spec/data/830px-Tieboardingcraft.jpg')  
end   

Factory.define :page do |f|
  f.title  'Home'
end  

Factory.define :part do |f|
  f.name 'body'
  f.content  ''
end 

Factory.define :site do |f|
  f.name 'The Daily Scan'
  f.subdomain  'scans'
end
