ENV['RACK_ENV'] = 'test'

require File.join(File.dirname(__FILE__), '..', '..', 'init.rb')

require 'steak'
require 'capybara'
require 'capybara/dsl'
require 'capybara/zombie'
require 'faker'

require 'machinist/mongo_mapper'
require File.join(File.dirname(__FILE__), '../blueprints.rb')

RSpec.configuration.include Capybara, :type => :acceptance

# Capybara.default_driver = :zombie
Capybara.app = Main

# Put your acceptance spec helpers inside /spec/acceptance/support
# Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each {|f| require f}
