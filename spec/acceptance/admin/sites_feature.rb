require File.dirname(__FILE__) + '/../acceptance_helper'

feature "Sites", %q{
  In order to have a decent CMS
  As an author
  I want to 
} do

  before(:all) do
    setup_site   
  end

  scenario "view the admin sites index" do 
    visit '/admin/' 
    visit '/admin/#/sites'
    page.should have_css('#sidebar ul')
    
    sleep(0.013)
 
    page.should have_content(@site.name) 
    # page.should have_css("#edit-site-#{@site.id}") 
  end     
  
  scenario "edit a layout" do 
    visit '/admin/' 
    visit '/admin/#/sites'   
    
    page.should have_content(@site.name) 
    click_link "edit-site-#{@site.id}"
    fill_in 'site_name', :with => 'New Name'
    click_button 'Save'
  
    page.should have_content('New Name')
  end
end