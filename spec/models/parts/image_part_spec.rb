require 'spec_helper'
 
describe ImagePart do  
  before(:all) do  
    teardown
    build_complete_site
  end  
  
  after(:all) do
    teardown
  end
  
  describe 'valid part' do
    
    it 'should create a valid part' do  
      part = ImagePart.new :name => 'fibble', :page => @page
      @page.should be_valid
    end
    
    it 'should have the correct path' do  
      part = ImagePart.new :name => 'pathpart', :page => @page
      @page.save
      part.admin_path.should == "/admin/pages/#{@page.id}/image_parts/#{part.id}" 
    end
    
    it 'renders the part' do
      file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg'))
      asset = Factory(:asset, :artist => @artist, :file => file, :title => 'Image', :site_id => @site.id)
      part = ImagePart.new :name => 'pathpart', :page => @page, :asset => asset
      @page.save
      part.render.should == "<img src='#{asset.image_path}' alt='Image' />"
    end
    
  end
  
end