require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
# require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
require 'neo4j/railtie'
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GraphAPI
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.generators do |g|
      g.orm             :neo4j
    end

    config.neo4j.session_options = { basic_auth: { username: 'neo4j', password: 'matneo4j'} }
    config.neo4j.session_type = :server_db
    config.neo4j.session_path = 'http://144.6.227.66:7474'
    # config.neo4j.session_path = 'http://localhost:7474'


  end
end
