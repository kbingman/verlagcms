require 'spec_helper'
 
describe Layout do  
  before(:all) do  
    @site = Factory(:site)
  end  
  
  after(:all) do
    teardown
  end
  
  describe "validations" do
    it "should create a valid layout" do
      l = Factory.build(:layout, :name => 'Layout')
      l.site = @site  
      l.should be_valid
    end
   
    it "should require a site" do
      Factory.build(:layout, :name => 'Layout', :site => nil).should_not be_valid
    end
    
    it "should require a title" do
      l = Factory.build(:layout, :name => '')
      l.site = @site
      l.should_not be_valid
    end      
    
    it "should create a default part type" do
      l = Factory.build(:layout, :name => 'Layout')
      l.site = @site   
      l.save         
      l.part_types.should_not be_nil
    end
  end  
  
end