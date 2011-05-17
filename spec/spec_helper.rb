ENV['RACK_ENV'] = 'test'

# require File.expand_path(File.join(File.dirname(__FILE__), "..", "init"))
require File.join(File.dirname(__FILE__), '..', 'init.rb')

require 'rubygems'
require 'bundler'
Bundler.setup :test

require 'rack/test'  
require 'rspec' 

require 'machinist/mongo_mapper'
require File.join(File.dirname(__FILE__), 'blueprints.rb')


RSpec.configure do |conf|
  
  include Rack::Test::Methods
  include RSpec::Expectations 
  include RSpec::Matchers 
  
  def app
    Main.new
  end    

  def t(text)
    I18n.translate(text)
  end
  
  # Drop all columns after each test case.
  def teardown
    MongoMapper.database.collections.each do |coll|
      coll.remove
    end
  end

end
