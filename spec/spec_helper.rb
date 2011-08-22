ENV['RACK_ENV'] = 'test'

# require File.expand_path(File.join(File.dirname(__FILE__), "..", "init"))
require File.join(File.dirname(__FILE__), '..', 'init.rb')

require 'rubygems'
require 'bundler'
Bundler.setup :test

require 'rack/test'  
require 'rspec' 

require 'faker'
require 'factory_girl' 
require File.join(File.dirname(__FILE__), 'factories.rb') 

RSpec.configure do |conf|
  
  include Rack::Test::Methods
  include RSpec::Expectations 
  include RSpec::Matchers 
  
  def app
    Main.new
  end 
  
  conf.before(:all) do
    teardown 
    @site = Factory(:site)
    @current_user = Factory.build(:user)
    @current_user.sites << @site
    @current_user.save
  end
  
  conf.after(:all) do        
    teardown
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
  
  def setup_site    

    Main.class_eval do
      helpers do
        
        def current_site
          Site.first
        end   
        
        def current_user
          User.first
        end
        
        def authenticated?
          true
        end
        
      end
    end 
  end  
  
  # before(:each) do
  #   Main.class_eval do
  #     helpers do
  #       def authenticated?
  #         false
  #       end
  #     end
  #   end
  # end

end
