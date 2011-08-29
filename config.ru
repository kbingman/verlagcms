require "./init"

require 'rack/raw_upload'
use Rack::RawUpload

Main.set :run, false
Main.set :environment, :production

run Main
