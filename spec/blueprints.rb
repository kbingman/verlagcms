Artist.blueprint do
  name 'Fred'
  bio 'Bio'
end

Asset.blueprint do
  title "Fred's Asset"
  tags ['tag1','tag2']  
  file File.open root_path('/spec/data/830px-Tieboardingcraft.jpg')
end   

Page.blueprint do
  title "Fred's Page"
end   

Part.blueprint do
  name "body"
end

