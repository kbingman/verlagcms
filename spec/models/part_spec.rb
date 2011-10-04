require 'spec_helper'
 
describe Part do  
  before(:all) do  
    teardown
    build_complete_site
  end  
  
  after(:all) do
    teardown
  end
  
  describe 'valid part' do
    
    it 'should create a valid part' do  
      part = Part.new :name => 'fibble', :page => @page
      @page.should be_valid
    end
    
    it 'should have the correct path' do  
      part = Part.new :name => 'pathpart', :page => @page
      @page.save
      part.path.should == "/admin/pages/#{@page.id}/parts/#{part.id}" 
    end
    
  end
  
end