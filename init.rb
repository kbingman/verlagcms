ROOT_DIR = File.expand_path(File.dirname(__FILE__)) unless defined? ROOT_DIR

require 'rubygems'  
require "bundler/setup"  

Bundler.setup

require 'monk/glue'
require 'sinatra/base'
require 'sinatra/namespace'    

# Improve this...
require 'vendor/sinatra-basicauth/lib/sinatra/basic_auth'
require 'lib/sinatra/respond_to'  
require 'lib/sinatra/logger' 
require 'lib/sinatra/images' 
require 'lib/sinatra/get_subdomain' 

require 'mongo_mapper'
require 'joint'
require 'hunt'
require 'rack/cache'
require 'mustache/sinatra'
require 'rack/cache' 
require 'rack/request' 
require 'haml' 
require 'liquid' 
require 'RedCloth'

require 'lib/rack/raw_upload'
require 'lib/rack/subdomains'
require 'lib/hunt/search_all'  

require 'lib/liquid/page_drop'
require 'lib/liquid/data_drop'
require 'lib/liquid/data_proxy' 
 
require 'jim'

class Main < Monk::Glue

  set :app_file, __FILE__   
  set :sass, { 
    :cache => RACK_ENV == 'development' ? false : true, 
    :cache_location => './tmp/sass-cache',
    :style => :compact }
  set :haml, { 
    :format => :html5, 
    :ugly => RACK_ENV == 'development' ? false : true } 
  set :default_content_type, :html
  
  # Rack Middleware 
  use Rack::Cache,
    :verbose => true,
    :metastore => 'file:tmp/cache/meta', 
    :entitystore => 'file:tmp/cache/body'       
  use Rack::Session::Cookie  
  use Rack::RawUpload  
  
  # use Jim::Rack, :bundle_uri => '/js/'
  
  register Mustache::Sinatra  
  set :mustache, {
    :views     => root_path('app/views'),
    :templates => root_path('app/views'),
    :namespace => Main }
  
  # Extensions    
  register Sinatra::Namespace  
  register Sinatra::BasicAuth 
  register Sinatra::Logger 
  register Sinatra::RespondTo  
  register Sinatra::Images 
  register Sinatra::GetSubdomain
  
  configure do
    mime_type :mustache, 'text/mustache' 
    mime_type :'octet-stream', 'application/octet-stream' 
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

require root_path('app/models/template.rb') 
# This needs to be required first or Artist blows up...
require root_path('app/models/asset.rb')
# This needs to be required first or Page blows up...
require root_path('app/models/part.rb')  

# Load all application files.
Dir[root_path('app/**/*.rb')].each do |file|
  require file
end    

if defined? Encoding
  Encoding.default_external = Encoding::UTF_8
end

Main.run! if Main.run?
