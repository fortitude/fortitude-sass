(function($) {
  'use strict';

  $(document).on('open.ft.modal', '.modal', function(event) {
    var $this = $(this);
    
    $.screenLock(true);
    $('.shade').trigger('open.ft.shade');
    $('.container--fixed-top').css({
      paddingRight: $.measureScrollBar()
    });
    $this.addClass('modal--is-active');
  });

  $(document).on('close.ft.modal', '.modal', function(event) {
    var $this = $(this);
    
    $.screenLock(false);
    $('.shade').trigger('close.ft.shade');
    $('.container--fixed-top').css({
      paddingRight: $.measureScrollBar()
    });
    $this.removeClass('modal--is-active');
  });

  $(document).on('click', '[data-ft-modal]', function(){
    var targetId = $(this).data('ftModal'),
        $target;
    
    if(!targetId.match(/^#/)) { targetId = '#' + targetId; }
    $target = $(targetId);
    $target.trigger('open.ft.modal');
  });

  $(document).on('click', '[data-ft-modal-close]', function(){
    var targetId = $(this).data('ftModalClose'),
        $target;
    
    if(!targetId.match(/^#/)) { targetId = '#' + targetId; }
    $target = $(targetId);
    $target.trigger('close.ft.modal');
  });

  $(document).on('click', '.shade', function(){
    $('.modal--is-active').trigger('close.ft.modal');
  });

})(jQuery);
