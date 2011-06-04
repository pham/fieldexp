(function($) {
$.fn.fieldexp = function($o) {
	var _o = $.extend({
		type: 'custom',
		regexp: /^.+$/,
		allowBlank: true
	}, $o);

	var _check = function($ob, $val, $re) {
		if ($val.match($re) || (!$val && _o.allowBlank)) {
			if ($.isFunction(_o.onGood)) {
				_o.onGood($ob, $val);
			}
		} else {
			if ($.isFunction(_o.onBad)) {
				_o.onBad($ob, $val);
			}
		}
	};

	return this.filter('input,textarea').each(function() {
		var _ob = $(this),
			_re = _o.regexp;

		switch (_o.type) {
			case 'email': _re =
				/^[A-Z0-9._%\-]+@[A-Z0-9.\-]+\.[A-Z]{2,6}$/i;
				break;
			case 'url': _re =
				/https?:\/\/([\-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?/i;
				break;
			case 'pw': _re =
				/(?=.{5,})(?=(.*[^a-z]){1,})/i;
				break;
		}

		if (_o.bindTo) {
			$(this).bind(_o.bindTo, function($e) {
				_check($e.target, _ob.val(), _re);
			});
		} else {
			_check(_ob, _ob.val(), _re);
		}
		return true;
	});
};
}(jQuery));
