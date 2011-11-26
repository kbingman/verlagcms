require 'spec_helper'
 
describe Layout do  
  before(:all) do  
    teardown
    @group = Factory(:group)
    @site = Factory(:site, :group => @group)
    @layout = Factory(:layout, :name => 'first layout', :site => @site)
    @second_site = Factory(:site, :group => @group)
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
      l = Factory.build(:layout, :name => 'Layout', :site => nil)
      l.should_not be_valid
    end
    
    it "should require a name" do
      l = Factory.build(:layout, :name => '')
      l.site = @site
      l.should_not be_valid
    end   
    
    it "should require a unique name" do
      l2 = Factory.build(:layout, :name => 'first layout', :site => @site)
      l2.should_not be_valid
    end   
    
    it "should not require a unique name in a different site" do    
      l2 = Factory.build(:layout, :name => 'first layout', :site => @second_site)
      l2.should be_valid
    end
    
    it "should create a default part type" do
      l = Factory(:layout, :name => 'Layout', :site => @site)       
      l.part_types.should_not be_nil
    end
  end  
  
end