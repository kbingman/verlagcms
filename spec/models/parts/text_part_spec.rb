require 'spec_helper'
 
describe TextPart do  
  before(:all) do  
    teardown
    build_complete_site
  end  
  
  after(:all) do
    teardown
  end
  
  describe 'valid part' do
    
    it 'should create a valid part' do  
      part = TextPart.new :name => 'fibble', :page => @page
      @page.should be_valid
    end
    
    it 'should have the correct path' do  
      part = TextPart.new :name => 'pathpart', :page => @page
      @page.save
      part.admin_path.should == "/admin/pages/#{@page.id}/parts/#{part.id}" 
    end
    
    it 'renders the part' do
      part = TextPart.new :name => 'text', :page => @page, :content => 'This is the content'
      @page.save
      part.render.should == "<p>This is the content</p>"
    end
    
  end
  
end