require File.dirname(__FILE__) + '/../acceptance_helper'

feature "Layouts", %q{
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

  scenario "view the admin layouts index" do 
    visit '/admin/' 
    click_link 'Templates'
    
    current_url.should match(%r(/#/templates$))
    
    page.should have_css('#sidebar ul')
    page.should have_content(@layout.name) 
    page.should have_content('x') 
    page.should have_css("#remove-layout-#{@layout.id}") 
  end     
  
  scenario "edit a layout" do 
    visit '/admin/' 
    click_link 'Templates'
    
    page.should have_content(@layout.name) 
    click_link @layout.name
    fill_in 'layout_name', :with => 'layout.html'
    click_button 'Save'

    page.should have_content('layout.html')
  end
end
