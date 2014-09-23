var $html = $('html');

if ($html.hasClass('page--generator')) {
	var $select = $('.select-input');
	var $extensionCSS = $('#extension-css');
	var $extensionHTML = $('#extension-html');
	var $extensionPreview = $('#extension-preview');

	$select.on('change', function(event) {
		$extensionCSS.html($('#css-template-' + $select.val()).html());
		$extensionHTML.html($('#html-template-' + $select.val()).html());
		$('#extension-css, #extension-html').trigger('change');
	}).trigger('change');

	$('#extension-css, #extension-html').on('change', function(event) {
		var html = "<style>";
		html += $('#extension-css').val();
		html += "</style>";
		html += $('#extension-html').val();
		$extensionPreview.html($(html));
	}).trigger('change');


}