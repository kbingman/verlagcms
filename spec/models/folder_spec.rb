require 'spec_helper'
 
require 'spec_helper'
 
describe Folder do
  
  before(:all) do
    build_complete_site
    @parent_folder = Factory(:folder, :site => @site, :name => 'Parent Folder')
  end
  
  after(:all) do
    teardown
  end
  
  context 'validations' do
    it "should create a valid folder" do
      Folder.new(:name => 'Folder', :site => @site).should be_valid
    end
    
    it "should require a name" do
      Folder.new(:name => '', :site => @site).should_not be_valid
    end  
    
    it "should require a site" do
      Folder.new(:name => 'Folder', :site => nil).should_not be_valid
    end
    
    it "should take it's parents site" do
      folder = Folder.new :name => 'Child Folder', :site => nil, :parent => @parent_folder
      folder.should be_valid
    end
    
    it "should take it's parents site" do
      folder = Folder.new :name => 'Child Folder', :site => nil, :parent => @parent_folder
      folder.valid?
      folder.site.should == @site
    end
  end
  
  context 'tree' do
    before(:all) do
      @child_folder_1 = Factory(:folder, :name => 'Child Folder 1', :parent => @parent_folder)
      @child_folder_2 = Factory(:folder, :name => 'Child Folder 2', :parent => @parent_folder)
    end
    
    it "should return its children" do
      @parent_folder.children.count.should == 2
    end
    
    it "should return its parent" do 
      @child_folder_2.parent.should == @parent_folder
    end
    
    it "should require a unique name, scoped to the parent" do
      folder = Folder.new :name => 'Child Folder 1', :site => nil, :parent => @parent_folder
      folder.should_not be_valid
    end
  end
  
end