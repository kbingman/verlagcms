require 'spec_helper'
 
describe Asset do
  
  before(:all) do  
    teardown      
    @group = Factory(:group)
    @site = Factory(:site, :group => @group)
    @folder = Factory(:folder, :site => @site)
    @file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg'))
    @asset = Factory.build(:asset, :artist => @artist, :file => @file, :title => 'Image', :site_id => @site.id, :folder_id => @folder.id) 
    @asset.save  
  end
  
  after(:all) do
    teardown
  end
  
  describe "asset validations" do
    it "should create a valid artist" do
      Asset.new(:title => "Fred's Asset", :site => @site).should be_valid
    end  
    
    it "should require a site" do
      Asset.new(:title => 'Asset', :site => nil).should_not be_valid
    end
    
    it "should require a title" do
      Asset.new(:title => '', :site => @site).should_not be_valid
    end
    
    it "should set the title automatically" do
      asset = Asset.new(:site => @site, :file => File.open(root_path('spec/data/830px-Tieboardingcraft.jpg')))
      asset.valid?
      asset.title.should == '830px-Tieboardingcraft'
    end  
  end
  
  describe 'valid Asset' do    
    before(:all) do
      @json = JSON.parse({ 
        :id => @asset.id,
        :title => "Image",
        :tag_list =>'tag1, tag2', 
        :file_name => @asset.file_name,
        :ext => @asset.ext,
        :id => @asset.id.to_s, 
        :folder_id => @folder.id, 
        :is_image => true,
        :image_path => "/images/#{@asset.id}/#{@asset.file_name}",
        :admin_path => "/admin/folders/#{@folder.id}/assets/#{@asset.id}",
        :created_at => @asset.created_at
      }.to_json)
    end
      
    it 'should return api attributes' do
      JSON.parse(@asset.to_json).should == @json
    end
    
    it 'should return a tag list' do
      @asset.tag_list.should == 'tag1, tag2'
    end
    
    it 'should set the tags' do
      @asset.tag_list = 'tag1, tag3, tag4'
      @asset.tags.should == ['tag1', 'tag3', 'tag4']
    end
  
  end
  
  describe 'search' do 
    
    it 'should find assets by tag' do    
      # pending "Factory Girl doesn't like to Hunt" 
      Asset.search_all('tag1').all.should == [@asset]
    end
    
    it 'should find assets by tag' do
      Asset.search_all('tag1').all.should == [@asset]
    end
    
    it 'should find assets by multiple tags' do
      Asset.search_all('tag1 tag2').all.should == [@asset]
    end
    
    it 'should find assets by title' do
      Asset.search_all('Image').all.should == [@asset]
    end
    
    # it 'should find assets by artist' do
    #   Asset.search_with_artist('Egon').all.should == [@asset]
    # end
    
    # it 'should find assets by artist with tags' do
    #   Asset.search_with_artist('Egon tag1').all.should == [@asset]
    # end
    
    # it 'should exclude assets by this artist without tags' do
    #   Asset.search_with_artist('Egon tag5').all.should == []
    # end
  end
  
  describe 'Asset attachments' do
    it 'should set the file name' do
      @asset.file_name.should == '830px-Tieboardingcraft.jpg'
    end
    
    it 'should set the image type' do
      @asset.file_type.should == 'image/jpeg'
    end
    
    it 'returns a file extension' do
      @asset.ext.should == 'jpg'
    end
    
    it 'returns whether the file is an image (resizable)' do
      @asset.is_image.should == true
    end
    
    it 'should have an image path' do
      @asset.image_path.should == "/images/#{@asset.id}/#{@asset.file_name}"
    end
    
    it 'should have a thumbnail path' do
      @asset.thumb_path.should == "/images/thumbnail/#{@asset.id}/#{@asset.file_name}"
    end
    
    it 'should have a icon path' do
      @asset.icon_path.should == "/images/icon/#{@asset.id}/#{@asset.file_name}"
    end
    
  end
  
  describe 'Image Processing' do
    context 'Original Image' do
      before(:all) do
        @image = MiniMagick::Image.read(@asset.file)
      end 
      
      it 'should return the original width' do
        @image[:width].should == 830
      end
      
      it 'should return the original height' do
        @image[:height].should == 671
      end
    end
    
    # context 'resizing' do
    #   before(:all) do
    #     @file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg'))
    #     @asset = Factory.build(:asset, :artist => @artist, :file => @file, :title => 'Image', :site_id => @site.id) 
    #     # @image = @asset.render_image(100, 100)
    #     open(root_path("tmp/#{@asset.file_name}"), 'w') do |f| 
    #       f << @asset.render_image(100, 100)
    #     end
    #   end 
    #   
    #   it 'should return the original width' do
    #     @image[:width].should == 830
    #   end
    #   
    #   it 'should return the original height' do
    #     @image[:height].should == 671
    #   end
    # end

  end
  
  
 describe 'Asset Import' do
   before(:all) do
     file = File.open root_path('spec/data/assets.json')
     @import = Asset.import(file)
     @hash = JSON.parse File.open(root_path('spec/data/assets.json')).read
     @asset = Asset.find(@hash['assets'][0]['id'])
   end
   
   it 'should successfully import the files' do
     counter = @import[0]
     counter.should == 2
   end
   
   it 'should successfully find the imported files' do
     @asset.should_not be_nil
   end
   
   it 'should set the title of the imported files' do
     @asset.title.should == @hash['assets'][0]['title']
   end
   
   # it 'should set the tag list the imported files' do
   #   @asset.tag_list.should == @hash['assets'][0]['tag_list']
   # end
   
   # it 'should set the site_id of the imported files' do
   #   @asset.site_id.should == @site.id
   # end
   
 end
end
