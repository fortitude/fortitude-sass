(function($) {
    'use strict';
    var $html = $('html');

    function transitionEndOpen() {
      var $html = $('html');
      $html.removeClass('html--shade--is-transitioning');
    }

    function transitionEndClose() {
      var $html = $('html');
      $html.removeClass('html--shade--is-transitioning');
      $(document).trigger('close:ft:shade');
    }

    $(document).
      on('open:ft:shade', '.shade', function(event) {
        var $this = $(this);

        // set the transitioning class
        $html.addClass('html--shade--is-transitioning');

        // set additional class in seperate event queue.
        setTimeout(function() {
          $html.addClass('html--shade--is-active');
        }, 0);

        // watch the transitionEnd event to remove the transitioning class.
        $this.transitionEnd(transitionEndOpen);
      }).
      on('close:ft:shade', '.shade', function(event) {
        var $this = $(this);
        $html.
          addClass('html--shade--is-transitioning').
          removeClass('html--shade--is-active')

        $this.transitionEnd(transitionEndOpen);

      }).
      on('click.ft.shade.data-api', '.shade', function(event) {
        $(this).trigger('close:ft:shade');
        event.preventDefault();
    });

})(jQuery);