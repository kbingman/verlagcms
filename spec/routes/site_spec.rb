require 'spec_helper'

describe "routes/site" do
  include Rack::Test::Methods   
  
  before(:all) do  
    teardown
    build_complete_site 
    setup_site
  end
  
  after(:all) do
    teardown  
  end
  
  context 'routes' do
    it 'should show the home page' do
      get '/'
      last_response.should be_ok
    end
    
    it 'should show the 404 page' do 
      get '/fibble/bits'
      last_response.status.should == 404
    end
  end   
  
  # TODO move this to its own spec
  context 'formats' do
    it 'should respond to html' do
      get '/search'
      last_response.headers['Content-Type'].should == 'text/html;charset=utf-8'
    end
  
    it 'should respond to json' do
      get '/search/naked.json'
      last_response.headers['Content-Type'].should == 'application/json'
    end
  end  
    
  context 'mustache templates' do
    it 'should set the content headers' do
      get '/templates/admin/pages/show.mustache' 
      # Very basic way of checking for the mustache template
      # last_response.headers.should include("mustache")
    end
    
    # it 'should set the asset template id' do
    #   get '/templates/admin/pages/show.mustache' 
    #   last_response.body.should include("asset-list-template")
    # end
    
    it 'should include the admin/pages show template' do
      template = File.open(root_path(File.join('app/views/', 'admin', 'pages', 'show.mustache')))
      get '/templates/admin/pages/show.mustache' 
      last_response.body.should include(template.read.html_safe)
    end
    
    it 'should include the admin/pages index template' do
      template = File.open(root_path(File.join('app/views/', 'admin', 'pages', 'node.mustache')))
      get '/templates/admin/pages/node.mustache'
      last_response.body.should include(template.read.html_safe)
    end
    
    it 'should include the admin/pages edit template' do
      template = File.open(root_path(File.join('app/views/', 'admin', 'pages', 'edit.mustache')))
      get '/templates/admin/pages/edit.mustache' 
      last_response.body.should include(template.read.html_safe)
    end
    
  end
  
end