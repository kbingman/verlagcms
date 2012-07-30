require 'rubygems'
require 'bundler'

Bundler.require
require './init'

desc 'Default task: run all tests'
task :default => [:spec]

task :spec do
  exec 'thor monk:spec'
end

task :features do
  exec 'thor monk:features'
end

namespace :assets do
  desc 'compile assets'
  task :compile => [:compile_js, :compile_css] do
  end

  desc 'compile javascript assets'
  task :compile_js do
    sprockets = Main.settings.sprockets
    asset     = sprockets['application.js']
    outpath   = File.join(Main.settings.assets_path)
    outfile   = Pathname.new(outpath).join('application.js') # may want to use the digest in the future?

    FileUtils.mkdir_p outfile.dirname

    asset.write_to(outfile)
    asset.write_to("#{outfile}.gz")
    puts 'successfully compiled js assets'
  end

  desc 'compile css assets'
  task :compile_css do
    sprockets = Main.settings.sprockets
    asset     = sprockets['application.css']
    outpath   = File.join(Main.settings.assets_path)
    outfile   = Pathname.new(outpath).join('application.css') # may want to use the digest in the future?
    
    FileUtils.mkdir_p outfile.dirname

    asset.write_to(outfile)
    asset.write_to("#{outfile}.gz")
    puts 'successfully compiled css assets'
  end
  # todo: add :clean_all, :clean_css, :clean_js tasks, invoke before writing new file(s)
end