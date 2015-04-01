(function($) {
  'use strict';

  $(document).on('open.ft.modal', '[ft-modal], [data-ft-modal]', function(event) {
    var $this = $(this);

    $.screenLock(true);
    $('[ft-shade], [data-ft-shade]').trigger('open.ft.shade');
    $('.container--fixed-top').css({
      paddingRight: $.measureScrollBar()
    });

    $this.ftTransitionWith({
      attr: 'ft-show',
      addClass: 'modal--is-active',
      endEvent: 'opened.ft.modal'
    });
  });

  $(document).on('close.ft.modal', '[ft-modal], [data-ft-modal]', function(event) {
    var $this = $(this);

    $.screenLock(false);
    $('[ft-shade], [data-ft-shade]').trigger('close.ft.shade');
    $('.container--fixed-top').css({
      paddingRight: $.measureScrollBar()
    });

    $this.ftTransitionWith({
      attr: 'ft-hide',
      removeClass: 'modal--is-active',
      endEvent: 'closed.ft.modal'
    });
  });

  $(document).on('click', '[ft-modal-open], [data-ft-modal-open]', function(){
    var $target = $.ftGetTarget($(this), 'ft-modal-open');
    $target.trigger('open.ft.modal');
  });

  $(document).on('click', '[ft-modal-close], [data-ft-modal-close]', function(){
    var $target = $.ftGetTarget($(this), 'ft-modal-close');
    $target.trigger('close.ft.modal');
  });

  $(document).on('click', '[ft-shade], [data-ft-shade]', function(){
    $('.modal--is-active').trigger('close.ft.modal');
  });

})(jQuery);
