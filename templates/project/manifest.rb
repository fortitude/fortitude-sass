description 'Fortitude for Sass'

# Stylesheet importing bootstrap
stylesheet 'styles.scss'

# Fortitude variable overrides file
stylesheet '_fortitude-variables.scss', :to => '_fortitude-variables.scss'
stylesheet 'fortitude-theme.scss', :to => 'fortitude-theme.scss'

# Copy JS and icons
manifest = Pathname.new(File.dirname(__FILE__))
assets   = File.expand_path('../../app/assets', manifest)
{:javascript => 'javascripts',
 :image     => 'images'
}.each do |method, dir|
  root = Pathname.new(assets).join(dir)
  Dir.glob root.join('**', '*.*') do |path|
    path = Pathname.new(path)
    send method, path.relative_path_from(manifest).to_s, :to => path.relative_path_from(root).to_s
  end
end