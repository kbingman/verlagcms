ROOT_DIR = File.expand_path(File.dirname(__FILE__)) unless defined? ROOT_DIR
RACK_ENV = ENV['RACK_ENV'] ||= 'development' unless defined? RACK_ENV
# ROOT_DIR = $0 unless defined? ROOT_DIR

# Helper method for file references.
#
# @param args [Array] Path components relative to ROOT_DIR.
# @example Referencing a file in config called settings.yml:
#   root_path("config", "settings.yml")
def root_path(*args)
  File.join(ROOT_DIR, *args)
end

require 'rubygems'  
require 'bundler/setup' 
Bundler.setup

# Monk and Sinatra
# require 'monk/glue'
require 'sinatra/base'   
require 'sinatra/namespace' 
require 'sinatra/reloader' 
require 'sinatra/content_for'

# Warden / Login
require 'warden'
require 'bcrypt'

# Sinatra Extensions
require './lib/sinatra/basic_auth'
require './lib/sinatra/respond_to' 
require './lib/sinatra/images' 
require './lib/sinatra/files'
require './lib/sinatra/get_subdomain' 
require './lib/rack/subdomains'
# require './lib/rack/no_varnish'

# # Mongo stuff
require 'mongo_mapper'
require 'joint'
require 'hunt'
require './lib/hunt/search_all'
require 'mongo_mapper_acts_as_tree'
require 'canable'

# Rack
require 'rack/cache'
require 'rack/request' 
require 'dalli'
require 'sprockets'

# Templating
require 'mustache/sinatra'
require 'haml' 
require 'RedCloth' 
require 'rabl'

require 'yaml'

def monk_settings(key)
  $monk_settings ||= YAML.load_file(root_path("config", "settings.yml"))[RACK_ENV.to_sym]

  unless $monk_settings.include?(key)
    message = "No setting defined for #{key.inspect}."
    # defined?(logger) ? logger.warn(message) : $stderr.puts(message)
  end

  $monk_settings[key]
end


module AssetHelpers
  def asset_path(source)
    '/assets/' + settings.sprockets.find_asset(source).digest_path
  end
end


class Main < Sinatra::Base
  set :root, File.expand_path('../', __FILE__)
  set :sprockets, Sprockets::Environment.new(root_path('app/assets'))
  set :precompile, [ /\w+\.(?!js|css).+/, /(application|ace).(css|js)$/ ]
  # set :precompile, [ /.*/ ]
  set :assets_prefix, 'assets'
  set :assets_path, File.join(root, 'public', assets_prefix)
  

  # Not sure if this is the correct syntax
  register Rabl
  
  # Rack Cache
  # if RACK_ENV != 'development'
  use Rack::Cache,
    :verbose => true,
    # :metastore => "memcached://localhost:11211/meta",
    :metastore => 'file:tmp/cache/meta', 
    :entitystore => 'file:tmp/cache/body'       
  # end
  # use Rack::NoVarnish
  use Rack::Session::Cookie, 
    :secret => 'fibble this must be longer',
    :expire_after => 604800 # One Week
  
  # Extensions     
  register Sinatra::Namespace
  register Sinatra::RespondTo 
  # register Sinatra::Logger  
  register Sinatra::BasicAuth 
  register Sinatra::Images 
  register Sinatra::Files 
  register Sinatra::GetSubdomain 
  
  # Helpers
  helpers Sinatra::ContentFor

  Rabl.register!
  
  configure :development do
    register Sinatra::Reloader
  end
  
  set :dump_errors, true
  set :logging, true
  set :methodoverride, true
  set :raise_errors, Proc.new { test? }
  set :run, Proc.new { $0 == app_file }
  set :show_exceptions, Proc.new { development? }
  set :static, true
    
  set :app_file, __FILE__    
  set :views, File.join(root, 'app', 'views') 
  set :haml, { 
    format: :html5, 
    ugly: RACK_ENV == 'development' ? false : true 
  } 
  set :default_content_type, :html

  configure do
    mime_type :mustache, 'text/mustache' 
    mime_type :'octet-stream', 'application/octet-stream'
    mime_type :otf, 'application/font'
    mime_type :eot, 'application/font'
    mime_type :ttf, 'application/font'
    mime_type :woff, 'application/font' 
    
    sprockets.append_path(File.join(root, 'app', 'assets', 'stylesheets'))
    sprockets.append_path(File.join(root, 'app', 'assets', 'javascripts'))
    sprockets.append_path(File.join(root, 'app', 'assets', 'images'))

    sprockets.context_class.instance_eval do
      include AssetHelpers
    end
  end
  
  helpers do
    include AssetHelpers
  end
  

  use Warden::Manager do |manager|
    manager.default_strategies :fibble
    manager.failure_app = Main
  end

end

# Connect to mongodb
if ENV['MONGOHQ_URL']
  puts 'Running on MongoHQ' 
  MongoMapper.config = { RACK_ENV => {'uri' => ENV['MONGOHQ_URL']} }
  MongoMapper.connect(RACK_ENV)
else
  puts 'Using local database' 
  puts RACK_ENV
  MongoMapper.database = monk_settings(:mongo)[:database]
  MongoMapper.connection = Mongo::Connection.new(monk_settings(:mongo)[:host], nil)# , :logger => logger
end

# Models

# These need to be required first or Page blows up...
# require root_path('app/models/templates/template.rb')

require root_path('app/models/assets/item.rb')
require root_path('app/models/assets/asset.rb')
# require root_path('app/models/parts/part.rb')

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

# Load admin
require root_path('app/routes/admin.rb')
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
