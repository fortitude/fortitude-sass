fortitude-sass
==============

Rock Solid CSS Framework 

[![Build Status](https://travis-ci.org/fortitude/fortitude-sass.svg?branch=master)](https://travis-ci.org/fortitude/fortitude-sass)

## Installation

There are several easy ways to use Fortitude in your project.

* [Ruby on Rails](#ruby_on_rails)
* [Compass (not on Rails)](#compass_not_rails)
* [Bower](#bower)

### Ruby on Rails <a id="ruby_on_rails"></a>

Before you get started, consider using the [Fortitude Rails gem](https://github.com/hired/fortitude_rails), which makes it easy to specify theme colors, generate new components, and even get documentation specific to your app at `/fortitude`. If you would just like the sass and jquery without the extra whizz-bang, follow these steps:

1. Add Fortitude and Sass-Rails to your Gemfile.
   ```ruby
   gem 'fortitude-sass'
   gem 'sass-rails'
   ```

   Fortitude also depends on [Autoprefixer](https://github.com/ai/autoprefixer-rails), so make sure your app will function with that.

   Run `bundle install` and restart your Rails app to make sure Fortitude is available in the asset pipeline.

2. Import Fortitude in your `application.scss` :
   ```scss
   @import 'fortitude';
   ```

3. Require Fortitude's jquery helpers in `application.js`
   ```javascript
   //= require jquery
   //= require fortitude/fortitude.jquery
   //= require_directory fortitude/fortitude
   ```

### Compass (without Rails) <a id="compass"></a>

1. Install the gem: `gem install fortitude-sass`

2. If you have an existing Compass project, add Fortitude and run the installation:
   ```ruby
   # in config.rb
   require 'fortitude-sass'
   ```

   And then `compass install fortitude`

### Bower <a id="bower"></a>

1. `bower install fortitude-sass`

## Example

if you want you can check out our style guide to see how we're using certain fortitude components.

https://hired.com/library

## Development

If you want to add more features or change how certain features work in Fortitude, we encourage you to [open a Github issue](https://github.com/fortitude/fortitude-sass/issues) before developing it. It might not be aligned with the goals of this framework, introduce compatibility worries, or benefit from some direction from the maintainers. We don't want you to waste your time, and a little discussion can save a lot of work.

1. Fork the repo [on Github](https://github.com/fortitude/fortitude-sass) and clone your copy of it locally.

2. Add some things to the framework. If you add any SASS functions, mixins, etc please add specs for them via [Bootcamp](https://github.com/thejameskyle/bootcamp/wiki/Introduction). We're working on getting everything that's there specced out.

3. Run specs, build, and linting via `grunt test`

4. Update the distributable css and js via `grunt build` .

5. Push your changes to your Github fork and issue a pull request.

6. We will get back to you ASAP regarding your changes.


## Open Source by Hired

[Hired](https://hired.com/?utm_source=opensource&utm_medium=fortitude&utm_campaign=readme) is a marketplace for top engineering talent to find full-time technology jobs. Talented Ruby developers (like yourself) are in extremely high demand! On Hired, apply once and receive 5 to 15 competing job offers in one week from 800+ technology companies. Average Ruby engineer salaries on Hired are around $120,000 per year!

<a href="https://hired.com/?utm_source=opensource&utm_medium=fortitude&utm_campaign=readme-banner" target="_blank">
<img src="https://dmrxx81gnj0ct.cloudfront.net/public/hired-banner-light-1-728x90.png" alt="Hired" width="728" height="90" align="center"/>
</a>

We are Ruby developers ourselves, and we use all of our open source projects in production. We always encourge forks, pull requests, and issues. Get in touch with the Hired Engineering team at _opensource@hired.com_.
