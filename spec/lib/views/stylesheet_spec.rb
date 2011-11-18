require 'spec_helper'

describe "lib/views/stylesheet" do
  
  before(:all) do 
    @group =  Factory(:group)
    @site = Factory(:site, :group => @group)
    @template = Factory(:stylesheet, :site => @site, :content => 'body { background: pink; }')
  end
  
  after(:all) do
    teardown
  end
  
  context 'methods' do  
    
    before(:each) do
      @css_view = Main::Views::Javascript.new @template
    end
    
    it "returns a template" do
      @css_view.template.should == 'body { background: pink; }'
    end
    
  end
  
end