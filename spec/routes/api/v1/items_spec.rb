require 'spec_helper'

describe 'routes/api/v1/items' do
  include Rack::Test::Methods
  
  before(:all) do    
    teardown
    build_complete_site 
    setup_site                   
    @file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg'))
    @asset = Factory(:asset, site_id: @site.id, file: @file)   
    @folder = Factory(:folder, :site => @site, :name => 'Parent Folder')
    @child_folder = Factory(:folder, :site => @site, :name => 'Child Folder', :parent_id => @folder.id)
    @assets = [@asset]
  end 
  
  after(:all) do
    teardown
  end   
  
  context 'GET index' do
    
    context 'json' do   
      def do_get
        get '/api/v1/items'
      end
    
      it 'should be successful' do
        do_get    
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_get
        last_response.headers['Content-Type'].should == 'application/json;charset=utf-8'
      end
    
      it 'should include the asset in the json' do
        do_get
        last_response.body.should include(@asset.to_json)
      end 
      
      it 'should include the parent folder in the json' do
        do_get
        last_response.body.should include(@folder.to_json)
      end 
      
      it 'should not include the child folder in the json' do
        do_get
        puts JSON.parse(last_response.body).length
        last_response.body.should_not include(@child_folder.to_json)
      end 
      
      
      
      # it 'should not include assets from other sites' do   
      #   @alien_site = Factory(:site, name: 'Alien', subdomain: 'alien', group: @group)
      #   @alien_asset = Factory(:asset, 
      #     site: @alien_site,
      #     file: File.open(root_path('spec/data/830px-Tieboardingcraft.jpg')),
      #     name: 'alien-image') 
      #   do_get 
      #   last_response.body.should_not include(@alien_asset.to_json) 
      # end 
    end
    
  end  
end