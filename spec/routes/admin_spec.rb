require 'spec_helper'

describe "routes/site" do
  include Rack::Test::Methods   
  
  before(:all) do  
    teardown
    build_complete_site 
    setup_site
  end
  
  context 'mustache templates' do
    
    it 'should include the admin/pages show template' do
      pending
      template = File.open(root_path(File.join('app/assets/templates/', 'admin', 'pages', 'show.mustache')))
      get '/templates' 
      last_response.body.should include(template.read.html_safe)
    end
    
    it 'should include the admin/pages index template' do
      pending
      template = File.open(root_path(File.join('app/assets/templates/', 'admin', 'pages', 'node.mustache')))
      get '/templates'
      last_response.body.should include(template.read.html_safe)
    end
    
    it 'should include the admin/pages edit template' do
      pending
      template = File.open(root_path(File.join('app/assets/templates  /', 'admin', 'pages', 'edit.mustache')))
      get '/templates' 
      last_response.body.should include(template.read.html_safe)
    end
    
  end
end