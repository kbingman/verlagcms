Factory.define :artist do |f|
  f.name { Faker::Name.first_name }
  f.bio 'Bio' 
end 

Factory.define :asset do |f|
  f.title { Faker::Name.first_name }
  f.tag_list  'tag1, tag2'
  f.file File.open root_path('/spec/data/830px-Tieboardingcraft.jpg') 
  # f.association :site
end 

Factory.define :javascript do |f|
  f.name 'Javascript'
  f.content '$(document).load(function(){});' 
  # f.association :site
end

Factory.define :layout do |f|
  f.name 'Layout'
  f.content  '<p></p>' 
  # f.association :site
end  

Factory.define :page do |f|
  f.title  { Faker::Name.first_name }  
  f.association :layout
  # f.association :site
end  

Factory.define :part do |f|
  f.name 'body'
  f.content  ''
end 

Factory.define :part_type do |f|
  f.name 'body'
  f.kind 'Part'
end

Factory.define :site do |f|
  f.name { Faker::Name.first_name } 
end 

Factory.define :stylesheet do |f|
  f.name 'CSS'
  f.content 'body: {}' 
  # f.association :site
end

Factory.define :user do |f|
  f.name { Faker::Name.first_name }
  f.email { Faker::Internet.email }
  f.role_id 100
end
