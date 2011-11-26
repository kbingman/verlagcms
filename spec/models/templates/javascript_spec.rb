require 'spec_helper'
 
describe Layout do  
  before(:all) do  
    @group = Factory(:group)
    @site = Factory(:site, :group => @group)
  end  
  
  after(:all) do
    teardown
  end
  
  describe "validations" do
    it "should create a valid layout" do
      l = Factory.build(:javascript, :name => 'Layout')
      l.site = @site  
      l.should be_valid
    end
   
    it "should require a site" do
      Factory.build(:javascript, :name => 'JS', :site => nil).should_not be_valid
    end
    
    it "should require a title" do
      l = Factory.build(:javascript, :name => '')
      l.site = @site
      l.should_not be_valid
    end  
  end  
  
  describe 'methods' do 
    before(:all) do  
      @javascript = Factory(:javascript, :name => 'JS', :site_id => @site.id)
    end
    
    it 'should respond to render' do
      @javascript.should respond_to(:render)
    end
    
    it 'should render the content' do
      @javascript.render.should == '$(document).load(function(){});'
    end 
    
    it 'should return the editor mode' do
      @javascript.mode.should == 'javascript'
    end
  end
  
end