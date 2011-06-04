require 'spec_helper'
 
describe Stylesheet do  
  before(:all) do  
    @site = Factory(:site)
  end  
  
  after(:all) do
    teardown
  end
  
  describe "validations" do
    it "should create a valid layout" do
      l = Factory.build(:stylesheet, :name => 'Stylesheet')
      l.site = @site  
      l.should be_valid
    end
   
    it "should require a site" do
      Factory.build(:stylesheet, :name => 'CSS', :site => nil).should_not be_valid
    end
    
    it "should require a title" do
      l = Factory.build(:stylesheet, :name => '')
      l.site = @site
      l.should_not be_valid
    end  
  end  
  
  describe 'methods' do 
    before(:all) do  
      @stylesheet = Factory.build(:stylesheet, :name => 'CSS', :site_id => @site.id)
    end
    
    it 'should respond to render' do
      @stylesheet.should respond_to(:render)
    end
    
    it 'should render the content' do
      @stylesheet.filter = 'none'
      @stylesheet.render.should == 'body: {}'
    end 
    
    it 'should render an error with invalid sass' do
      @stylesheet.filter = 'sass'
      @stylesheet.render.should == 'Syntax Error at line 1: Invalid CSS after "": expected expression (e.g. 1px, bold), was "{}"'
    end  
    
    # it 'should render css with valid scss' do   
    #   @stylesheet.content = "body { width: 900px; }"   
    #   @stylesheet.filter = 'scss'
    #   @stylesheet.render.should == "body { width: 900px; }\n"
    # end 
    
    it 'should render css with valid sass' do  
      @stylesheet.content = "body\n :width 900px"
      @stylesheet.filter = 'sass'
      @stylesheet.render.should == "body { width: 900px; }\n"
    end
    
    it 'should return the editor mode' do
      @stylesheet.mode.should == 'css'
    end
  end
  
end