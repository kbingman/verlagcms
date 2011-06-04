require 'spec_helper'
 
describe Site do
  
  describe 'validations' do
    it 'should create a valid page' do
      Factory.build(:site, :name => 'The Daily Scan', :subdomain => 'scans').should be_valid
    end
    
    it 'should require a name' do
      Factory.build(:site, :name => '', :subdomain => 'scans').should_not be_valid 
    end 
    
    it 'should set the subdomain if none is sent' do 
      scan = Factory.build(:site, :name => 'Daily Scans', :subdomain => '') 
      scan.valid?
      scan.subdomain.should == 'daily-scans'
    end  
    
    it 'should set the subdomain if one is sent' do  
      scan = Factory.build(:site, :name => 'Daily Scans', :subdomain => 'scans') 
      scan.valid?
      scan.subdomain.should == 'scans'
    end 
    
    it 'should not strip dots' do
      scan = Factory.build(:site, :name => 'Daily Scans', :subdomain => 'daily.scans') 
      scan.valid?
      scan.subdomain.should == 'daily.scans'
    end  
    
    it 'should strip everything else' do  
      scan = Factory.build(:site, :name => 'Daily Scans', :subdomain => 'daily[scans') 
      scan.valid?
      scan.subdomain.should == 'daily-scans'
    end   
    
    it 'should not leave trailing dashes' do  
      scan = Factory.build(:site, :name => 'Daily Scans', :subdomain => 'daily[scans]') 
      scan.valid?
      scan.subdomain.should == 'daily-scans'
    end
  end
  
  context 'valid site' do  
    
    before(:all) do
      @site = Factory(:site, :name => 'Daily Scans', :subdomain => '') 
      @layout = Factory(:layout, :site_id => @site.id)
      @page = Factory(:page, :site_id => @site.id, :layout_id => @layout.id) 
    end
    
    after(:all) do
      teardown
    end 
    
    it 'should find the root page' do
      @site.root.should == @page
    end  
    
  end
  
end