require 'spec_helper'
 
describe Asset do
  
  before(:all) do
    @artist = Artist.make(:name => 'Egon')
    @file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg'))
    @asset = Asset.make(:artist => @artist, :file => @file)
  end
  
  after(:all) do
    teardown
  end
  
  describe "asset validations" do
    it "should create a valid artist" do
      Asset.new(:title => "Fred's Asset", :artist_id => @artist.id).should be_valid
    end
    
    it "should require a title" do
      Asset.new(:title => '', :artist_id => @artist.id).should_not be_valid
    end  
    
    it "should require an artist id" do
      Asset.new(:title => '', :artist_id => nil).should_not be_valid
    end
  end
  
  describe 'valid Asset' do
      
    it 'should return api attributes' do
      @asset.api_attributes.should == { :title => "Fred's Asset",
                                        :tags => ['tag1', 'tag2'],
                                        :tag_list =>'tag1, tag2',
                                        :id => @asset.id.to_s, 
                                        :class => 'asset',
                                        :image_path => @asset.image_path, 
                                        :thumb_path => @asset.thumb_path, 
                                        :file_size => @asset.file_size, 
                                        :artist_id => @asset.artist_id.to_s,
                                        :artist_name => @asset.artist.name, 
                                        :created_at => @asset.created_at.strftime('%S%M%H%d%m%Y')
                                      }
    end
    
    it 'should return a tag list' do
      @asset.tag_list.should == 'tag1, tag2'
    end
    
    it 'should set the tags' do
      @asset.set_tags('tag3, tag4')
      @asset.tag_list.should == 'tag3, tag4'
    end
  
  end
  
  describe 'Asset search' do
    
    it 'should find assets by tag' do
      Asset.search_with_artist('tag1').all.should == [@asset]
    end
    
    it 'should find assets by multiple tags' do
      Asset.search_with_artist('tag1 tag2').all.should == [@asset]
    end
    
    it 'should find assets by title' do
      Asset.search_with_artist('Fred').all.should == [@asset]
    end
    
    it 'should find assets by artist' do
      Asset.search_with_artist('Egon').all.should == [@asset]
    end
    
    it 'should find assets by artist with tags' do
      Asset.search_with_artist('Egon tag1').all.should == [@asset]
    end
    
    it 'should exclude assets by this artist without tags' do
      Asset.search_with_artist('Egon tag5').all.should == []
    end
    
  end
  
  describe 'Asset attachments' do
    
    it 'should set the file name' do
      @asset.file_name.should == '830px-Tieboardingcraft.jpg'
    end
    
    it 'should set the image type' do
      @asset.file_type.should == 'image/jpeg'
    end
    
    it 'should have an image path' do
      @asset.image_path.should == "/images/display/#{@asset.file.id}/#{@asset.file_name}"
    end
    
    it 'should have a thumbnail path' do
      @asset.thumb_path.should == "/images/thumbnails/#{@asset.file.id}/#{@asset.file_name}"
    end
    
    it 'should have a thumbnail path' do
      @asset.icon_path.should == "/images/icons/#{@asset.file.id}/#{@asset.file_name}"
    end
    
    it 'should respond_to render_image' do
      @asset.should respond_to(:render_image)
    end
  end
end
