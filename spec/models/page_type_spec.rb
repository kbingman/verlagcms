require 'spec_helper'
 
describe PageType do
  
  before(:all) do
    @group = Factory(:group) 
    @site = Factory(:site, :group => @group) 
    @root = @site.root
    @layout = @site.layouts.first
  end
  
  after(:all) do
    teardown
  end
  
  context 'validations' do
    
    it 'creates a valid page type' do
      PageType.new(:name => 'Standard', :site => @site, :layout => @layout).should be_valid
    end
    
    it 'requires a name' do
      PageType.new(:name => '', :site => @site, :layout => @layout).should_not be_valid
    end  
    
    it 'requires a site' do
      PageType.new(:name => 'Standard', :layout => @layout).should_not be_valid
    end
    
    it 'requires a layout' do
      PageType.new(:name => 'Standard', :site => @site).should_not be_valid
    end
    
    it 'creates default parts' do
      kind = PageType.new(:name => 'Standard', :site => @site, :layout => @layout)  
      kind.valid?   
      kind.part_types.should_not be_nil
    end
    
  end
  
end