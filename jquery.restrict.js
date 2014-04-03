/*
 * jQuery Input Restriction ("restrict") Plugin 1.1.0
 * https://github.com/mainart/jquery.restrict
 *
 * Supported Browsers:
 * IE 8+
 * FF 15+
 * Safari 4+
 * Chrome 19+
 * Opera 10.10+
 *
 * Compatible with jQuery 1.9.2
 *
 * Copyright 2013, Aleksandr Makov
 * https://mainart.org
 *
 * Licensed under the MIT license:
 * Copyright (c) 2013 Aleksandr Makov http://mainart.org
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function($){

	$.fn.restrict = function(restrict) {
		$(this).filter('input[type=text], input[type=number], input[type=password], textarea').each(function(i, input) {
			(function(restrict){
				var $input = $(input), chars = '', codes = {}, data, pattern, preventPressHandling = false;

				if($.type(restrict) == "string") {
					chars += restrict;
				}

				if ($.type(restrict = $input.attr('data-restrict')) == 'string') {
					chars += restrict;
				}

				restrict = '';

				// Filter duplicate chars
				chars = (function(chars){
					var seen = {}, out = [];
					$.each(chars.split(""), function(i, c) {
						if (c in seen) return;
						seen[c] = true;
						out.push(c);
						restrict += c;
					});
					return out;
				})(chars);

				if (!chars.length) {
					throw $(input).prop('id') + " has no restriction instructions (characters).";
				}

				while(chars.length) {
					codes[chars.shift().charCodeAt(0)] = true;
				}

				$.extend(codes, {
					8: true, // Backspace
					13: true // Enter
				});

				// Quote metachars
				pattern = restrict.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
				pattern = {
					replace: new RegExp("[^" + pattern +  "]", 'ig'),
					match: new RegExp("^[" + pattern +  "]*$", 'i')
				};

				$input
					.on('keypress', press)
					.on('keydown', down)
					.on('paste', null, pattern, paste);

				function press(e) {
					if (preventPressHandling) return !(preventPressHandling = false);
					if (!(e.keyCode in codes)) {
						e.preventDefault();
						e.stopImmediatePropagation();
						return false;
					}
				};

				function down(e) {
					if (e.metaKey) {
						switch (e.which) {
							case 65: // Select All
							case 67: // Copy
							case 86: // Paste
							case 88: // Cut
								preventPressHandling = true;
								break;
						}
					} else {
						switch (e.which) {
							case 27: // ESC
								$input.blur();
								preventPressHandling = true;
								break;
						}
					}
				};

			})(restrict);
		});
	};

	function paste(e) {
		var $e = $(this), maxLength = $e.attr('maxlength'), old = $e.val(), pasted, interval = setInterval(function() {
			if (old != (pasted = $e.val())) {
				clearInterval(interval);
				$e.attr('maxlength', maxLength).val(pasted.replace(e.data.replace, ''));
			}
		},0);
		$e.attr('maxlength', false);
	};


})(jQuery);