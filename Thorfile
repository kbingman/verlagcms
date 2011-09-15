class Monk < Thor
  include Thor::Actions
  
  # Runs specs
  # monk spec
  desc "spec", "Run all specs"
  def spec
    spec_root = File.join(File.dirname(__FILE__), 'spec')
    spec_files = Dir[File.join(spec_root, '**', '*spec.rb')].map{ |f| File.expand_path(f) }.join(' ')
    spec_opts = "-f p -c -b -p"
    exec "bundle exec rspec #{spec_opts} #{spec_files}"
  end

  # Runs acceptance scenerios
  # monk acceptance
  desc "features", "Run all Steak features"
  def features
    acceptance_root = File.join(File.dirname(__FILE__), 'acceptance')
    spec_files = Dir[File.join(acceptance_root, '**', '*feature.rb')].map{ |f| File.expand_path(f) }.join(' ')
    spec_opts = "-f p -c -b -p"  
    puts 'jim compress'
    puts `bundle exec rspec #{spec_files}`
  end
  
  # Start command
  # monk start
  desc "start ENV", "Start Monk in the supplied environment"
  def start(env = ENV["RACK_ENV"] || "development")
    verify_config(env)

    exec "bundle exec env RACK_ENV=#{env} ruby init.rb"
  end
  
  # Console command
  # monk console
  desc "console ENV", "Start the Monk console in the supplied environment"
  def console(env = ENV["RACK_ENV"] || "development")
    verify_config(env)
    exec "bundle exec env RACK_ENV=#{env} irb -r #{File.dirname(__FILE__) + '/init.rb'} "
  end
  
  # Deploys (pushes) to Heroku
  # monk deploy
  desc "deploy ENV", "Push to the heroku server, but first builds the Jim files and compresses the js"
  def deploy(env = ENV["RACK_ENV"] || "development")
    puts 'jim compress'
    puts `git add .`
    puts `git commit -m "compressed js"`
  end
  
  # Bootstraps a new site and user 
  # monk bootstrap
  desc "bootstrap ENV", "Bootstraps a site and admin user"
  def bootstrap(env = ENV["RACK_ENV"] || "development")
    verify_config(env)
    puts 'still in progress...'
  end

  desc "copy_example EXAMPLE, TARGET", "Copies an example file to its destination"
  def copy_example(example, target = target_file_for(example))
    File.exists?(target) ? return : say_status(:missing, target)
    File.exists?(example) ? copy_file(example, target) : say_status(:missing, example)
  end

private

  def self.source_root
    File.dirname(__FILE__)
  end

  def target_file_for(example_file)
    example_file.sub(".example", "")
  end

  def verify_config(env)
    verify "config/settings.example.yml"
  end

  def verify(example)
    copy_example(example) unless File.exists?(target_file_for(example))
  end

end
