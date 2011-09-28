require 'spec_helper'
 
describe Activity do  
  before(:all) do  
    teardown
    build_complete_site
  end  
  
  after(:all) do
    teardown
  end
    
  it 'should create an activity log when a page is saved' do  
    @page.title = 'new title'
    @page.save
    Activity.find_by_loggable_id(@page.id).should_not be_nil
  end
  
  it 'should create an activity log when a page is saved' do  
    @layout.name = 'new name'
    @layout.save
    Activity.find_by_loggable_id(@layout.id).should_not be_nil
  end

end