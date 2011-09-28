require 'spec_helper'

describe "lib/images" do
  
  before(:all) do 
    @group =  Factory(:group)
    @site = Factory(:site, :group => @group)
    @file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg'))
    @asset = Factory.build(:asset, :site => @site, :file => @file) 
    @asset.save
  end
  
  after(:all) do
    teardown
  end
  
  context 'paths' do  
    it "should correctly set the content type" do
      get "/images/display/#{@asset.id}/#{@asset.file_name}"
      last_response.headers['Content-Type'].should == 'image/jpeg'
    end
    
    it "should correctly set the cache headers" do
      get "/images/display/#{@asset.id}/#{@asset.file_name}"
      last_response.headers['Cache-Control'].should == 'max-age=86400, public'
    end
      
    it "should respond to /images/display" do
      get "/images/display/#{@asset.id}/#{@asset.file_name}"
      last_response.should be_ok
    end
    
    it "should respond to /thumbnails" do
      get "/images/thumbnail/#{@asset.id}/#{@asset.file_name}"
      last_response.should be_ok
    end
    
    it "should respond to /icons" do
      get "/images/icon/#{@asset.id}/#{@asset.file_name}"
      last_response.should be_ok
    end
  end
  
end