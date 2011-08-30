class Main
  helpers do
    def model
      @model ||= params['model']
    end
    
    def klass 
      @klass ||= model.singularize.titlecase.constantize if model 
    end
    
  end
end