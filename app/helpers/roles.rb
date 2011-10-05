class Main
  module Admin 
    
    helpers do
      def model
        @model ||= params['model']
      end
      
      def klass 
        begin
          @klass ||= model.singularize.titlecase.constantize if model 
        rescue
          nil
        end
      end
    end
    
  end
end