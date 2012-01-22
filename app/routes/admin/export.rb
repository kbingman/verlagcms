class Main    
  
  namespace '/admin' do 
    namespace '/export' do
      
      get '/?' do
        respond_to do |format|
          format.html do
            admin_haml :'admin/export/index'
          end
        end
      end
      
      get '/assets' do
        assets = Asset.by_site(current_site).all
        r = []
        # TODO RABL goes here
        assets.each do |asset|
          a = {
            :id => asset.id.to_s,
            :title => asset.title,
            :tags => asset.tag_list,
            :site_id => asset.site_id,
            :filename => asset.file.filename,
            :file => ActiveSupport::Base64.encode64(asset.file.read)
          }
          r << a
        end
        respond_to do |format|
          format.json do
            { :assets => r }.to_json
          end
        end
      end
      
      post '/assets' do
        Asset.import(params[:file][:tempfile])
        redirect('/admin/export')
      end

    end  
  end 
  
end