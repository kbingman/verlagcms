require File.dirname(__FILE__) + '/../acceptance_helper'

feature "Sites", %q{
  In order to have a decent CMS
  As an author
  I want to 
} do

  before(:all) do
    teardown
    build_complete_site 
    setup_site   
  end
  
  after(:all) do 
    teardown
  end

  scenario "view the admin sites index" do 
    visit '/admin/' 
    click_link 'Sites'
    page.should have_css('#sidebar ul')
    
    sleep(0.013)
 
    page.should have_content(@site.name) 
    page.should have_css('a#sites.active')
    # page.should have_css("#edit-site-#{@site.id}") 
  end     
  
  scenario "edit a site" do 
    visit '/admin/'   
    click_link 'Sites' 
    
    page.should have_content(@site.name) 
    page.should have_css('a#sites.active')
    click_link "edit-site-#{@site.id}"
    fill_in 'site_name', :with => 'New Name'
    click_button 'Save'
  
    page.should have_content('New Name')
    page.should have_css('a#sites.active')
  end
end