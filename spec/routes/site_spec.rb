require 'spec_helper'

describe 'routes/site' do
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
    
    it 'should show the home page' do
      get '/'
      last_response.body.should include(@root.title)
    end
    
    it 'should show the 404 page' do 
      get '/fibble/bits'
      last_response.status.should == 404
    end
  end   
  
  # TODO move this to its own spec
  # context 'formats' do
  #   it 'should respond to html' do
  #     get '/search'
  #     last_response.headers['Content-Type'].should == 'text/html;charset=utf-8'
  #   end
  # 
  #   it 'should respond to json' do
  #     get '/search/naked.json'
  #     last_response.headers['Content-Type'].should == 'application/json;charset=utf-8'
  #   end
  # end  
  
end