require 'spec_helper'
 
describe Page do  
  before(:all) do  
    @site = Factory(:site)
  end  
  
  after(:all) do
    teardown
  end
  
  describe "validations" do
    it "should create a valid layout" do
      Layout.new(:name => 'Layout', :site => @site).should be_valid
    end
   
    it "should require a site" do
      Layout.new(:name => 'Layout', :site => nil).should_not be_valid
    end
    
    it "should require a title" do
      Layout.new(:name => '', :site => @site).should_not be_valid
    end  
  end  
  
end