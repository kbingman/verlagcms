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
  context 'routes' do
    it 'should show the home page' do
      get '/'
      last_response.should be_ok
    end
    
    it 'should show the 404 page' do
      get '/fibble/bits'
      last_response.status.should == 404
    end
    
    context 'html' do
      # the '.html' is not visible in the browser, but is sent to sinatra
      
      it 'should redirect the assets search' do
        get '/search', :query => 'naked'
        follow_redirect!
        last_request.url.should == 'http://example.org/search/naked.html'
      end
      
      it 'should sanitze the query params before redirect' do
        get '/search', :query => 'naked girls'
        follow_redirect!
        last_request.url.should == 'http://example.org/search/naked+girls.html'
      end
    end
    
    context 'json' do
      it 'should redirect the assets search' do
        get '/search.json', :query => 'naked girls'
        follow_redirect!
        last_request.url.should == 'http://example.org/search/naked+girls.json'
      end
    end
  end
  
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
      template = File.open(root_path(File.join('app/views/', 'pages', 'assets_list.mustache')))
      get '/search' 
      last_response.body.should include(template.read.html_safe)
    end
  end
  
end