ROOT_DIR = File.expand_path(File.dirname(__FILE__)) unless defined? ROOT_DIR

require 'rubygems'  
require "bundler/setup"

Bundler.setup

require 'monk/glue'

# require 'haml'
require 'sass'  
require 'mongo_mapper'
require 'joint'
require 'hunt'
require 'rack/cache'
require 'mustache/sinatra'

class Main < Monk::Glue
  set :app_file, __FILE__ 
  set :haml, { :format => :html5, :ugly => true }

  # set :layout => root_path('app/views/layouts/application')

  use Rack::Session::Cookie  
  register Mustache::Sinatra

  require root_path('app/views/layouts/application')
  set :mustache, {
    :views     => root_path('app/views'),
    :templates => root_path('app/views'),
    :namespace => Main }

end

# Connect to mongodb
if ENV['MONGOHQ_URL']
  puts "Running on MongoHQ" 
  MongoMapper.config = {RACK_ENV => {'uri' => ENV['MONGOHQ_URL']}}
  MongoMapper.connect(RACK_ENV)
else
  puts "Using local database" 
  MongoMapper.database = monk_settings(:mongo)[:database]
  MongoMapper.connection = Mongo::Connection.new(monk_settings(:mongo)[:host], nil, :logger => logger)
end

# Sinatra no longer allows .haml static files, so we have to trick it
# module Sinatra
#   module Helpers
#     def content_type(type, params={})
#       mime_type = (type == '.mustache' || type =='.otf' || type =='.template') ? 'text/plain' : mime_type(type)
#       fail "Unknown media type: %p" % type if mime_type.nil?
#       params[:charset] ||= params.delete('charset') || settings.default_encoding
#       response['Content-Type'] = "#{mime_type};#{params.map { |kv| kv.join('=') }.join(', ')}"
#     end
#   end
# end

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
