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
  
  describe 'if_path' do  
    
    context 'root page' do
      
      before(:each) do
        @finder = Main::Views::IfPathProxy.new @root
      end
    
      it "returns true for the root site" do
        @finder.send('/').should == true
      end
      
      it "respons to the root path" do
        @finder.respond_to?('/').should == true
      end
      
      it "returns false for anything else" do
        @finder.respond_to?('/fibble').should == false
      end
      
    end

    context 'child page' do
      
      before(:each) do
        @finder = Main::Views::IfPathProxy.new @child
      end
      
      it "responds to the child url" do
        @finder.respond_to?('/child/').should == true
      end
      
      it "finds the child page" do
        @finder.send('/child/').should == true
      end
      
      it "responds to the child url" do
        @finder.respond_to?('/child').should == true
      end
      
      it "finds the child page" do
        @finder.send('/child').should == true
      end
      
    end
    
  end
  
end