(function($) {
  'use strict';
  $(document).
    on('open:ft:shade', '.shade', function() {
      var $this = $(this);
      if (!$this.hasClass('shade--is-active')) {
        $this
          .addClass('shade--is-active')
          .addClass($this.data().showClass)
          .show()
          .waitForAnimation()
          .then(function() {
            $this.removeClass($this.data().showClass);
          });
      }
    }).
    on('close:ft:shade', '.shade', function() {
      var $this = $(this);
      if ($this.hasClass('shade--is-active')) {
        $this
          .addClass($this.data().hideClass)
          .waitForAnimation()
          .then(function() {
            $this
              .hide()
              .removeClass('shade--is-active')
              .removeClass($this.data().hideClass);
          });
      }
    }).
    on('click.ft.shade.data-api', '.shade', function(event) {
      $(this).trigger('close:ft:shade');
      event.preventDefault();
    });

})(jQuery);
