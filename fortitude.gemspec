# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "fortitude-rails/version"

Gem::Specification.new do |s|
  s.name        = "fortitude-rails"
  s.version     = Fortitude::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Aaron Reisman"]
  s.email       = ["aaron@hired.com"]
  s.license     = 'MIT'
  s.homepage    = "https://github.com/fortitude/fortitude"
  s.summary     = "Fortitude for Rails."
  s.description = <<-DESC
Fortitude provides a comprehensive framework of
Rock solid CSS Patterns and Components.
  DESC

  s.rubyforge_project = "fortitude"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_dependency('sass', '~> 3.3')
  s.add_dependency('autoprefixer-rails', '~> 1.1.20140319')
  s.add_dependency('thor')

  s.add_development_dependency('compass', '~> 1.0.0.alpha.19')
  s.add_development_dependency('aruba', '~> 0.4')
  s.add_development_dependency('rake')
end
