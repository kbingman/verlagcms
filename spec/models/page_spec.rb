require 'spec_helper'
 
describe Page do
  
  describe "validations" do
    it "should create a valid page" do
      Page.new(:title => 'Home').should be_valid
    end
    
    it "should require a title" do
      Page.new(:title => '').should_not be_valid
    end  
  end
  
  context 'valid page' do
    before(:all) do
      @root = Page.make 
      @child = Page.make(:parent_id => @root.id)
    end
    
    after(:all) do
      teardown
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
  end
  
end