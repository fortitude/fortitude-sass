(function($) {
  'use strict';

  $(document).on('open.ft.modal', '.modal', function(event) {
    var $this = $(this);

    $.screenLock(true);
    $('.shade').trigger('open.ft.shade');
    $('.container--fixed-top').css({
      paddingRight: $.measureScrollBar()
    });

    $this.ftTransitionWith({
      dataAttr: 'ftShowClass',
      addClass: 'modal--is-active',
      endEvent: 'opened.ft.modal'
    });
  });

  $(document).on('close.ft.modal', '.modal', function(event) {
    var $this = $(this);

    $.screenLock(false);
    $('.shade').trigger('close.ft.shade');
    $('.container--fixed-top').css({
      paddingRight: $.measureScrollBar()
    });

    $this.ftTransitionWith({
      dataAttr: 'ftHideClass',
      removeClass: 'modal--is-active',
      endEvent: 'closed.ft.modal'
    });
  });

  $(document).on('click', '[data-ft-modal]', function(){
    var $target = $.ftGetTarget($(this), 'ftModal');
    $target.trigger('open.ft.modal');
  });

  $(document).on('click', '[data-ft-modal-close]', function(){
    var $target = $.ftGetTarget($(this), 'ftModalClose');
    $target.trigger('close.ft.modal');
  });

  $(document).on('click', '.shade', function(){
    $('.modal--is-active').trigger('close.ft.modal');
  });

})(jQuery);
