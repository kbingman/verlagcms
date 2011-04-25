ROOT_DIR = File.expand_path(File.dirname(__FILE__)) unless defined? ROOT_DIR

require 'rubygems'  
require "bundler/setup"

Bundler.setup

require 'monk/glue'
require 'sinatra/base'
require 'sinatra/namespace'

require 'mongo_mapper'
require 'joint'
require 'hunt'
require 'rack/cache'
require 'mustache/sinatra'
require 'rack/cache'

require 'lib/rack/raw_upload'

class Main < Monk::Glue
  register Sinatra::Namespace
  
  set :app_file, __FILE__ 
  set :haml, { :format => :html5, :ugly => RACK_ENV == 'development' ? false : true }
  
  set :default_content_type, :html
  set :assume_xhr_is_js, false

  use Rack::Cache,
    :verbose => true
  use Rack::Session::Cookie  
  use Rack::RawUpload
  register Mustache::Sinatra
  
  set :mustache, {
    :views     => root_path('app/views'),
    :templates => root_path('app/views'),
    :namespace => Main }

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
# Load all application files.
Dir[root_path('app/**/*.rb')].each do |file|
  require file
end

if defined? Encoding
  Encoding.default_external = Encoding::UTF_8
end

Main.run! if Main.run?
