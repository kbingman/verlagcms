require 'spec_helper'

describe "routes/assets" do
  include Rack::Test::Methods
  
  before(:all) do 
    # Stub this
    @page = Page.make :parent_id => nil
  end 
  
  after(:all) do
    teardown
  end   
  
  context 'GET index' do
    
    context 'html' do 
      def do_get
        get '/pages'
      end
      
      it 'should be successful' do
        do_get
        last_response.should be_ok
      end
      
      it 'should set the content header to html' do
        do_get
        last_response.headers['Content-Type'].should == 'text/html;charset=utf-8'
      end
    end
    
    context 'json' do   
      def do_get
        get '/pages.json'
      end
    
      it 'should be successful' do
        do_get
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_get
        last_response.headers['Content-Type'].should == 'application/json'
      end
    
      it 'should include pages in the json' do  
        pending
        do_get
        last_response.body.should include(@page.to_json)
      end  
    end
    
  end
  
end