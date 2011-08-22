require 'spec_helper'

describe "routes/users" do
  include Rack::Test::Methods
  
  before(:all) do 
    setup_site
    @user = Factory.build(:user, :password => 'secret')
    @user.sites << @site
    @user.save
  end 
  
  after(:all) do
    teardown
  end   
  
  context 'GET index' do
    
    context 'json' do   
      def do_get
        get '/admin/users.json'
      end
    
      it 'should be successful' do
        do_get
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_get
        last_response.headers['Content-Type'].should == 'application/json'
      end
    
      it 'should include users in the json' do  
        do_get     
        last_response.body.should include(@user.name)
      end   
      
      it 'should not include users from other sites' do   
        @alien_site = Factory(:site, :name => 'Alien', :subdomain => 'alien')
        @alien_user = Factory.build(:user, :name => 'Alien user') 
        @alien_user.sites << @alien_site
        @alien_site.save
        do_get 
        last_response.body.should_not include(@alien_user.name)  
      end
    end
    
  end 
  
  context 'POST create' do
        
    context 'json' do   
      def do_post
        post '/admin/users.json', :template => { :name => 'Template', :site_id => @site.id, :klass => 'user' }
      end
    
      it 'should be successful' do
        do_post
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_post
        last_response.headers['Content-Type'].should == 'application/json'
      end 
    end
    
  end  
  
  context 'PUT update' do     
        
    context 'json' do   
      def do_put
        put "/admin/users/#{@user.id}.json", :user => { :name => 'Rename' }
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
        last_response.body.should include('Rename')
      end  
    end

  end
  
  context 'DELETE destroy' do  
    
    before(:each) do 
      @killme = Factory.build(:user, :name => 'killme') 
      @killme.sites << @site
      @killme.save 
    end
        
    context 'json' do    
      def do_delete
        delete "/admin/users/#{@killme.id}.json"
      end
    
      it 'should be successful' do
        do_delete
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_delete
        last_response.headers['Content-Type'].should == 'application/json'
      end 
      
      it 'should delete the user' do 
        user_id = @killme.id
        do_delete
        User.find(user_id).should be_nil
      end
    end
    
  end

end