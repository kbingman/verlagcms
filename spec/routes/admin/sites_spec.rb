require 'spec_helper'

describe "routes/admin/sites" do
  include Rack::Test::Methods
  before(:all) do 
    teardown
    build_complete_site 
    setup_site
  end
    
  after(:all) do
    teardown
  end
    
  context 'GET index' do  

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
      
    end
        
    context 'json' do   
      def do_post
        @site_name = Faker::Name.first_name
        post '/admin/sites.json', :site => { :name => @site_name, :group_id => @group.id }
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
        last_response.body.should include(@site_name)
      end  
    end
    
  end  
  
  context 'PUT update' do  
    
    before(:all) do 
      @new_name = Faker::Name.first_name
    end 
        
    context 'json' do   
      def do_put
        put "/admin/sites/#{@site.id}.json", :site => { :name => @new_name }
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
        last_response.body.should include(@new_name)
      end  
    end
  
  end
  
  context 'DELETE destroy' do  
    
    before(:each) do 
      @site = Factory(:site, :name => "Awesome Site", :subdomain => 'awesome', :group => @group)    
      @current_user.sites << @site
      @current_user.save
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