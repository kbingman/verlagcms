class Activity
  
  include MongoMapper::Document
  # plugin MongoMapper::Plugins::IdentityMap
  
  def self.initialize
    puts 'hey'
  end
  
  key :loggable_type, String 
  key :loggable_id, ObjectId
  
  key :now, Integer
  
  belongs_to :loggable, :polymorphic => true
  
  key :user_id, ObjectId
  belongs_to :user, :foreign_key => :user_id  
  
  timestamps! 
  
  protected
   
    before_save :set_now
    def set_now
      self.now = (Time.now.to_f * 1000).to_i
    end
      
  
end