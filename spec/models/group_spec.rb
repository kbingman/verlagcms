require 'spec_helper'
 
describe Group do
  
  after(:all) do
    teardown
  end
  
  describe "validations" do
    it "should create a valid group" do
      Group.new(:name => 'Big Group').should be_valid
    end
    
    it "should require a name" do
      Group.new(:name => '').should_not be_valid
    end  
  end
  
  # context 'valid group' do
  #   before(:all) do
  #     @group = Factory(:group, :name => 'Big Group')
  #   end
  #   
  #   after(:all) do
  #     teardown
  #   end
  #   
  # end
  
end