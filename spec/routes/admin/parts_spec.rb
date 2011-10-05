# require 'spec_helper'
# 
# describe "routes/admin/parts" do 
#   
#   before(:all) do  
#     setup_site 
#     @layout = Factory(:layout, :site_id => @site.id)
#     @page = Factory(:page, :title => 'root', :parent_id => nil, :site_id => @site.id, :layout => @layout) 
#   end 
#   
#   after(:all) do
#     teardown
#   end
#   
#   context 'POST create page part' do
#     def do_post
#       post "/admin/pages/#{@page.id}/parts.json", :part => { :name => 'body', :page_id => @page.id }
#     end
#     
#     it "should be ok" do
#       do_post
#       last_response.should be_ok
#     end
#     
#     it "should correctly set the content type" do
#       do_post
#       last_response.headers['Content-Type'].should == 'application/json;charset=utf-8'
#     end 
#     
#     it "should include the page_id" do 
#       do_post 
#       logger.info(last_response.body.inspect)
#       JSON.parse(last_response.body)['id'].should == @page.id.to_s    
#     end 
#     
#     it "should include the name" do  
#       do_post 
#       logger.info(last_response.body.inspect)
#       JSON.parse(last_response.body)['parts'].first['name'].should include('body')
#     end  
#     
#     it "should include the page id" do  
#       do_post 
#       logger.info(last_response.body.inspect)
#       JSON.parse(last_response.body)['parts'].first['page_id'].should include(@page.id)
#     end 
#   end    
#   
#   context 'DELETE destroy' do
#         
#     context 'json' do  
#       before(:each) do   
#         # @page = Factory(:page, :title => 'root', :parent_id => nil, :site => @site)  
#         @page.parts << Part.new(:name => 'body', :page_id => @page.id)                              
#         @page.save     
#         @part = @page.parts.first                                   
#       end  
#       
#       after(:all) do
#         teardown
#       end
#        
#       def do_delete
#         delete "/admin/pages/#{@page.id.to_s}/parts/#{@part.id.to_s}.json"
#       end
#     
#       it 'should be successful' do 
#         do_delete
#         last_response.should be_ok
#       end
#       
#       it 'should set the content header to json' do 
#         do_delete
#         last_response.headers['Content-Type'].should == 'application/json;charset=utf-8'
#       end
#     
#       it 'should include pages in the json' do  
#         do_delete
#         JSON.parse(last_response.body)['parts'].should_not include(@part.to_json)
#       end  
#     end
#     
#   end
#   
# end