require 'fortitude-sass/version'
require 'fileutils'
require 'thor'

module Fortitude
  class Generator < Thor
    map ['-v', '--version'] => :version

    desc 'install', 'Install Fortitude into your project'
    method_options :path => :string, :force => :boolean
    def install
      if fortitude_files_already_exist? && !options[:force]
        puts 'Fortitude files already installed, doing nothing.'
      else
        install_files
        puts "Fortitude files installed to #{install_path}/"
      end
    end

    desc 'update', 'Update Fortitude'
    method_options :path => :string
    def update
      if fortitude_files_already_exist?
        remove_fortitude_directory
        install_files
        puts 'Fortitude files updated.'
      else
        puts 'No existing fortitude installation. Doing nothing.'
      end
    end

    desc 'version', 'Show Fortitude version'
    def version
      say "Fortitude #{Fortitude::VERSION}"
    end

    private

    def fortitude_files_already_exist?
      install_path.exist?
    end

    def install_path
      @install_path ||= if options[:path]
                          Pathname.new(File.join(options[:path], 'fortitude'))
                        else
                          Pathname.new('fortitude')
                        end
    end

    def install_files
      make_install_directory
      copy_in_scss_files
    end

    def remove_fortitude_directory
      FileUtils.rm_rf('fortitude')
    end

    def make_install_directory
      FileUtils.mkdir_p(install_path)
    end

    def copy_in_scss_files
      FileUtils.cp_r(all_stylesheets, install_path)
    end

    def all_stylesheets
      Dir["#{stylesheets_directory}/*"]
    end

    def stylesheets_directory
      File.join(top_level_directory, 'app', 'assets', 'stylesheets')
    end

    def top_level_directory
      File.dirname(File.dirname(File.dirname(__FILE__)))
    end
  end
end
