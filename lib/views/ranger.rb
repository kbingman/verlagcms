class Ranger < Mustache
  self.template = <<-template
{{#range_0_to_10}}
  <option value="{{i}}">{{i}}</option>
{{/range_0_to_10}}
template

  def range(first, last)
    (first..last).map { |i| {:i => i} }
  end

  def method_missing(name, *args, &block)
    return super unless name.to_s =~ /^range_(\d+)_to_(\d+)/
    range($1, $2)
  end

  def respond_to?(method)
    method.to_s =~ /^range_(\d+)_to_(\d+)/
  end
end