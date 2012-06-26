source 'http://rubygems.org'

gem 'rack', '~> 1.4.0' 
gem 'sinatra', :require => 'sinatra/base'
gem 'tilt', '~> 1.3' 
gem 'sinatra-contrib', '1.3.1' 
gem 'sinatra-namespace'
gem 'thin' 

gem 'warden'
gem 'bcrypt-ruby'

# Mongomapper and plugins
gem 'mongo_mapper', '~> 0.9.2'
gem 'mongo_ext', :require => 'mongo'
gem 'mongo', '1.3'
gem 'bson', '1.3'
gem 'bson_ext', '1.3'  
gem 'hunt', '~> 0.4'
gem 'fast-stemmer', '~> 1.0'
gem 'joint', '~> 0.6.0'
gem 'mongo_mapper_acts_as_tree', '~> 0.3.3' 
gem 'canable', '~> 0.2.0' # :path => 'vendor/canable'

gem 'mini_magick'

gem 'haml'  
gem 'sass'
gem 'rabl', '~> 0.3.0' 
gem 'mustache', '~> 0.99.4'
gem 'RedCloth' 

gem 'sprockets', '~>2.0.2'
gem 'uglifier', '~>1.0.3'

gem 'json'
gem 'rack-flash'
gem 'rack-cache'
gem 'dalli'

group :production do 
  
end

group :development do
  gem 'rake'
  gem 'thor'  
  gem 'monk' 
  gem 'guard-sprockets2'
end

group :test do
  gem 'rack-test'
  gem 'test-unit'
  gem 'rspec', '>= 2.5.0'
  gem 'capybara'
  gem 'yajl-ruby'
  # gem 'capybara-zombie', :path => 'vendor/capybara-zombie' # 
  gem 'capybara-webkit', :git => 'https://github.com/thoughtbot/capybara-webkit.git'
  gem 'factory_girl' #, :git => 'https://github.com/thoughtbot/factory_girl.git'
  gem 'faker'
  gem 'jasmine'
end