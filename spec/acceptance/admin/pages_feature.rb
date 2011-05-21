require File.dirname(__FILE__) + '/../acceptance_helper'

feature "Admin Assest" do

  context 'A logged in user, with JS,' do
    
    before(:all) do 
      Capybara.current_driver = :zombie 
      @root = Factory(:page, :title => 'Home')
      @child = Factory(:page, :title => 'About', :parent => @root)  
    end
    
    after(:all) do
      Capybara.use_default_driver
    end
    
    scenario "views the admin pages index" do 
      visit '/admin/' 
      visit '/admin/#/pages'
      page.should have_css('#pages')
      page.should have_css('table') 
   
      page.should have_content(@root.title) 
      page.should have_content(@child.title) 
      
      page.should have_content('Add Child')  
      page.should have_content('Remove Page')  
    end 
    
    scenario "views the admin pages index" do 
      visit '/admin/' 
      visit '/admin/#/pages'    
      
      click_link(@root.title)   
      page.should have_content('Edit Page')
    end   
    
    scenario "views the admin pages index" do 
      visit '/admin/' 
      visit "/admin/#/pages/#{@root.id}"    

      page.should have_content('Edit Page') 
      page.should have_content('Add Part')
      page.should have_content('add asset') 
    end  
    
    scenario "views the admin pages index" do 
      visit '/admin/' 
      visit "/admin/#/pages/#{@root.id}"    

      click_link('add asset')   
      page.should have_css('#modal')  
      page.should have_css('#search-form') 
    end

  end
end