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
    # teardown 
    # @site = Factory(:site)
    # @current_user = Factory.build(:user)
    # @current_user.sites << @site
    # @current_user.save
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
  
  def build_complete_site
    @group = Factory(:group)
    @site = Factory(:site, :group => @group)
    @current_user = Factory.build(:user)
    @current_user.sites << @site
    @current_user.save
    
    @root = @site.root
    @layout = @site.templates.first 
    @layout.content = File.read 'spec/data/template.html'
    @part_type = Factory.build(:part_type, :name => 'sidebar', :layout_id => @layout.id)
    @layout.part_types << @part_type
    @layout.save
    # Creates default parts, should be automagical
    @root.save
    # Parts
    body = @root.parts.detect { |p| p.name == 'body' } 
    body.content = 'Root body' 
    sidebar = @root.parts.detect { |p| p.name == 'sidebar' }
    sidebar.content = 'Root sidebar'
    @root.save
    # More Pages
    @page = Factory(:page, :title => 'Page with Parts', :layout => @layout, :parent => @site.root) #:parts => [@part, @part2]
    @child = Factory(:page, :title => 'Child', :parent_id => @root.id, :tag_list => 'tag1, tag2', :layout => @layout)
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
  
end
