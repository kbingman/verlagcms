ENV['RACK_ENV'] = 'test'
        
require 'spec/spec_helper'   

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

def screen_shot_and_save_page(title)
  require 'capybara/util/save_and_open_page'
  path = "tmp/capybara/#{title}-#{Time.now.strftime('%Y-%m-%d-%H-%M-%S')}"
  # Capybara.save_page body, "#{path}.html"
  begin
    page.driver.render "#{path}.png"
  rescue Exception => e
    puts "Snapshots not available for this environment.\n
      Have you got gem 'capybara-webkit' in your Gemfile and have you enabled the javascript driver?"
  end
end

# begin
#   After do |scenario|
#     screen_shot_and_save_page if scenario.failed?
#   end
# rescue Exception => e
#   puts "Snapshots not available for this environment.\n
#     Have you got gem 'capybara-webkit' in your Gemfile and have you enabled the javascript driver?"
# end
