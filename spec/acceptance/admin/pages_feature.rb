require File.dirname(__FILE__) + '/../acceptance_helper'

feature "Admin Assest" do

  context 'A logged in user, with JS,' do
    
    before(:all) do 
      Capybara.current_driver = :zombie  
      setup_site
      @root = Factory(:page, :title => 'Home', :site => @site)
      @child = Factory(:page, :title => 'About', :parent => @root, :site => @site)  
    end
    
    after(:all) do
      Capybara.use_default_driver  
      teardown
    end
    
    scenario "views the admin pages index" do 
      visit '/admin/' 
      visit '/admin/#/pages'
      page.should have_css('#pages')
      page.should have_css('table') 
   
      page.should have_content(@root.title) 
      page.should have_content(@child.title) 
      
      page.should have_content('Add Child')  
      page.should have_content('Remove')  
    end 
    
    scenario "views the admin pages index" do 
      visit '/admin/' 
      visit '/admin/#/pages'    
      
      click_link(@root.title)   
      page.should have_content('Edit Page')
    end   
    
    scenario "views the admin edit page directly" do 
      visit '/admin/' 
      visit "/admin/#/pages/#{@root.id}"    

      page.should have_content('Edit Page') 
      page.should have_content('Add Part')
      page.should have_content('add asset') 
    end        
    
    scenario "adds a page" do 
      visit '/admin/' 
      visit '/admin/#/pages'    
    
      click_link "add-child-#{@root.id}"   
      page.should have_content('New Page')     
      page.should have_css('#modal')
      
      fill_in 'page[title]', :with => 'Newer Page' 
      click_button 'Save'  
      
      page.should have_content('New Page')
    end
    
    scenario "removes a page" do 
      visit '/admin/' 
      visit '/admin/#/pages'  
        
      pending 'Zombie or Capybara is not finding a link with an id'
      click_link "remove-#{@child.id}"   
      page.should have_content('Remove Page')     
      page.should have_css('#modal') 
        
      # TODO zombie hangs here
      # click_button 'Delete' 
      # page.should_not have_content(@child.title)
    end 
    
    scenario "views the admin pages index" do 
      pending
      visit '/admin/' 
      visit "/admin/#/pages/#{@root.id}"    

      click_link('add asset')   
      page.should have_css('#modal')  
      page.should have_css('#search-form') 
    end

  end
end