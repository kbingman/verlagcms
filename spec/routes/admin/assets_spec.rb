require 'spec_helper'

describe "routes/admin/assets" do
  include Rack::Test::Methods
  
  before(:all) do    
    teardown
    build_complete_site 
    setup_site                   
    @asset = Factory(:asset, :site_id => @site.id)   
    @assets = [@asset]
  end 
  
  after(:all) do
    teardown
  end   
  
  context 'GET index' do
    
    context 'json' do   
      def do_get
        get '/admin/assets.json'
      end
    
      it 'should be successful' do
        do_get    
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_get
        last_response.headers['Content-Type'].should == 'application/json'
      end
    
      it 'should include assets in the json' do
        do_get
        last_response.body.should include(@asset.to_json)
      end 
      
      it 'should not include assets from other sites' do   
        @alien_site = Factory(:site, :name => 'Alien', :subdomain => 'alien')
        @alien_asset = Factory(:asset, :site => @alien_site, :title => 'Alien') 
        do_get 
        last_response.body.should_not include(@alien_asset.to_json) 
      end 
    end
    
  end  
  
  context 'POST create' do
    
    context 'html' do 
      def do_post
        post "/admin/assets", :file => File.open(root_path('/spec/data/830px-Tieboardingcraft.jpg')), :file => { :filename => '830px-Tieboardingcraft.jpg' }
      end
      
      it 'should be a redirect' do
        do_post
        last_response.should be_redirect
      end
    end
    
    context 'json' do 
      def do_post
        post "/admin/assets.json", :file => File.open(root_path('/spec/data/830px-Tieboardingcraft.jpg')), :file => { :filename => '830px-Tieboardingcraft.jpg' }
      end
      
      it 'should be successful' do
        do_post
        last_response.should be_ok 
      end  
      
      it 'should set the content header to json' do
        do_post
        last_response.headers['Content-Type'].should == 'application/json'
      end 
      
      it 'should return the filename in the json' do
        do_post                       
        JSON.parse(last_response.body)['title'].should == '830px-Tieboardingcraft' 
      end
    end
    
  end   
  
  context 'PUT update' do  
          
    context 'json' do   
      def do_put
        put "/admin/assets/#{@asset.id}.json", :asset => { :title => 'Really Awesome Image' }
      end
    
      it 'should be successful' do
        do_put
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_put
        last_response.headers['Content-Type'].should == 'application/json'
      end
      
      it 'should include the title in the json' do  
        do_put
        last_response.body.should include('Really Awesome Image')
      end  
    end
  
  end
  
  context 'DELETE destroy' do  

    before(:each) do 
      @kill_me = Factory(:asset, :title => 'killme', :site_id => @site.id)    
    end

    context 'json' do    
      def do_delete
        delete "/admin/assets/#{@kill_me.id}.json"
      end

      it 'should be successful' do
        do_delete
        last_response.should be_ok
      end

      it 'should set the content header to json' do
        do_delete
        last_response.headers['Content-Type'].should == 'application/json'
      end 

      it 'should delete the site' do 
        asset_id = @kill_me.id
        do_delete
        Asset.find(asset_id).should be_nil
      end
    end

  end
  
  
end