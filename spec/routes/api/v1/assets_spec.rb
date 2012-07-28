require 'spec_helper'

describe "routes/api/v1/assets" do
  include Rack::Test::Methods
  
  before(:all) do    
    teardown
    build_complete_site 
    setup_site                   
    @file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg'))
    @asset = Factory(:asset, site_id: @site.id, file: @file)   
    @assets = [@asset]
  end 
  
  after(:all) do
    teardown
  end   
  
  context 'GET index' do
    
    context 'json' do   
      def do_get
        get '/api/v1/assets.json'
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
        last_response.body.should include(@asset.to_json)
      end 
      
      it 'should not include assets from other sites' do   
        @alien_site = Factory(:site, name: 'Alien', subdomain: 'alien', group: @group)
        @alien_asset = Factory(:asset, 
          site: @alien_site,
          file: File.open(root_path('spec/data/830px-Tieboardingcraft.jpg')),
          name: 'alien-image') 
        do_get 
        last_response.body.should_not include(@alien_asset.to_json) 
      end 
    end
    
  end  
  
  context 'POST create' do
    
    context 'html' do 
      def do_post
        post "/api/v1/assets", file: File.open(root_path('spec/data/830px-Tieboardingcraft.jpg')), file: { filename: 'test_file.jpg' }
      end
      
      it 'should be a redirect' do
        do_post
        last_response.should be_redirect
      end
    end
    
    context 'json' do 
      def do_post
        post "/api/v1/assets.json", file: File.open(root_path('/spec/data/830px-Tieboardingcraft.jpg')), file: { filename: '830px-Tieboardingcraft.jpg' }
      end
      
      it 'should be successful' do
        do_post
        last_response.should be_ok 
      end  
      
      it 'should set the content header to json' do
        do_post
        last_response.headers['Content-Type'].should == 'application/json;charset=utf-8'
      end 
      
      it 'should return the filename in the json' do
        do_post                  
        # puts last_response.body.inspect     
        JSON.parse(last_response.body)['name'].should == '830px-Tieboardingcraft' 
      end
    end
    
  end   
  
  context 'PUT update' do  
          
    context 'json' do   
      def do_put
        put "/api/v1/assets/#{@asset.id}.json", { name: 'Really Awesome Image' }.to_json
      end
    
      it 'should be successful' do
        do_put
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_put
        last_response.headers['Content-Type'].should == 'application/json;charset=utf-8'
      end
      
      it 'should include the name in the json' do  
        do_put
        last_response.body.should include('Really Awesome Image')
      end  
    end
  
  end
  
  context 'DELETE destroy' do  

    before(:each) do 
      @kill_me = Factory(:asset, 
        name: 'killme', 
        site_id: @site.id, 
        file: File.open(root_path('spec/data/830px-Tieboardingcraft.jpg')),
        name: 'kill_me.jpg')    
    end

    context 'json' do    
      def do_delete
        delete "/api/v1/assets/#{@kill_me.id}.json"
      end

      it 'should be successful' do
        do_delete
        last_response.should be_ok
      end

      it 'should set the content header to json' do
        do_delete
        last_response.headers['Content-Type'].should == 'application/json;charset=utf-8'
      end 

      it 'should delete the site' do 
        asset_id = @kill_me.id
        do_delete
        Asset.find(asset_id).should be_nil
      end
    end

  end
  
  
end