require 'bundler/gem_tasks'

namespace :build do

  desc 'build fortitude jquery plugins'
  task :jquery do |_, args|
    # get content from all assets/javascripts/fortitude/*.js files
    js_build = ""
    Dir.glob('app/assets/javascripts/fortitude/jquery/**/*.js') do |filename|
      puts "reading: #{filename}"
      js_build << open(filename).read << "\n\n" unless filename == 'app/assets/javascripts/fortitude/jquery/index.js'
    end

    File.open('dist/fortitude.jquery.js', 'w') do |dist|
      dist.write js_build
    end
  end

  task js: [:jquery]

  task :css do
    sh 'compass compile'
  end


end

namespace :docs do
  task build: [:css] do
    sh 'hologram hologram_config.yml'
  end

  task :css do
    sh 'compass compile docs'
  end

end