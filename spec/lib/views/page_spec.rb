require 'spec_helper'

describe "lib/views/page" do
  
  before(:all) do 
    @group =  Factory(:group)
    @site = Factory(:site, :group => @group)
    @root = @site.root
    
    @layout = @root.layout
    @layout.content = '<html></html>'
    @layout.save
  end
  
  after(:all) do
    teardown
  end
  
  context 'methods' do  
    
    before(:each) do
      @page_view = Main::Views::Page.new @root
    end
    
    it "returns a template" do
      @page_view.template.should == '<html></html>'
    end
    
    it "returns the current page" do
      @page_view.page.should == @root
    end
    
    it "returns the body part for the current page" do
      pending 'change to body part'
      @page_view.data.body.should == @root.data.body
    end
    
    it "returns the title for the current page" do
      @page_view.page.title.should == @root.title
    end
    
    it "returns the path for the current page" do
      @page_view.page.path.should == @root.path
    end
    
    it "returns the path for the current page" do
      @page_view.page.slug.should == @root.slug
    end
    
    it "returns the site" do
       @page_view.site.should == @site
    end
    
  end
  
end