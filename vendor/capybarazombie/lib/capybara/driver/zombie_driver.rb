require "capybara/zombie/helpers"
require "capybara/zombie/executer"

class Capybara::Driver::Zombie < Capybara::Driver::Base
  include Capybara::Zombie::Helpers

  class Node < Capybara::Driver::Node
    include Capybara::Zombie::Helpers

    def visible?
      find("./ancestor-or-self::*[contains(@style, 'display:none') or contains(@style, 'display: none')]").empty?
    end

    def checked?
      native_json(".checked")
    end

    def selected?
      native_json(".selected")
    end

    def [](name)
      name = name.to_s
      name = "className" if name == "class"

      result = socket_send <<-JS
if(#{name.to_s == "value"} && #{native_ref}.tagName == "SELECT" && #{native_ref}.multiple) {
  var selected = [];
  var options = #{native_ref}.options;
  for(var i = 0; i < #{native_ref}.length; i++)
    if(options[i].selected)
      selected.push(options[i].value);
  stream.end(JSON.stringify(selected));
} else {
  stream.end(JSON.stringify(#{native_ref}[#{name.to_s.inspect}]));
}
      JS

      decode(result)
    end

    def text
      native_json(".textContent")
    end

    def tag_name
      native_json(".tagName").downcase
    end

    def value
      if tag_name == 'textarea'
        text
      else
        self[:value]
      end
    end

    def set(value)
      socket_write <<-JS
var node = #{native_ref},
    tagName = node.tagName;
if(tagName == "TEXTAREA") {
  node.textContent = #{encode(value)};
} else {
  var type = node.getAttribute('type');
  if(type == "checkbox") {
    #{encode(value)} ? browser.check(node) : browser.uncheck(node);
  } else if(type == "radio") {
    browser.choose(node);
  } else {
    browser.fill(node, #{encode(value)});
  }
}
      JS
    end

    def find(selector)
      @driver.find(selector, native_ref)
    end

    def select_option
      socket_write "browser.selectOption(#{native_ref})"
    end

    def unselect_option
      unless select_node['multiple']
        raise Capybara::UnselectNotAllowed, "Cannot unselect option from single select box."
      end
      socket_write "browser.unselectOption(#{native_ref})"
    end

    def click
      browser_wait :fire, "click".inspect, native_ref
    end

    def drag_to(element)
      # jQuery checks that (which == 1) to determine that the left button is pressed
      # jQuery uses $.ui.intersect to test for intersection
      fire "mousedown",    self, {}, {:button => 0, :which => 1, :pageX => 0, :pageY => 0}
      fire "mousemove", element, {}, {:button => 0, :which => 1, :pageX => 1, :pageY => 1}
      fire "mousemove", element, {}, {:button => 0, :which => 1, :pageX => 1, :pageY => 1}
      fire   "mouseup", element, {}, {:button => 0, :which => 1, :pageX => 1, :pageY => 1}
    end

    def native_ref
      "pointers[#{@native}]"
    end

    def trigger(event)
      fire(event.to_s, self)
    end

    private

    def select_node
      find('./ancestor::select').first
    end

    def native_json(call)
      socket_json "#{native_ref}#{call}"
    end

    def fire(name, target, options={}, attributes=nil)
      (options[:attributes]||={}).merge!(attributes) if attributes
      browser_wait :fire, name.inspect, target.native_ref, encode(options)
    end

  end

  class Headers
    def initialize(hash)
      @hash = hash
    end

    def [](key)
      pair = @hash.find { |pair| pair[0].downcase == key.downcase }
      # TODO We should not check this, we need to fix capybara tests
      pair && (pair[0] == "content-type" ? pair[1].split(";")[0] : pair[1])
    end
  end

  attr_reader :app, :rack_server, :options

  class << self
    def zombie
      @zombie ||= Capybara::Zombie::Executer.new
    end
  end

  def initialize(app, options={})
    @app = app
    @options = options
    @rack_server = Capybara::Server.new(@app)
    @rack_server.boot if Capybara.run_server
    
    self.class.zombie.animate!
    at_exit { self.class.zombie.kill }
  end

  def visit(path)
    browser_wait(:visit, encode(url(path)))
  end

  def response_headers
    Headers.new socket_json("browser.lastResponse.headers")
  end

  def status_code
    socket_json "browser.statusCode"
  end

  def body
    socket_json "browser.html()"
  end

  def source
    socket_json "browser.source"
  end

  def current_url
    socket_json "browser.location.toString()"
  end

  def evaluate_script(script)
    socket_json(_evaluate_script_command(script))
  end

  def execute_script(script)
    socket_write(_evaluate_script_command(script))
  end

  def find(selector, context=nil)
    args = [encode(selector), context].compact.join(",")

    ids = socket_send <<-JS
var sets = [];
browser.xpath(#{args}).value.forEach(function(node){
  pointers.push(node);
  sets.push(pointers.length - 1);
});
stream.end(JSON.stringify(sets));
    JS

    decode(ids).map { |n| Node.new(self, n) }
  end

  def reset!
    socket_write("browser.cookies(browser.window.location.hostname, '/').clear(); browser = null;")
  end

  private

  def url(path)
    rack_server.url(path)
  end

  def _evaluate_script_command(script)
    "browser.evaluate(#{encode(script)})"
  end
end

Capybara.register_driver :zombie do |app|
  Capybara::Driver::Zombie.new(app)
end
