ENV['RACK_ENV'] = 'test'
        
require 'spec_helper'   

require 'capybara/rspec'
require 'capybara/dsl'
require 'yajl'
require 'capybara/zombie' 
require 'capybara-webkit'
require 'faker'

# require 'factory_girl'
# require File.join(File.dirname(__FILE__), '../factories.rb')

RSpec.configuration.include Capybara::DSL, :type => :acceptance

Capybara.default_driver = :webkit
Capybara.app = Main

# Put your acceptance spec helpers inside /spec/acceptance/support
# Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each {|f| require f}     

def setup_site     
  @site = Factory(:site) 
  Main.class_eval do
    helpers do
      
      def current_site
        @site ||= Site.first  
      end 
       
      def current_user
        @user ||= User.first
      end
      
      def authenticated?
        true
      end
      
    end
  end 
end

# Drop all columns after each test case.
def teardown
  MongoMapper.database.collections.each do |coll|
    coll.remove
  end
end
