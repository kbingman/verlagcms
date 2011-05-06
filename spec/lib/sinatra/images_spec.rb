require 'spec_helper'

describe "routes/images" do
  
  before(:all) do 
    # TODO stubbing all this will speed things up...
    @artist = Artist.make(:name => 'Egon')                                
    @file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg'))
    @asset = Asset.make(:artist => @artist, :file => @file)
  end
  
  after(:all) do
    teardown
  end
  
  context 'images' do  
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
      get "/images/thumbnails/#{@asset.id}/#{@asset.file_name}"
      last_response.should be_ok
    end
    
    it "should respond to /icons" do
      get "/images/icons/#{@asset.id}/#{@asset.file_name}"
      last_response.should be_ok
    end
  end
  
end