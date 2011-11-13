ROOT_DIR = File.expand_path(File.dirname(__FILE__)) unless defined? ROOT_DIR

require 'rubygems'  
require 'bundler/setup' 

Bundler.setup

# # Monk and Sinatra
require 'monk/glue'
# require 'sinatra/base' 
# require 'sinatra/advanced_routes'  
require 'sinatra/namespace'   
# 
# # Warden / Login
require 'warden'
require 'bcrypt'
# 
# # Sinatra Extensions
require './lib/sinatra/basic_auth'
require './lib/sinatra/respond_to'  
require './lib/sinatra/logger' 
require './lib/sinatra/images' 
require './lib/sinatra/get_subdomain' 
require './lib/rack/subdomains'
require './lib/hunt/search_all'
# # require './lib/sinatra/rest_controller'
# 
# # Mongo stuff
require 'mongo_mapper'
require 'joint'
require 'hunt'
require 'canable'
# 
# # Rack
require 'memcached'
require 'rack/cache'
require 'rack/request' 
require 'rack/raw_upload'
# 
# # Templating
require 'mustache/sinatra'
require 'haml' 
require 'liquid' 
require 'RedCloth' 
require 'rabl'
# require 'active_support/core_ext'
# require 'active_support/inflector'
# require 'builder'
# # require 'jim'
# 
# # require './lib/rack/raw_upload'


class Main < Monk::Glue

  set :app_file, __FILE__    
  set :views, root_path('app', 'views') 
  set :sass, { 
    :cache => RACK_ENV == 'development' ? false : true, 
    :cache_location => './tmp/sass-cache',
    :style => RACK_ENV == 'development' ? :compact : :compressed,
    :css_location => root_path('public') }
  set :haml, { 
    :format => :html5, 
    :ugly => RACK_ENV == 'development' ? false : true } 
  set :default_content_type, :html
  set :mustache, {
    :views     => 'app/views/',
    :templates => 'app/views/'
  }
  
  # Not sure if this is the correct syntax
  register Rabl
  
  # Rack Middleware 
  $cache = Memcached.new
  use Rack::Cache,
    :verbose => false,
    :metastore => $cache,
    # :metastore => 'file:tmp/cache/meta', 
    :entitystore => 'file:tmp/cache/body'       
  use Rack::Session::Cookie, 
    :secret => 'fibble this must be longer',
    :expire_after => 604800 # One Week
  use Rack::RawUpload
  
  # use Jim::Rack, :bundle_uri => '/js/'
  
  # Extensions    
  register Sinatra::Namespace  
  register Sinatra::BasicAuth 
  register Sinatra::Logger 
  register Sinatra::RespondTo  
  register Sinatra::Images 
  register Sinatra::GetSubdomain 
  # register Sinatra::AdvancedRoutes 
  # register Mustache::Sinatra
  Rabl.register!

  configure do
    mime_type :mustache, 'text/mustache' 
    mime_type :'octet-stream', 'application/octet-stream' 
  end

  use Warden::Manager do |manager|
    manager.default_strategies :fibble
    manager.failure_app = Main
  end

end

# Connect to mongodb
if ENV['MONGOHQ_URL']
  puts "Running on MongoHQ" 
  MongoMapper.config = { RACK_ENV => {'uri' => ENV['MONGOHQ_URL']} }
  MongoMapper.connect(RACK_ENV)
else
  puts "Using local database" 
  MongoMapper.database = monk_settings(:mongo)[:database]
  MongoMapper.connection = Mongo::Connection.new(monk_settings(:mongo)[:host], nil, :logger => logger)
end

# Models

# These need to be required first or Page blows up...
# require root_path('app/models/templates/template.rb')


# Load all models.
Dir[root_path('app/models/**/*.rb')].each do |file|
  require file
end   

# Load all helpers.
Dir[root_path('app/helpers/*.rb')].each do |file|
  require file
end

# Load all admin routes, except the rest_controller.
# This is loaded last
Dir[root_path('app/routes/admin/*.rb')].each do |file|
  require file unless file.match('rest_controller')
end
# Loads this last so that one can easily override it
require root_path('app/routes/admin/rest_controller') 

# Load api routes
Dir[root_path('app/routes/api/*.rb')].each do |file|
  require file
end

# Load site and assets route. 
require root_path('app/routes/site.rb')

# Loud Mustache Views
Dir[root_path('./lib/views/*.rb')].each do |file|
  require file
end
  
# Load all views.
Dir[root_path('app/views/**/*.rb')].each do |file|
  require file
end

# Load all lib liquid files.
# Dir[root_path('app/liquid/**/*.rb')].each do |file|
#   require file
# end  

if defined? Encoding
  Encoding.default_external = Encoding::UTF_8
end

Main.run! if Main.run?
