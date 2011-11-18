require 'spec_helper'

describe "lib/views/part_proxy" do
  
  before(:all) do 
    @group =  Factory(:group)
    @site = Factory(:site, :group => @group)
    @root = @site.root
    @proxy = PartProxy.new @root
  end
  
  after(:all) do
    teardown
  end
  
  context 'parts' do  
    
    it "should return the 'body' content" do
      pending 'change to body part'
      @proxy.body.should == @root.data.body
    end
    
  end
  
end