require 'spec_helper'

describe "routes/search" do
  include Rack::Test::Methods

  before(:all) do        
    # TODO stubbing all this will speed things up...
    @artist = Artist.make()
    @asset = Asset.make(:artist => @artist, :tags => ['naked'])
  end 
  
  after(:all) do
    teardown
  end
    
  context 'html' do
    # the '.html' is not visible in the browser, but is sent to sinatra
    
    context 'search with query' do
      it 'should be successful' do
        get '/search', :query => 'naked'
        last_response.should be_ok
      end
    end
    
    context 'asset with query' do   
      def do_get
        get '/search', :id => @asset.id, :query => 'naked'         
      end
      
      it 'should be successful' do 
        do_get
        last_response.should be_ok   
      end 
    end
  end
  
  context 'json' do  
    context 'seach with query' do   
      def do_get
        get '/search.json', :query => 'naked girls'
      end
      
      it 'should be successful' do
        do_get
        last_response.should be_ok
      end
      
      it 'should include assets in the json' do
        do_get
        last_response.body.should_not include(@asset.to_json)
      end  
    end  
    
    context 'asset with query' do  
      def do_get
        get '/search.json', :id => @asset.id, :query => 'naked'     
      end
      
      it 'should be successful' do   
        do_get 
        last_response.should be_ok
      end 
      
      it 'should include assets in the json' do
        do_get
        last_response.body.should include(@asset.to_json)
      end   
    end
  end
  
end