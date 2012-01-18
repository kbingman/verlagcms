require 'spec_helper'
 
describe Site do
  
  before(:all) do
    @group = Factory(:group)
  end
  
  describe 'validations' do
    it 'should create a valid page' do
      Factory.build(:site, :name => 'The Daily Scan', :subdomain => 'scans', :group => @group).should be_valid
    end
    
    it 'should require a name' do
      Factory.build(:site, :name => '', :subdomain => 'scans', :group => @group).should_not be_valid 
    end 
    
    it 'should set the subdomain if none is sent' do 
      scan = Factory.build(:site, :name => 'Daily Scans', :subdomain => '', :group => @group) 
      scan.valid?
      scan.subdomain.should == 'daily-scans'
    end  
    
    it 'should set the subdomain if one is sent' do  
      scan = Factory.build(:site, :name => 'Daily Scans', :subdomain => 'scans', :group => @group) 
      scan.valid?
      scan.subdomain.should == 'scans'
    end 
    
    it 'should set the domain if none is sent' do 
      scan = Factory.build(:site, :name => 'Daily Scans', :subdomain => 'scans', :group => @group) 
      scan.valid?
      scan.domain.should == 'scans.verlag.dev'
    end
    
    it 'should set the domain if none is sent' do 
      scan = Factory.build(:site, :name => 'Daily Scans', :subdomain => '', :domain => 'verlagcms.com', :group => @group) 
      scan.valid?
      scan.domain.should == 'verlagcms.com'
    end
    
    it 'should not strip dots' do
      scan = Factory.build(:site, :name => 'Daily Scans', :subdomain => 'daily.scans', :group => @group) 
      scan.valid?
      scan.subdomain.should == 'daily.scans'
    end  
    
    it 'should strip everything else' do  
      scan = Factory.build(:site, :name => 'Daily Scans', :subdomain => 'daily[scans', :group => @group) 
      scan.valid?
      scan.subdomain.should == 'daily-scans'
    end   
    
    it 'should not leave trailing dashes' do  
      scan = Factory.build(:site, :name => 'Daily Scans', :subdomain => 'daily[scans]', :group => @group) 
      scan.valid?
      scan.subdomain.should == 'daily-scans'
    end
  end
  
  context 'valid site' do  
    
    before(:all) do
      @site = Factory(:site, :name => 'Daily Scans', :subdomain => '', :group => @group) 
    end
    
    after(:all) do
      teardown
    end 
    
    it 'should find the root page' do
      @site.root.should_not be_nil
    end  

  end  
  
  context 'defaults' do 
    
    before(:all) do 
      @new_site = Site.create :name => 'new', :subdomain => 'new', :group => @group
    end  
      
    after(:all) do
      teardown
    end
    
    it 'should create a default layout on creation' do
      @new_site.layouts.first.should_not be_nil
    end
     
    it 'should create a root page on creation' do  
      @new_site.root.should_not be_nil
    end  
    
    it 'should allow the subdomin to be blank' do 
      @new_site.domain = 'verlagcms.com'
      @new_site.save
      
      id = @new_site.id
      site = Site.find(id)
      site.domain.should == 'verlagcms.com'
    end
    
  end
  
end