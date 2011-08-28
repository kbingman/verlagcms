require 'acceptance/acceptance_helper'

feature "Pages", %q{
  In order to have a decent CMS
  As an author
  I want to create and manage pages
} do

  background do
    setup_site   
    @layout = Factory(:layout, :site_id => @site.id) 
    @root = Factory(:page, :title => 'Home', :site_id => @site.id, :layout_id => @layout.id)
    @child = Factory(:page, :title => 'About', :parent => @root, :site_id => @site.id, :layout_id => @layout.id)
  end

  scenario "Article index" do
    visit '/articles'
    page.should have_content('One')
    page.should have_content('Two')
  end

end