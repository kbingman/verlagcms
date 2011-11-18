require 'spec_helper'

describe "routes/admin/folders" do
  include Rack::Test::Methods
  
  before(:all) do
    build_complete_site
    @parent_folder = Factory(:folder, :site => @site, :name => 'Parent Folder')                
    # @asset = Factory(:asset, :site_id => @site.id)   
    # @assets = [@asset]
  end 
  
  after(:all) do
    teardown
  end   
  
  context 'GET index' do
    
    context 'json' do   
      def do_get
        get '/admin/folders.json'
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
        last_response.body.should include(@parent_folder.to_json)
      end 
      
      # it 'should not include assets from other sites' do   
      #   @alien_site = Factory(:site, :name => 'Alien', :subdomain => 'alien', :group => @group)
      #   @alien_asset = Factory(:asset, 
      #     :site => @alien_site,
      #     :file => File.open(root_path('spec/data/830px-Tieboardingcraft.jpg')),
      #     :title => 'alien-image') 
      #   do_get 
      #   last_response.body.should_not include(@alien_asset.to_json) 
      # end 
    end
    
  end  
end