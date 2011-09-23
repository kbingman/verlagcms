require File.dirname(__FILE__) + '/../acceptance_helper'



feature "Assets Index", %q{
  In order to have a decent CMS
  As an author
  I want to 
} do
  
  before(:all) do
    teardown
    build_complete_site 
    setup_site  
    # @layout = Factory(:layout, :site_id => @site.id) 
    @file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg'))
    @asset = Factory.build(:asset, :file => @file, :tags => ['Tie'], :site => @site) 
    @asset.save
  end
  
  scenario "view the assets page" do 
    visit '/admin/'  
    click_link 'Images'        
    current_path.should == '/admin/assets'
    # screen_shot_and_save_page('assets-index')   
                                    
    page.should have_content('Assets')
    page.should have_css('h1')
    page.should have_css('#editor')
    page.should have_css("ul#assets li")
    # page.should have_css('a#assets.active')
  end
end
  
  # scenario "view an image" do 
  #   visit '/admin/'
  #   click_link 'Images'     
  #      
  #   current_path.should == '/admin/assets'
  #                                        
  #   page.should have_content('Assets')
  #   page.should have_css("li#asset-#{@asset.id}")
  #   
  #   click_link "edit-asset-#{@asset.id}"  
  #   
  #   page.should have_css("#image-display-#{@asset.id}")
  #   page.should have_css("#image-info-#{@asset.id}")  
  #   
  #   # # page.should have_css('a#assets.active')
  # end
  # 
  # scenario "close an image" do   
  #   visit '/admin/' 
  #   click_link 'Images'     
  #   click_link "edit-asset-#{@asset.id}"  
  #   
  #   click_link "Cancel"
  #   current_path.should == '/admin/assets'
  #   # page.should have_css('a#assets.active')
  # end
  
  # scenario "enter a search term" do 
  #   visit '/admin/'
  #   click_link 'Images'     
  #   fill_in 'search-query', :with => "TIE"
  #   click_button 'Search'      
  #   
  #   page.should have_css('h1')
  #   page.should have_content('TIE')  
  #   
  #   page.should have_css('#assets') 
  #   page.should have_css("li#asset-#{@asset.id}")
  #   page.should have_css('a#assets.active')
  # end  
  # 
  # scenario "view an image" do 
  #   visit '/admin/'
  #   click_link 'Images'     
  #   fill_in 'search-query', :with => "TIE"
  #   click_button 'Search'      
  # 
  #   click_link @asset.title  
  #   page.should have_css("#image-display-#{@asset.id}")
  #   page.should have_css("#image-info-#{@asset.id}")
  #   page.should have_css('a#assets.active')
  # end 
  # 
  # scenario "return to a saved search" do  
  #   visit '/admin/'
  #   visit '/admin/assets?query=TIE'
  #   
  #   page.should have_css("li#asset-#{@asset.id}")
  #   page.should have_content('TIE')
  #   page.should have_css('a#assets.active')
  # end
  # 
  # scenario "remove an image" do 
  #   visit '/admin/'
  #   click_link 'Images'                                              
  #   page.should have_content('Assets')
  #   page.should have_css("li#asset-#{@asset.id}")
  #   
  #   click_link "remove-asset-#{@asset.id}" 
  # 
  #   page.should have_css('.modal-strip')
  #   page.should have_css("#image-icon-#{@asset.id}")
  #   page.should have_css("#image-info-#{@asset.id}") 
  #    
  #   # TODO zombie hangs here 
  #   click_button('Delete')
  #   page.should_not have_css('#modal') 
  #   page.should_not have_css("li#asset-#{@asset.id}")   
  #   page.should have_css('a#assets.active')
  # end  
  
# end
