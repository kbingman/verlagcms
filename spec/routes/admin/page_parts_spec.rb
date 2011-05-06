require 'spec_helper'

describe "routes/admin/page_parts" do 
  
  before(:each) do  
    # Stub this
    # @page = mock Page, :title => "The Page", :page_parts => [], :save => true, :id => '2176637660'
    # Page.stub!(:find => @page)  
    @page = Page.make  
  end
  
  context 'POST create page part' do
    def do_post
      post "/pages/#{@page.id}/parts.json", :part => { :name => 'body' }
    end
    
    it "should be ok" do
      do_post
      last_response.should be_ok
    end
    
    it "should correctly set the content type" do
      do_post
      last_response.headers['Content-Type'].should == 'application/json'
    end 
    
    it "should include the page_id" do
      do_post 
      logger.info(last_response.body.inspect)
      JSON.parse(last_response.body)['page_id'].should == @page.id.to_s    
    end 
    
    it "should include the name" do
      do_post 
      logger.info(last_response.body.inspect)
      JSON.parse(last_response.body)['name'].should == 'body'
    end   
  end
  
end