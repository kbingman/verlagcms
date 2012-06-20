require File.dirname(__FILE__) + '/../acceptance_helper'

feature "Users", %q{
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

  scenario "view the admin users index" do 
    visit '/admin/' 
    click_link 'Users'
    
    
    sleep(0.013)
    
    pending
    page.should have_content(@current_user.name) 
    # page.should have_css("#edit-user-#{@current_user.id}") 
  end     
  
  scenario "edit an existing user" do 
    visit '/admin/'   
    click_link 'Users' 
    
    page.should have_content(@current_user.name) 
    click_link "edit-user-#{@current_user.id}"
    
    fill_in 'user_name', :with => 'New User Name'
    click_button 'Save'
    
    page.should have_content('New User Name')
  end
  
  scenario "create a new user" do 
    pending
    visit '/admin/'   
    click_link 'Users' 
    
    # page.should have_content(@current_user.name) 
    # click_link "edit-user-#{@current_user.id}"
    # 
    # fill_in 'user_name', :with => 'New User Name'
    # click_button 'Save'
    # 
    # page.should have_content('New User Name')
  end
end