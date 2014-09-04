# -*- encoding: utf-8 -*-
$:.push File.expand_path('../lib', __FILE__)
require 'fortitude-sass/version'

Gem::Specification.new do |s|
  s.name        = 'fortitude-sass'
  s.version     = Fortitude::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ['Aaron Reisman']
  s.email       = ['aaron@hired.com']
  s.license     = 'MIT'
  s.homepage    = 'https://github.com/fortitude/fortitude'
  s.summary     = 'Fortitude Sass Framework'
  s.description = <<-DESC
Fortitude provides a comprehensive framework of
Rock solid CSS Patterns and Components.
  DESC

  s.rubyforge_project = 'fortitude-sass'

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ['lib']

  s.add_dependency('sass', '~> 3.3')
  s.add_dependency('autoprefixer-rails')
  s.add_dependency('thor')

  s.add_development_dependency('aruba', '~> 0.4')
  s.add_development_dependency('rake')
end
