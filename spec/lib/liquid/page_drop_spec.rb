require 'spec_helper'

describe "lib/data_proxy" do
  
  before(:all) do 
    @site = Factory(:site)  
    @layout = Factory(:layout, :name => 'Layout', :site => @site, :content => '<h1>{{page.title}}</h1>') 
    @part = Factory.build(:part, :content => 'fibble', :name => 'body')
    @part2 = Factory.build(:part, :content => 'sidebar', :name => 'sidebar')
    @page = Factory(:page, :title => 'root', :site => @site, :layout => @layout, :parts => [@part, @part2])
  end
  
  after(:all) do
    teardown
  end
  
  context 'images' do   
    
    it "should return the title" do
      @page.title.to_liquid.should == 'root'
    end  
    
    it "should return the body content as a liquid attribute" do
      @page.data.body.to_liquid.should == '<p>fibble</p>'
    end   
    
    it "should return the sidebar content as a liquid attribute" do
      @page.data.sidebar.to_liquid.should == '<p>sidebar</p>'
    end
    
  end
  
end