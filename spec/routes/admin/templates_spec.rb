require 'spec_helper'

describe "routes/templates" do
  include Rack::Test::Methods
  
  before(:all) do 
    setup_site
    @layout = Factory(:layout, :site_id => @site.id)  
  end 
  
  after(:all) do
    teardown
  end   
  
  context 'GET index' do
    
    context 'json' do   
      def do_get
        get '/admin/templates.json'
      end
    
      it 'should be successful' do
        do_get
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_get
        last_response.headers['Content-Type'].should == 'application/json'
      end
    
      it 'should include layouts in the json' do  
        do_get     
        last_response.body.should include(@layout.name)
      end   
      
      it 'should not include layouts from other sites' do   
        @alien_site = Factory(:site, :name => 'Alien', :subdomain => 'alien')
        @alien_layout = Factory(:layout, :site => @alien_site, :name => 'Alien Layout') 
        do_get 
        last_response.body.should_not include(@alien_layout.name)  
      end
    end
    
  end 
  
  context 'POST create' do
        
    context 'json' do   
      def do_post
        post '/admin/templates.json', :template => { :name => 'Template', :klass => 'layout' }
      end
    
      it 'should be successful' do
        do_post
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_post
        last_response.headers['Content-Type'].should == 'application/json'
      end
    
      it 'should include the template in the json' do  
        do_post
        last_response.body.should include('Template')
      end  
      
      it 'should include the class in the json' do  
        do_post
        last_response.body.should include('Layout')
      end
    end
    
  end  
  
  context 'PUT update' do  
    
    before(:all) do 
      @template = Factory(:layout, :name => 'Template', :site_id => @site.id) 
    end    
        
    context 'json' do   
      def do_put
        put "/admin/templates/#{@template.id}.json", :template => { :name => 'Rename', :site_id => @site.id, :klass => 'layout' }
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
      @killme = Factory(:layout, :name => 'killme', :site_id => @site.id)  
    end
        
    context 'json' do    
      def do_delete
        delete "/admin/templates/#{@killme.id}.json"
      end
    
      it 'should be successful' do
        do_delete
        last_response.should be_ok
      end
      
      it 'should set the content header to json' do
        do_delete
        last_response.headers['Content-Type'].should == 'application/json'
      end 
      
      it 'should delete the template' do 
        template_id = @killme.id
        do_delete
        Template.find(template_id).should be_nil
      end
    end
    
  end

end