require File.dirname(__FILE__) + '/acceptance_helper'

feature "Home Page: " do

  context 'An anonymous user, JS' do
    
    before(:all) do
      @artist = Artist.make(:name => 'Egon')
      @file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg'))
      @asset = Asset.make(:artist => @artist, :file => @file, :tag_list => 'TIE')
    end
    
    before(:each) do
      # Seems zombie and davis don't get along...
      Capybara.current_driver = :zombie
    end
    
    after(:each) do
      Capybara.use_default_driver
    end
  
    scenario "views the home page" do
      visit '/'
      # page.should have_content('Start')
      page.should have_css('h1')
      page.should have_css('#asset-list-container')
    end
    
    scenario "views the home page" do
      visit '/'
      page.should have_css('#content')
      fill_in 'search-query', :with => "TIE"
      click_button 'Search'
      

      # page.should have_css('#assets')
      page.should have_content('TIE')
      # page.should have_css('#assets')
    end
    
  end
end