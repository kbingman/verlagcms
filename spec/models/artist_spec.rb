require 'spec_helper'
 
describe Artist do
  
  describe "validations" do
    it "should create a valid artist" do
      Artist.new(:name => 'Fred').should be_valid
    end
    
    it "should require a name" do
      Artist.new(:name => '', :bio => 'Bio').should_not be_valid
    end  
  end
  
  context 'valid artist' do
    before(:all) do
      @artist = Artist.make
    end
    
    after(:all) do
      teardown
    end
    
    it 'should return api attributes' do
      @artist.api_attributes.should == { :id => @artist.id.to_s, 
                                         :class => 'artist', 
                                         :name => 'Fred', 
                                         :bio => 'Bio',
                                         :slug => 'fred',
                                         :created_at => @artist.created_at.strftime('%S%M%H%d%m%Y') }
    end
  end
  
end
