require 'spec_helper'

describe "routes/api/v1'/export" do
  include Rack::Test::Methods
  
  before(:all) do    
    teardown
    build_complete_site 
    setup_site                   
    @asset = Factory(:asset, :site_id => @site.id, :file => File.open(root_path('spec/data/830px-Tieboardingcraft.jpg')))   
    @assets = [@asset]
  end 
  
  after(:all) do
    teardown
  end   
  
  context 'GET assets' do
    
    context 'json' do   
      def do_get
        get '/api/v1/export/assets.json'
      end
    
      it 'should be successful' do
        do_get    
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_get
        last_response.headers['Content-Type'].should == 'application/json;charset=utf-8'
      end
    
      it 'should include assets in the json' do
        do_get
        last_response.body.should include(@asset.name)
      end 
    end
    
  end  
  
  context 'POST assets' do
    
    context 'json' do   
      def do_post
        post '/api/v1/export/assets', :file => File.open(root_path('spec/data/assets.json')) 
      end
    
      it 'should be redirect' do
        pending
        do_post    
        last_response.should be_redirect
      end
      
    end
    
  end
end