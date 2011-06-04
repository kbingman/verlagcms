require 'spec_helper'

describe "routes/assets" do
  include Rack::Test::Methods
  
  before(:all) do 
    setup_site  
    @layout = Factory(:layout, :site_id => @site.id) 
    @page = Factory(:page, :title => 'root', :parent_id => nil, :site_id => @site.id, :layout => @layout)  
  end 
  
  after(:all) do
    teardown
  end   
  
  context 'GET index' do
    
    context 'html' do 
      def do_get
        get '/admin/pages'
      end
      
      it 'should be successful' do 
        pending 'deprecated'
        do_get
        last_response.should be_ok
      end
      
      it 'should set the content header to html' do
        pending 'deprecated'
        do_get
        last_response.headers['Content-Type'].should == 'text/html;charset=utf-8'
      end 
    end
    
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
    end
    
  end
  
end