require 'spec_helper'

describe "lib/views/javascript" do
  
  before(:all) do 
    @group =  Factory(:group)
    @site = Factory(:site, :group => @group)
    @template = Factory(:javascript, :site => @site, :content => 'jQuery(document).ready();')
  end
  
  after(:all) do
    teardown
  end
  
  context 'methods' do  
    
    before(:each) do
      @js_view = Main::Views::Javascript.new @template
    end
    
    it "returns a template" do
      @js_view.template.should == 'jQuery(document).ready();'
    end
    
  end
  
end