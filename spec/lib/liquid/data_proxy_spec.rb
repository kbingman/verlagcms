require 'spec_helper'

describe "lib/data_proxy" do
  
  before(:all) do 
    @site = Factory(:site)  
    @layout = Factory(:layout, :name => 'Layout', :site => @site, :content => '<h1>{{page.title}}</h1>') 
    @part = Factory.build(:part, :content => 'fibble', :name => 'body')
    @part2 = Factory.build(:part, :content => 'sidebar', :name => 'sidebar')
    @page = Factory(:page, :title => 'root', :site => @site, :layout => @layout, :parts => [@part, @part2])  
    #  @request = stub!(:params => { :edit => 'true' })
  end
  
  after(:all) do
    teardown
  end
  
  context 'data' do   
    
    it "should return the part content" do
      @page.data.body.should == '<p>fibble</p>'
    end  
    
    it "should return the sidebar content" do
      @page.data.sidebar.should == '<p>sidebar</p>'
    end   
    
    it "should return the sidebar content with an edit flag" do   
      pending
      @page.data.sidebar.should == '<p>sidebar</p>'
    end
        
  end
  
end