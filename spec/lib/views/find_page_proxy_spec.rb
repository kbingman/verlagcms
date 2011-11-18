require 'spec_helper'

describe "lib/views/find_page_proxy" do
  
  before(:all) do 
    @group =  Factory(:group)
    @site = Factory(:site, :group => @group)
    @root = @site.root 
    @child = Factory(:page, :title => 'Child', :parent => @root) 
  end
  
  after(:all) do
    teardown
  end
  
  describe 'find' do  
    
    context 'root page' do
      
      before(:each) do
        @finder = Main::Views::FindPageProxy.new @site
      end
    
      it "responds to the root url" do
        @finder.respond_to?('/').should == true
      end
      
      it "finds the root page" do
        @finder.send('/').should == @root
      end
      
      it "returns nothing if not found" do
        @finder.respond_to?('/fibble').should == false
      end
      
    end

    context 'child page' do
      
      before(:each) do
        @finder = Main::Views::FindPageProxy.new @site
      end
      
      it "responds to the child url" do
        @finder.respond_to?('/child').should == true
      end
      
      it "finds the child page" do
        @finder.send('/child').should == @child
      end
      
    end
    
  end
  
end