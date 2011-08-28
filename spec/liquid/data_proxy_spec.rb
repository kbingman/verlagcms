require 'spec_helper'

describe "lib/data_proxy" do
  
  before(:all) do 
    teardown
    build_complete_site
    # Parts
    body = @page.parts.detect { |p| p.name == 'body' } 
    body.content = 'page body' 
    sidebar = @page.parts.detect { |p| p.name == 'sidebar' }
    sidebar.content = 'page sidebar'
    @page.save
  end
  
  after(:all) do
    teardown
  end
  
  context 'data' do   
    
    it "should return the part content" do
      @page.data.body.should == '<p>page body</p>'
    end  
    
    it "should return the sidebar content" do
      @page.data.sidebar.should == '<p>page sidebar</p>'
    end   
    
    it "should return the sidebar content with an edit flag" do   
      pending
      # @request = stub!(:params => { :edit => 'true' })
      @page.data.sidebar.should == '<p>page sidebar</p>'
    end
        
  end
  
end