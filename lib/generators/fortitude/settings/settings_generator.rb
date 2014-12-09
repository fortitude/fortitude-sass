class Fortitude::SettingsGenerator < Rails::Generators::Base
  source_root File.expand_path('../../../../../app/assets/stylesheets', __FILE__)

  def self.settings_description
    File.read(File.expand_path('../USAGE', __FILE__))
  end

  desc settings_description
  def settings
    template 'fortitude/settings/_defaults.scss', 'app/assets/stylesheets/fortitude/settings/_settings.scss'
    template 'fortitude/theme/settings/_defaults.scss', 'app/assets/stylesheets/fortitude/theme/settings/_settings.scss'
    template 'fortitude/theme/settings/_colors.scss', 'app/assets/stylesheets/fortitude/theme/settings/_colors.scss'
  end
end
