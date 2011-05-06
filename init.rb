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
  

require 'mongo_mapper'
require 'joint'
require 'hunt'
require 'rack/cache'
require 'mustache/sinatra'
require 'rack/cache' 
require 'haml'

require 'lib/rack/raw_upload'

class Main < Monk::Glue

  set :app_file, __FILE__   
  
  set :haml, { :format => :html5, :ugly => RACK_ENV == 'development' ? false : true } 
  set :default_content_type, :html
  
  # Rack Middleware 
  use Rack::Cache,
    :verbose => true,
    :metastore => 'file:tmp/cache/meta', 
    :entitystore => 'file:tmp/cache/body'       
  use Rack::Session::Cookie  
  use Rack::RawUpload 
  
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

# This needs to be required first or Artist blows up...
require root_path('app/models/asset.rb')
# This needs to be required first or Üage blows up...
require root_path('app/models/page_part.rb')  

# Load all application files.
Dir[root_path('app/**/*.rb')].each do |file|
  require file
end   

# Adds a search_all method to Hunt, which finds only items with all terms 
# TODO move to lib
module Hunt
  module ClassMethods   
    def search_all(term)
      where('searches.default' => {'$all' => Util.to_stemmed_words(term) })
    end
  end
end

if defined? Encoding
  Encoding.default_external = Encoding::UTF_8
end

Main.run! if Main.run?
