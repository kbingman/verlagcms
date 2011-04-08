source "http://rubygems.org"

gem 'rack'
gem 'sinatra', '1.2'  
gem 'thin' 
gem 'monk-glue', :git => 'git://github.com/monkrb/glue.git'
gem 'rack-cache'

# Mongomapper and plugins
# Using vendor as it barfs on a warning sign...
gem 'mongo_mapper', :git => 'https://github.com/jnunemaker/mongomapper.git'
# gem 'mongo_mapper', :path => 'vendor/mongomapper'
gem 'mongo_ext', :require => 'mongo'
gem 'mongo', '1.1'
gem 'bson', '1.1'
gem 'bson_ext', '1.1'
# gem 'hunt', :git => 'https://github.com/jnunemaker/hunt.git'
gem 'hunt', :path => 'vendor/hunt'
gem 'joint', :git => 'https://github.com/jnunemaker/joint.git'
gem 'mini_magick'

gem 'haml'
gem 'mustache'

gem 'json'
gem 'rack-flash'
gem 'rack-cache'
gem 'thor'

group :test do
  gem 'rack-test'
  gem 'test-unit'
  gem 'rspec', '>= 2.5.0'
  gem 'steak', '>= 1.0.0'  
  gem 'capybara', :git => 'https://github.com/jnicklas/capybara.git'
  gem 'capybara-zombie', :git => 'https://github.com/plataformatec/capybara-zombie.git'
  gem 'machinist_mongo', :require => 'machinist/mongo_mapper'
  gem 'faker'
  # gem 'jasmine'
end