class Role
  attr_accessor :id, :name

  def initialize(options = {})
    options = options.symbolize_keys
    @id, @name = options[:id], options[:name]
  end
  
  def symbol
    @name.to_s.downcase.intern
  end
  
  def self.[](value)
    @@roles.find { |role| role.symbol == value.to_s.downcase.intern }
  end
  
  def self.find(id)
    @@roles.find { |role| role.id.to_s == id.to_s }
  end
  
  def self.find_all
    @@role.dup
  end
  
  # def self.selectable
  #   find_all - [self['Scheduled']]
  # end
    
  def self.selectable_values
    self.selectable.map(&:name)
  end
  
  @@roles = [
    Role.new(:id => 1,   :name => 'User'),
    Role.new(:id => 100, :name => 'Admin'),
    Role.new(:id => 101, :name => 'SuperUser')
  ]
  
end