require 'spec_helper'
 
describe Page do  
  before(:all) do  
    @site = Factory(:site) 
    @second_site = Factory(:site, :name => 'second', :subdomain => 'second')  
    # @layout = Factory(:layout, :name => 'Layout', :site => @site, :content => '<h1>{{page.title}}</h1>')             
    @layout = @site.templates.first   
    @layout.content = '<h1>{{page.title}}</h1>'
    @layout.save
    @part_type = Factory(:part_type, :name => 'body', :layout_id => @layout.id)
    @root = @site.root 
    @child = Factory(:page, 
      :title => 'Child', 
      :parent_id => @root.id, 
      :tag_list => 'tag1, tag2',
      :layout => @layout, 
      :site => @site) 
  end  
  
  after(:all) do
    teardown
  end
  
  describe 'validations' do
    it 'should create a valid page' do  
      page = Factory.build(:page, :site_id => @site.id, :layout_id => @layout.id, :title => 'page', :parent_id => @root.id) 
      # page.valid?  
      page.should be_valid
    end
    
    it 'should allow a root page with another site_id' do 
      second_root = Factory(:page, :title => 'root', :site_id => @second_site.id, :layout => @layout)
    end
   
    it 'should require a site' do
      Factory.build(:page, :site => nil, :layout_id => @layout.id).should_not be_valid
    end 
    
    it 'should require a layout' do  
      Factory.build(:page, :site => @site, :layout_id => nil).should_not be_valid
    end
    
    it 'should require a title' do
      Factory.build(:page, :title => '', :site => @site, :layout_id => @layout.id).should_not be_valid
    end   
    
    it 'should have a unique slug, within its parent' do
      # @parent = 
    end 
  end
  
  context 'valid page' do
    before(:all) do  
      
    end
     
    describe 'attributes' do 
      it 'should set the slug for the root page' do
         @root.slug.should == '/'
      end
      
      it 'should have a path for the root page' do
        @root.path.should == '/'  
      end    
      
      it 'should have a path for the child page' do
        @child.path.should == '/child/'  
      end  
      
      it 'should have an edit path' do
        @child.edit_path.should == '/edit/child/'
      end
      
      it 'should set the level for the root page' do
         @root.level.should == 0
      end 
      
      it 'should set the padding' do 
        @root.padding.should == 0
      end  
      
      it 'should set the level for a child page' do
        @child.level.should == 1
      end 
      
      it 'should set the padding for a child page' do
        @child.padding.should == 12
      end  
  
      it 'should return a tag list' do
        @child.tag_list.should == 'tag1, tag2'
      end
  
      it 'should set the tags' do
        @child.tag_list = 'tag1, tag3, tag4'
        @child.tags.should == ['tag1', 'tag3', 'tag4']
      end 
    end 
    
    describe '#find_by_path' do
      it 'should find the root page' do
        Page.find_by_path('/', @site).should == @root    
      end
      
      it 'should find a page by path' do
        Page.find_by_path('/child/', @site).should == @child
      end 
      
      it 'should find a page by path without the trailing slash' do
        Page.find_by_path('/child', @site).should == @child
      end  
      
      it 'should find pages by tag' do
        Page.search('tag1').all.should == [@child]
      end  
      
      it 'should find pages by all tags' do
        Page.search_all('tag1 tag2').all.should == [@child]
      end 
      
      it 'should find pages by all tags' do
        Page.search_all('tag1 tag5').all.should_not == [@child]
      end
    end  
    
    describe '#render' do  
      it 'should have a layout' do
        @child.layout.should_not be_nil
      end
      
      it 'should respond to render' do
        @child.should respond_to(:render)
      end   
      
      it 'should render the page (html)' do
        @child.render(:html).should == '<h1>Child</h1>'
      end   
      
      it 'should render the page (json)' do
        @child.render(:json).should == @child.to_json
      end
    end  
    
    describe 'api' do
      #TODO
    end  
    
    describe '#parts' do    
      
      it 'should build parts according to its layout' do
        @root.part_names.should == [@part_type.name]
      end   
      
      context 'new parts' do
        before(:all) do
          @new_part_type = Factory.build(:part_type, :name => 'sidebar', :layout_id => @layout.id) 
          @layout.part_types << @new_part_type
          # Because part_types are embedded
          @layout.save
        end    
        
        it 'should update all parts' do 
          # pending
          @root.save
          @root.part_names.should == [@part_type.name, @new_part_type.name]
        end
      end

    end
    
    describe '#assets' do  
      
      before(:each) do 
        @file = File.open(root_path('spec/data/830px-Tieboardingcraft.jpg')) 
        @asset = Factory(:asset, :file => @file, :title => 'Image', :site_id => @site.id) 
        @page = Factory(:page, 
          :title => 'Child', 
          :parent_id => @root.id, 
          :assets => [@asset],
          :layout => @layout, 
          :site_id => @site.id)
      end  
      
      after(:each) do
        teardown
      end
      
      it 'should have assets'  do
        @page.assets.should == [@asset]
      end 
      
      it 'should delete the page'  do
        id = @page.id
        @page.destroy
        Page.find(id).should be_nil
      end  
      
      it 'should not delete the asset'  do
        id = @asset.id 
        page_id = @page.id
        @page.destroy
        Page.find(page_id).should be_nil 
        Asset.find(id).should_not be_nil    
      end
      
    end
       
  end
  
end