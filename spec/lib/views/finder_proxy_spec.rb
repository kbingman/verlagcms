require 'spec_helper'

describe "lib/views/finder_proxy" do
  
  before(:all) do 
    @group =  Factory(:group)
    @site = Factory(:site, :group => @group)
    @root = @site.root
    @child = Factory(:page, :title => 'Child', :parent => @root)
    
    @finder = Main::Views::FinderProxy.new @site
  end
  
  after(:all) do
    teardown
  end
  
  describe 'finder' do  
    
    it "responds to the root url" do
      @finder.respond_to?('/').should == true
    end
    
    it "finds the root page" do
      @finder.send('/').should == @root
    end
    
    it "responds to the child url" do
      @finder.respond_to?('/').should == true
    end

    it "finds the child page" do
      @finder.send('/child').should == @child
    end

    it "returns nothing if not found" do
      @finder.respond_to?('/fibble').should == false
    end
    
  end
  
end