require File.dirname(__FILE__) + '/../acceptance_helper'

feature "Admin Assest" do

  context 'A logged in user, with JS,' do
    
    before(:all) do 
      Capybara.current_driver = :webkit
      setup_site  
      @artist = Factory(:artist, :name => 'Egon')
      @file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg'))
      @asset = Factory.build(:asset, :artist => @artist, :file => @file, :tags => ['Tie'], :site => @site) 
      @asset.save
    end   
    
    after(:all) do
      Capybara.use_default_driver 
      teardown
    end
    
    # before(:each) do
    #   # Seems zombie and davis don't get along...
    #   
    # end
    # 
    # after(:each) do
    #   Capybara.use_default_driver
    # end
  
    scenario "views the admin page" do   
      visit '/admin/'
      visit '/admin/#/assets'                                            
      page.should have_content('Assets')
      page.should have_css('h1')
      page.should have_css('#editor')
    end 
    
    scenario "views an image" do 
      visit '/admin/'
      visit '/admin/#/assets'                                          
      page.should have_content('Assets')
      page.should have_css("li#asset-#{@asset.id}")
      
      click_link "edit-asset-#{@asset.id}"  
   
      page.should have_css('#modal')
      page.should have_css("#image-display-#{@asset.id}")
      page.should have_css("#image-info-#{@asset.id}")     
    end 
    
    scenario "closes an image" do    
      visit '/admin/'
      visit '/admin/#/assets'
      click_link "edit-asset-#{@asset.id}"  
       
      pending
      page.should have_css('#modal')
      page.should have_css("#close-image-#{@asset.id}")
      
      click_link "cancel"
      page.should_not have_css('#modal')  
    end
    
    scenario "removes an image" do 
      visit '/admin/'
      visit '/admin/#/assets'                                          
      page.should have_content('Assets')
      page.should have_css("li#asset-#{@asset.id}")
      
      click_link "remove-asset-#{@asset.id}" 
   
      page.should have_css('#modal')
      page.should have_css("#image-display-#{@asset.id}")
      page.should have_css("#image-info-#{@asset.id}") 
       
      # TODO zombie hangs here 
      # click_button('Delete')
      # page.should_not have_css('#modal') 
      # page.should_not have_css("li#asset-#{@asset.id}")   
    end
    
    scenario "enters a search term" do 
      pending   
      visit '/admin/assets' 
      fill_in 'search-query', :with => "TIE"
      click_button 'Search'      
      
      page.should have_css('h1')
      page.should have_content('TIE')  
      
      page.should have_css('#assets') 
      page.should have_css("li#asset-#{@asset.id}")
    end  
    
    scenario "views an image" do 
      pending 
      visit '/admin/assets'
      fill_in 'search-query', :with => "TIE"
      click_button 'Search'      

      click_link @asset.title  
      page.should have_css('#modal') 
      page.should have_css("#image-display-#{@asset.id}")
      page.should have_css("#image-info-#{@asset.id}")
    end 
    
    scenario "returns to a saved search" do  
      pending
      visit '/admin/assets/#/search?query=TIE'
      
      page.should have_css('#assets')
      page.should have_content('TIE')
    end
    
  end
end