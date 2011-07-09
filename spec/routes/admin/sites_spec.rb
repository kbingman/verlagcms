require 'spec_helper'

describe "routes/templates" do
  include Rack::Test::Methods
    
  context 'GET index' do  
    
    before(:all) do 
      setup_site
      @site = Factory(:site, :name => "Awesome Site", :subdomain => 'awesome')  
    end 

    after(:all) do
      teardown
    end
    
    context 'json' do   
      def do_get
        get '/admin/sites.json'
      end
    
      it 'should be successful' do
        do_get
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_get
        last_response.headers['Content-Type'].should == 'application/json'
      end
    
      it 'should include sites in the json' do  
        do_get     
        last_response.body.should include(@site.name)
      end   
    end
    
  end 
  
  context 'POST create' do  
    
    before(:all) do 
      setup_site  
    end
    
    after(:each) do
      teardown
    end
        
    context 'json' do   
      def do_post
        post '/admin/sites.json', :site => { :name => 'More Awesomeness', :subdomain => 'moreawesome' }
      end
    
      it 'should be successful' do
        do_post
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_post
        last_response.headers['Content-Type'].should == 'application/json'
      end
    
      it 'should include the name in the json' do  
        do_post
        last_response.body.should include('More Awesomeness')
      end  
    end
    
  end  
  
  context 'PUT update' do  
    
    before(:all) do 
      setup_site
      @site = Factory(:site, :name => "Awesome Site", :subdomain => 'awesome')  
    end 
    
    after(:all) do
      teardown
    end   
        
    context 'json' do   
      def do_put
        put "/admin/sites/#{@site.id}.json", :site => { :name => 'Really Awesome Site' }
      end
    
      it 'should be successful' do
        do_put
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_put
        last_response.headers['Content-Type'].should == 'application/json'
      end
      
      it 'should include pages in the json' do  
        do_put
        last_response.body.should include('Really Awesome Site')
      end  
    end
  
  end
  
  context 'DELETE destroy' do  
    
    before(:each) do 
      @site = Factory(:site, :name => "Awesome Site", :subdomain => 'awesome')    
    end
        
    context 'json' do    
      def do_delete
        delete "/admin/sites/#{@site.id}.json"
      end
    
      it 'should be successful' do
        do_delete
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_delete
        last_response.headers['Content-Type'].should == 'application/json'
      end 
      
      it 'should delete the site' do 
        site_id = @site.id
        do_delete
        Site.find(site_id).should be_nil
      end
    end
    
  end
  
end