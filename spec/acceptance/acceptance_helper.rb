ENV['RACK_ENV'] = 'test'

require File.join(File.dirname(__FILE__), '..', '..', 'init.rb')

require 'steak'
require 'capybara'
require 'capybara/dsl'
require 'capybara/zombie'
require 'faker'

require 'factory_girl'
require File.join(File.dirname(__FILE__), '../factories.rb')

RSpec.configuration.include Capybara::DSL, :type => :acceptance

# Capybara.default_driver = :zombie
Capybara.app = Main

# Put your acceptance spec helpers inside /spec/acceptance/support
# Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each {|f| require f}
