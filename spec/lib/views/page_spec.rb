require 'spec_helper'

describe "lib/views/page" do
  
  before(:all) do 
    @group =  Factory(:group)
    @site = Factory(:site, :group => @group)
    @root = @site.root
    @child1 = Factory(:page, :parent => @root)
    @child2 = Factory(:page, :parent => @root)
    
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
      @page_view.data.body.should == @root.find_part_by_name('body')
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
    
    it "returns the children" do
      @page_view.children.length.should == 2 #[ @child1, @child2 ]
    end
    
    it "returns the children with the correct limit" do
      pending 'needs a find order, or it sometimes fails'
      @page_view.children_limit_1.should == [ @child1 ] 
    end
    
    it "returns the correct number of children" do
      @page_view.children_limit_1.length.should == 1
    end
    
  end
  
end