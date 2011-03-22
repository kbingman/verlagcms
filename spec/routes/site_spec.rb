require 'spec_helper'

describe "routes/site" do
  include Rack::Test::Methods
  
  # before(:each) do
  #   Main.class_eval do
  #     helpers do
  #       def authenticated?
  #         false
  #       end
  #     end
  #   end
  # end
 
  it 'should show the home page' do
    get '/'
    last_response.should be_ok
  end
  
  it 'should show the 404 page' do
    get '/fibble/bits'
    last_response.status.should == 404
  end
  
  it 'should redirect the assets search' do
    get '/search', :query => 'naked'
    follow_redirect!
    last_request.url.should == 'http://example.org/assets/naked'
  end
  
  it 'should sanitze the query params before redirect' do
    get '/search', :query => 'naked girls'
    follow_redirect!
    last_request.url.should == 'http://example.org/assets/naked+girls'
  end
  
  context 'mustache templates' do
    it 'should show the asset template' do
      get '/search' 
      # Very basic way of checking for the mustache template
      last_response.body.should include("type='mustache'")
    end
    
    it 'should set the asset template id' do
      get '/search' 
      last_response.body.should include("assets-list-template")
    end
    
    it 'should include the template' do
      # pending 'Whitespace makes this fail'
      template = File.open(root_path(File.join('app/views/', 'pages', 'assets_list.mustache')))
      get '/search' 
      last_response.body.should include(template.read.html_safe)
    end
  end
  
end