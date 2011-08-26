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
  
  context 'images' do   
    
    it "should return the title" do
      @page.data.title.to_liquid.should == 'Page with Parts'
    end 
    
    it "should return the slug" do
      @page.data.slug.to_liquid.should == 'page-with-parts'
    end 
    
    it "should return the body content as a liquid attribute" do
      @page.data.body.to_liquid.should == '<p>page body</p>'
    end   
    
    it "should return the sidebar content as a liquid attribute" do
      @page.data.sidebar.to_liquid.should == '<p>page sidebar</p>'
    end
    
  end
  
end