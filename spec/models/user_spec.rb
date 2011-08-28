require 'spec_helper'
 
describe User do
  
  before(:all) do
    @site = Factory(:site) 
    @second_site = Factory(:site, :name => 'second', :subdomain => 'second')
    @user = Factory.build(:user, :password => 'secret')
    @user.sites << @site
    @user.save
  end
  
  after(:all) do
    teardown
  end
  
  context 'validations' do
    it "should create a valid artist" do
      User.new(:name => 'Fred').should be_valid
    end
    
    it "should require a name" do
      User.new(:name => '').should_not be_valid
    end  
    
    it "should require an email" do
      User.new(:email => '').should_not be_valid
    end
  end
  
  context 'valid user' do    
    it 'should have some sites' do
      @user.sites.should include(@site)
    end
    
    it 'should store the site ids' do
      @user.site_ids.should include(@site.id)
    end
    
    it 'should be listed in the sites users' do
      site = @user.sites.first
      site.users.should include(@user)
    end
  end
  
  context 'User authentication' do
    it 'should authenticate the user with site, email and password' do
      # User.authenticate(@user.email, 'secret').should == @user
      User.authenticate(@site, @user.email, 'secret').should == @user
    end
    
    it 'should reject users with incorrect passwords' do
      User.authenticate(@site, @user.email, 'blah').should == nil
    end
    
    it 'should reject users who do not belong to the current site' do
      pending 'not scoping users to site yet'
      User.authenticate(@second_site, @user.email, 'secret').should == nil
    end
  end
  
end