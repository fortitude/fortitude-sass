module Fortitude
  module Generators
    class SettingsGenerator < Rails::Generators::NamedBase

      source_root File.expand_path('../../../../app/assets/stylesheets', __FILE__)

      def self.banner #:nodoc:
        <<-BANNER.chomp
rails g fortitude:settings
    Copies _settings.scss and theme/_settings.scss to your Rails application
BANNER
      end

    end
  end
end