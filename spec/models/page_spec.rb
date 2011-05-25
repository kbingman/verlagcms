require 'spec_helper'
 
describe Page do  
  before(:all) do  
    @site = Factory(:site)
  end
  
  describe "validations" do
    it "should create a valid page" do
      Page.new(:title => 'Home', :site => @site).should be_valid
    end
   
    it "should require a site" do
      Page.new(:title => 'Home', :site => nil).should_not be_valid
    end
    
    it "should require a title" do
      Page.new(:title => '', :site => @site).should_not be_valid
    end  
  end
  
  context 'valid page' do
    before(:all) do  
      @root = Factory(:page, :title => 'root', :site => @site) 
      @child = Factory(:page, :title => 'child', :parent_id => @root.id, :tag_list => 'tag1, tag2', :site => @site)
    end
    
    after(:all) do
      teardown
    end  
     
    describe 'attributes' do 
      it 'should set the slug for the root page' do
         @root.slug.should == '/'
      end
      
      it 'should have a path for the root page' do
        @root.path.should == '/'  
      end    
      
      it 'should have a path for the child page' do
        @child.path.should == '/child/'  
      end  
      
      it 'should have an edit path' do
        @child.edit_path.should == '/edit/child/'
      end
      
      it 'should set the level for the root page' do
         @root.level.should == 0
      end 
      
      it 'should set the padding' do 
        @root.padding.should == 0
      end  
      
      it 'should set the level for a child page' do
        @child.level.should == 1
      end 
      
      it 'should set the padding for a child page' do
        @child.padding.should == 24
      end  

      it 'should return a tag list' do
        @child.tag_list.should == 'tag1, tag2'
      end

      it 'should set the tags' do
        @child.tag_list = 'tag1, tag3, tag4'
        @child.tags.should == ['tag1', 'tag3', 'tag4']
      end 
    end 
    
    describe 'finders' do
      it 'should find the root page' do
        Page.find_by_path('/').should == @root    
      end
      
      it 'should find a page by path' do
        Page.find_by_path('/child/').should == @child
      end 
      
      it 'should find a page by path without the trailing slash' do
        Page.find_by_path('/child').should == @child
      end  
      
      it 'should find pages by tag' do
        Page.search('tag1').all.should == [@child]
      end  
      
      it 'should find pages by all tags' do
        Page.search_all('tag1 tag2').all.should == [@child]
      end 
      
      it 'should find pages by all tags' do
        Page.search_all('tag1 tag5').all.should_not == [@child]
      end
    end
  end
  
end