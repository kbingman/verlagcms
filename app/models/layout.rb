class Layout < Template
  
  many :part_types 
  
  # key :part_types_ids, Array
  # many :part_types, :in => :part_types_ids
  
  protected
        
    after_create :create_default_part_type
    def create_default_part_type
      p = PartType.new :name => 'body'
      p.layout_id = self.id 
      p.save   
    end 
  
end
