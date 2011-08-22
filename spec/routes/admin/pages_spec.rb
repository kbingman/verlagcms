require 'spec_helper'

describe "routes/pages" do
  include Rack::Test::Methods
  
  before(:all) do 
    setup_site  
    @layout = Factory(:layout, :site_id => @site.id) 
    @alt_layout = Factory(:layout, :name => 'alt', :site_id => @site.id) 
    @page = Factory(:page, :title => 'root', :parent_id => nil, :site_id => @site.id, :layout => @layout)   
    @child_a = Factory(:page, :parent_id => @page.id, :site_id => @site.id, :title => 'Child A', :layout => @layout) 
    @child_b = Factory(:page, :parent_id => @page.id, :site_id => @site.id, :title => 'Child B', :layout => @layout) 
  end 
  
  after(:all) do
    teardown
  end   
  
  context 'GET index' do
    
    # context 'html' do 
    #   def do_get
    #     get '/admin/pages'
    #   end
    #   
    #   it 'should be successful' do 
    #     pending 'deprecated'
    #     do_get
    #     last_response.should be_ok
    #   end
    #   
    #   it 'should set the content header to html' do
    #     pending 'deprecated'
    #     do_get
    #     last_response.headers['Content-Type'].should == 'text/html;charset=utf-8'
    #   end 
    # end
    
    context 'json' do   
      def do_get
        get '/admin/pages.json'
      end
    
      it 'should be successful' do
        do_get
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_get
        last_response.headers['Content-Type'].should == 'application/json'
      end
    
      it 'should include pages in the json' do  
        do_get
        last_response.body.should include(@page.title)
      end   
      
      it 'should not include pages from other sites' do   
        @alien_site = Factory(:site, :name => 'Alien', :subdomain => 'alien')  
        @alien_layout = Factory(:layout, :site_id => @alien_site.id, :name => 'alien')
        @alien_page = Factory(:page, :site_id => @alien_site.id, :layout_id => @alien_layout.id) 
        do_get 
        last_response.body.should_not include(@alien_page.title)  
      end
    end
    
  end 
  
  context 'POST create' do
        
    context 'json' do   
      def do_post
        post '/admin/pages.json', :page => { :title => 'The Page', :layout_id => @layout.id }
      end
    
      it 'should be successful' do
        do_post
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_post
        last_response.headers['Content-Type'].should == 'application/json'
      end
    
      it 'should include pages in the json' do  
        do_post
        last_response.body.should include('The Page')
      end  
    end
    
  end  
  
  context 'GET children' do 
        
    context 'json' do   
      def do_get
        get "/admin/pages/#{@page.id}/children.json"
      end
    
      it 'should be successful' do
        do_get
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_get
        last_response.headers['Content-Type'].should == 'application/json'
      end
    
      it 'should include pages in the json' do  
        do_get
        last_response.body.should include(@child_a.title)
      end 
      
      it 'should include pages in the json' do  
        do_get
        last_response.body.should include(@child_b.title)
      end  
   
    end  
  end    
  
  context 'PUT update' do  
          
    context 'json' do   
      def do_put
        put "/admin/pages/#{@page.id}.json", :page => { :title => 'New Title', :layout_id => @alt_layout.id  }
      end
    
      it 'should be successful' do
        do_put
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_put
        last_response.headers['Content-Type'].should == 'application/json'
      end
      
      it 'should include the new title in the json' do  
        do_put
        last_response.body.should include('New Title')
      end  
      
      it 'should include the new layout in the json' do  
        do_put
        last_response.body.should include(@alt_layout.id)
      end
    end

  end
  
  context 'DELETE destroy' do
        
    context 'json' do  
      before(:each) do 
        @page = Factory(:page, :title => 'killme', :parent_id => nil, :site_id => @site.id, :layout_id => @layout.id) 
      end    
      
      after(:all) do
        teardown
      end
       
      def do_delete
        delete "/admin/pages/#{@page.id}.json"
      end
    
      it 'should be successful' do
        do_delete
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_delete
        last_response.headers['Content-Type'].should == 'application/json'
      end
    
      it 'should include pages in the json' do  
        do_delete
        last_response.body.should_not include(@page.title)
      end  
      
      it 'should delete the page' do 
        page_id = @page.id
        do_delete
        Page.find(page_id).should be_nil
      end
    end
    
  end
  
end