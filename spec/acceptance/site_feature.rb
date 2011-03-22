require File.dirname(__FILE__) + '/acceptance_helper'

feature "Home Page: " do

  context 'An anonymous user, JS' do
    
    before(:each) do
      # Seems zombie and davis don't get along...
      Capybara.current_driver = :zombie
    end
    
    after(:each) do
      # Capybara.use_default_driver
    end
  
    scenario "views the home page" do
      visit '/'
      page.should have_css('h1')
      
      click_link('The Other Page')
      page.should have_css('h1')
      page.should have_content('Page other')
    end
    
    scenario "views the home page" do
      visit '/'
      page.should have_css('#content')
      fill_in 'search-query', :with => "roversi"
      click_button 'Search'

      page.should have_css('h1')
      page.should have_content('roversi')
      # page.should have_css('#thumbnails')
    end
    
  end
end