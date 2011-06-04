require 'spec_helper'

describe "routes/assets" do
  include Rack::Test::Methods
  
  before(:all) do 
    setup_site
    @layout = Factory(:layout, :site => @site)    
  end 
  
  after(:all) do
    teardown
  end   
  
  context 'GET index' do
    
    context 'json' do   
      def do_get
        get '/admin/layouts.json'
      end
    
      it 'should be successful' do
        do_get
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_get
        last_response.headers['Content-Type'].should == 'application/json'
      end
    
      it 'should include layouts in the json' do  
        do_get     
        last_response.body.should include(@layout.name)
      end   
      
      it 'should not include layouts from other sites' do   
        @alien_site = Factory(:site, :name => 'Alien', :subdomain => 'alien')
        @alien_layout = Factory(:layout, :site => @alien_site, :name => 'Alien Layout') 
        do_get 
        last_response.body.should_not include(@alien_layout.name)  
      end
    end
    
  end 

end