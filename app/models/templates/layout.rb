class Layout < Template
  
  many :part_types 
  
  # key :part_types_ids, Array
  # many :part_types, :in => :part_types_ids
  
  def mode
    'html'
  end
  
  protected
        
    after_create :create_default_part_type
    def create_default_part_type
      p = PartType.new :name => 'body', :kind => 'Part'
      p.layout = self 
      p.save 
      self.part_types << p
      self.save 
    end 
  
end
