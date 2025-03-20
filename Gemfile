source "https://rubygems.org"

# Rails Framework
# Use the latest stable version of Rails
gem "rails", "~> 8.0.1"

# Modern Asset Pipeline
gem "propshaft"

# Database
gem "pg", "~> 1.1"

# Web Server
gem "puma", ">= 5.0"

# JavaScript Bundling
gem "jsbundling-rails"

# Hotwire Framework
gem "turbo-rails"
gem "stimulus-rails"

# CSS Bundling
gem "cssbundling-rails"

# JSON APIs
gem "jbuilder"

# Optional Features
# Secure Passwords
# gem "bcrypt", "~> 3.1.7"

# Timezone Support for Windows
gem "tzinfo-data", platforms: %i[windows jruby]

# Caching and Queues
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"

# Performance Optimization
gem "bootsnap", require: false

# Deployment with Docker
gem "kamal", require: false

# HTTP Asset Caching/Compression
gem "thruster", require: false

# Image Processing
# gem "image_processing", "~> 1.2"

# Development and Testing
group :development, :test do
  gem "debug", platforms: %i[mri windows], require: "debug/prelude"
  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "webmock"
end

# Additional Gems
gem "nokogiri", "~> 1.18"
gem "httparty", "~> 0.22.0"
gem "sidekiq", "~> 7.3"
gem "chartkick", "~> 5.1"
gem "groupdate", "~> 6.5"
gem "whenever", "~> 1.0"

# React Integration
gem "react-rails", "~> 3.2"

# Process Management
gem "foreman"

# CSS Framework
gem "tailwindcss-rails", "~> 3.0"

# Sprockets Support
gem "sprockets-rails"
