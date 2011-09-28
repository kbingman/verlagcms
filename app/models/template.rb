class Template
  include MongoMapper::Document
  include Canable::Ables
  
  key :name, String, :required => true #, :unique => true 
  key :content, String  
  
  key :site_id, ObjectId, :required => true 
  belongs_to :site, :foreign_key => :site_id 
  
  # Activity monitor
  many :activities, :as => :loggable
  
  validates :name, :uniqueness => { :scope => :site_id }
  
  def self.by_site(site, admin = false)
    self.where :site_id => site.id
  end
  
  timestamps! 
  
  attr_accessible :content, :name  
  
  def klass
    self.class.name
  end
  
  def layout?
    self.class.name == 'Layout'
  end
  
  def class_name
    'Layout'
  end
  
  def as_json(options)
    super(:methods => [:klass, :class_name, :mode, :part_types, :layout?])
  end 
  
  def mode
    'liquid'
  end
  
  def render
    template = Liquid::Template.parse(self.content)
    template.render({
      'site' => SiteDrop.new(self.site, nil), 
      'registers' => { 'site_id' => self.site_id.to_s }
    })
  end
  
  protected
  
    # After Save
    # ----------------------------------------
    after_save :set_activity
    def set_activity
      a = Activity.new(:loggable => self)
      a.save
    end

end