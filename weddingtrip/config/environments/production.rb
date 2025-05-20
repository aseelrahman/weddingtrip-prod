require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Code is not reloaded between requests.
  config.enable_reloading = false

  # Eager load code on boot for better performance and memory savings.
  config.eager_load = true

  # Full error reports are disabled.
  config.consider_all_requests_local = false

  # Enable caching
  config.action_controller.perform_caching = true

  # Serve static files if ENV variable is set (used in Elastic Beanstalk)
  config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present?

  # Cache assets with far-future expiry (digest stamped)
  config.public_file_server.headers = {
    "Cache-Control" => "public, max-age=#{1.year.to_i}"
  }

  # Disable asset compilation fallback (assets must be precompiled)
  config.assets.compile = false

  # Enable SSL and secure cookies
  config.assume_ssl = true
  config.force_ssl = true

  # Logging
  config.log_tags = [ :request_id ]
  config.logger = ActiveSupport::TaggedLogging.new(Logger.new(STDOUT))
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info")
  config.silence_healthcheck_path = "/up"

  # File storage
  config.active_storage.service = :local

  # Job queue adapter
  config.active_job.queue_adapter = :async

  # Email configuration (update host later with actual domain or EB URL)
  config.action_mailer.default_url_options = {
    host: "weddingtrip-env.eba-xxxx.us-east-1.elasticbeanstalk.com"
  }

  # I18n fallback
  config.i18n.fallbacks = true

  # Deprecation warnings
  config.active_support.report_deprecations = false

  # Cache store
  config.cache_store = :memory_store

  # Active Record (Uncomment if using PostgreSQL and a database)
  config.active_record.dump_schema_after_migration = false
  config.active_record.attributes_for_inspect = [:id]

  # DNS rebinding protection (optional)
  # config.hosts << "weddingtrip-env.eba-xxxx.us-east-1.elasticbeanstalk.com"
end
