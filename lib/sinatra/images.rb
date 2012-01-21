require 'sinatra/base'   

module Sinatra                                   
  module Images  
    module Helpers  
      
      def image_types 
        types = {
          'vnd.ms-opentype' => 'font',
          'x-font-ttf' => 'font',
          'pdf' => 'pdf'}
        types
      end
      
      def resize_image(image, width, height, options={})
        # Needs to check for correct gravity, ie. North, South, East, West, Center
        gravity = options[:gravity] ? options[:gravity].titlecase : 'Center'
        gravity = 'Center' unless ['North', 'South', 'East', 'West', 'Center'].include?(gravity)
        quality = options[:quality] || '72' 
      
        cols, rows = image[:dimensions]
        if options[:crop] == true
          image.combine_options do |cmd|
            if width != cols || height != rows
              scale = [width/cols.to_f, height/rows.to_f].max
              cols = (scale * (cols + 0.5)).round
              rows = (scale * (rows + 0.5)).round
              cmd.resize "#{cols}x#{rows}"
            end
            cmd.gravity gravity
            cmd.quality quality
            cmd.extent "#{width}x#{height}" if cols != width || rows != height
          end
        else
          image.combine_options do |cmd|
            if width != cols || height != rows
              cmd.resize("#{width}x#{height}")
            end
            cmd.quality quality
          end
        end
        image = yield(image) if block_given?
        image
      end
      
    end 
    
    def self.registered(app)  
      app.helpers Images::Helpers
    
      app.get '/images/:id/:filename' do
        # cache_request(3600 * 24) # 24 Hour cache
        cache_control :public, :max_age => 3600 * 24
        etag Digest::MD5.hexdigest(params.to_s)
        
        h = params['h']
        w =  params['w']
        crop = params['c'] == 't' ? true : false
        gravity = params['g'] || 'Center' 

        begin
          asset = Asset.find params[:id]
          status 200 

          if asset.file_type.match(/image/) && !asset.file_type.match(/svg/) && (params['h'] || params['w'])
            content_type(asset.file_type)
            # image = asset.render_image(w.to_i, h.to_i, {:crop => crop, :gravity => gravity})
            image = MiniMagick::Image.read(asset.file.read)
            image = resize_image(image, w.to_i, h.to_i, {:crop => crop, :gravity => gravity})
            image.to_blob
          elsif params['h'] || params['w']
            file_type = asset.file_type.split('/').last
            
            puts('file_type ' + file_type)
            icon_type = image_types[file_type].blank? ? 'file' : image_types[file_type]
            
            # Makes an icon for non image files
            content_type 'image/png'
            file = File.open(root_path("icons/#{icon_type}.png"));
            image = MiniMagick::Image.read(file)
            image = resize_image(image, w.to_i, h.to_i, {:crop => crop, :gravity => 'Center'})
            image.to_blob
          else
            asset.file.read
          end
          
        rescue BSON::InvalidObjectId
          status 404 
          haml :'site/404'
        end
      end 
      
      app.get '/images/:size/:id/:filename' do
        # cache_request(3600 * 24) # 24 Hour cache 
        # response['Cache-Control'] = "max-age=#{3600 * 24}, public"  
        
        cache_control :public, :max_age => 3600 * 24
        etag Digest::MD5.hexdigest(params.to_s)  
        
        h, w, crop = [nil, nil, {}]
        monk_settings(:images).each do |key, value|  
          if key.to_s == params[:size] 
            h, w, crop = value 
          end      
        end    

        begin
          asset = Asset.find params[:id]
          status 200 
          content_type(asset.file_type)
          
          if asset.file_type.match(/image/)
            image = MiniMagick::Image.read(asset.file.read)
            image = resize_image(image, w.to_i, h.to_i, {:crop => crop})
            image.to_blob  
          else
            asset.file.read
          end
            
        rescue BSON::InvalidObjectId
          status 404 
          haml :'site/404'
        end
      end      

    end
  end    

  register Images

end