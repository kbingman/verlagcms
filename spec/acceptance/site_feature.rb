require File.dirname(__FILE__) + '/acceptance_helper'

feature "Home Page: " do

  context 'An anonymous user, with JS,' do
    
    before(:all) do
      setup_site  
      @artist = Factory(:artist, :name => 'Egon')
      @file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg'))
      @asset = Factory.build(:asset, :artist => @artist, :file => @file, :tags => ['Tie'], :site => @site) 
      @asset.save
    end
    
    before(:all) do
      # Seems zombie and davis don't get along...
      Capybara.current_driver = :zombie
    end
    
    after(:all) do
      Capybara.use_default_driver 
      teardown
    end
  
    scenario "views the home page" do
      visit '/#/'
      page.should have_content('Page')
      page.should have_css('h1')
      page.should have_css('#asset-list-container')
    end  
    
    scenario "enters a search term" do
      pending 'Zombie is not properly working with the History object'
      visit '/'    
      fill_in 'search-query', :with => "TIE"
      click_button 'Search'      
      
      page.should have_css('h1')
      page.should have_content('TIE')  
      
      page.should have_css('#assets') 
      page.should have_css("li#asset-#{@asset.id}")
    end  
    
    scenario "views an image" do  
      pending
      visit '/'
      fill_in 'search-query', :with => "TIE"
      click_button 'Search'      

      click_link @asset.title  
      page.should have_css('#modal') 
      page.should have_css("#image-display-#{@asset.id}")
      page.should have_css("#image-info-#{@asset.id}")
    end 
    
    scenario "closes an image" do 
      pending 
      visit '/'
      fill_in 'search-query', :with => "TIE"
      click_button 'Search'      

      click_link @asset.title  
      page.should have_css('#modal') 
      page.should have_css("#close-image-#{@asset.id}")
      
      # click_link "close image"
      # page.should_not have_css('#modal')  
    end
    
    scenario "returns to a saved search" do  
      visit '/' 
      visit '/#/search?query=TIE'
      
      page.should have_css('#assets')
      page.should have_content('TIE')
    end
    
  end
end