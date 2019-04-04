/*  jQuery Nice Select - v1.1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by Hernán Sartorio  */

(function ($, window, document, undefined) {
	"use strict";

	$.fn.insertAtIndex = function (index, selector) {
		var opts = $.extend({
			index: 0,
			selector: '<div/>'
		}, { index: index, selector: selector });
		return this.each(function () {
			var p = $(this);
			var i = $.isNumeric(opts.index) ? parseInt(opts.index) : 0;
			if (i <= 0)
				p.prepend(opts.selector);
			else if (i > p.children().length - 1)
				p.append(opts.selector);
			else
				p.children().eq(i).before(opts.selector);
		});
	};

	var defaultSettings = {
		showClearButton: false,
		control: null,
		callbackChange: null,
		callbackClear: null
	};

	$.fn.niceSelect = function (method, values, options) {
		this.settings = $.extend({}, defaultSettings, options);
		var self = this;

		// Methods
		if (typeof method === 'string') {
			if (method === 'update') {
				this.each(function () {
					var $select = $(this);
					var $dropdown = $select.parent('.nice-select');

					updateOptions($dropdown, $select);
					$dropdown.removeClass('open');

					var values = $select.val() === null ? "" : Array.isArray($select.val()) ? $select.val() : $select.val().split(',');
					$dropdown.find('li').removeClass('selected');
					if (values.length === 1) {
						$dropdown.find('li[data-value="' + values + '"]').addClass('selected');
					}
					else {
						for (var i = 0; i < values.length; i++) {
							$dropdown.find('li[data-value="' + values[i] + '"]').addClass('selected');
						}
					}

					refresh($select);
				});
			} else if (method === 'destroy') {
				this.each(function () {
					var $select = $(this);
					var $dropdown = $select.parent('.nice-select');
					$select.appendTo($dropdown.parent());
					if (!$('html').hasClass('ua-mobile')) {
						//this.hide();
						$select.css('position', 'inherit');
						$select.css('left', 'inherit');
					}

					if ($dropdown.length) {
						$dropdown.remove();
						$select.css('display', '');
					}
				});
				if ($('.nice-select').length === 0) {
					$(document).off('.nice_select');
				}
			} else if (method === 'setValue' && values !== undefined) {
				this.each(function () {
					var $select = $(this);
					$select.find('option[selected]').removeAttr('selected');
					var $dropdown = $select.parent('.nice-select');
					$dropdown.find('li').each(function () {
						$(this).removeClass('selected');
					});

					$(values.split(',')).each(function () {
						var currentValue = this;
						if (currentValue !== '') {
							$select.find('option[value=' + currentValue + ']').attr('selected', 'true');

							$dropdown.find('li').each(function () {
								var dropdownValue = $(this).data('value');
								if (currentValue === dropdownValue) {
									$(this).addClass('selected');
								}
							});
						}
					});

					var text = $.map($select.find('option[selected]'), function (n, i) {
						return $(n).data('display') || $(n).text();
					}).join(", ");

					var placeholderValue = $select.attr('placeholder') || $select.data('display') || '';
					$dropdown.find('.current').text(text === '' ? placeholderValue : text);
				});
			} else {
				console.log('Method "' + method + '" does not exist.');
			}

			return this;
		}

		// Hide native select
		if (!$('html').hasClass('ua-mobile')) {
			//this.hide();
			$(this).css('position', 'absolute');
			$(this).css('left', '-3000px');
		}
		else {
			this.on('change', function () {
				$(this).niceSelect('update');
				if (self.settings.callbackChange) {
					self.settings.callbackChange($(self));
				}
			});
		}

		// Create custom markup
		this.each(function () {
			var $select = $(this);
			if (!$select.parent().hasClass('nice-select')) {
				create_nice_select($select);
			}
			else {
				refresh($select);
			}
		});

		function create_nice_select($select) {
			$select.data('settings', self.settings);

			var multiple = $select.attr('multiple') !== undefined;

			$select.after($('<div></div>')
				.addClass('nice-select')
				.addClass(multiple ? 'multiple' : 'single')
				.addClass($select.attr('class') || '')
				.addClass($select.attr('disabled') ? 'disabled' : '')
				.attr('tabindex', $select.attr('disabled') ? null : '0')
				.html('<span class="current"></span><div class="list-container"><div class="list-search"></div><ul class="list"></ul></div>')
			);
			var $dropdown = $select.next();
			$select.appendTo($dropdown);


			var $search = $('<input type="text" placeholder="Zoeken" />');
			var $searchClose = $('<a class="close">&times;</a>');
			var $noresults = $('<span class="noResults">Geen resultaten gevonden.</span>');

			//add search box if [data-live-search] is added to <select>
			if ($select.find("option").length > 20) {
				$dropdown.find('.list-search').prepend($searchClose);
				$dropdown.find('.list-search').prepend($search);
				$dropdown.find('.list-container').append($noresults.hide());
			}


			updateOptions($dropdown, $select);

			if (!$('html').hasClass('ua-mobile')) {
				$select.bind('focus', function () {
					$dropdown.focus();
				});
			}

			if (self.settings.showClearButton) {
				$dropdown.find('.current').after($('<span class="clearButton">&times;</span>'));
			}

			if (self.settings.control !== null) {
				self.settings.control.Validation.AddHandler(checkIsValid);
			}

			$search.on('keyup', function () {
				$noresults.hide();
				var term = $(this).val().toLowerCase();
				$('li', $dropdown).each(function (index, item) {
					if ($(item).text().toLowerCase().indexOf(term) > -1) {
						$(item).show();
					}
					else {
						$(item).hide();
					}
				});
				if ($('li:visible', $dropdown).length === 0) {
					$noresults.show();
				}
			}).on('touchstart click', function (e) { e.stopPropagation(); });
			$searchClose.on('touchstart click', function (e) { $search.val(""); $('li', $dropdown).show(); e.stopPropagation(); });

			refresh($select);
		}

		function checkIsValid(s) {
			var isValid = s.isValid;
			$(s.mainElement).parent().toggleClass('has-error', !isValid);
		}

		function updateOptions($dropdown, $select) {
			var selectedindex = parseInt($select.attr('selectedindex'));
			var $options = $select.find('option');

			$dropdown.find('li').remove();

			$options.each(function (i) {
				var $option = $(this);

				var isDisabled = $option.is(':disabled');
				if (!isDisabled) {
					var display = $option.data('display');

					$dropdown.find('ul').append($('<li></li>')
						.attr('data-value', $option.val())
						.attr('data-display', display || null)
						.addClass('option' +
							(isNaN(selectedindex) ? $option.is(':selected') ? ' selected' : '' : selectedindex > -1 ? selectedindex === i ? ' selected' : '' : '') +
							($option.is(':disabled') ? ' disabled' : ''))
						.html($option.text())
					);
				}
			});
		}

		function refresh($select) {
			var placeholderValue = $select.attr('placeholder') || $select.data('display') || '';
			var multiple = $select.attr('multiple') !== undefined;
			var $dropdown = $select.parent();

			var text = $.map($dropdown.find('.selected'), function (n, i) {
				return $(n).data('display') || $(n).text();
			}).join(", ");

			if (multiple && text.length === 0 && $select.data('display') !== undefined) {
				text = $select.data('display');
			}

			var selectedCount = $dropdown.find('.selected').length;
			if (selectedCount > 1) {
				var multipleSelectedTextFormat = $select.data('count-selected-text');
				if (multipleSelectedTextFormat !== undefined && multipleSelectedTextFormat !== '') {
					text = multipleSelectedTextFormat.replace('{0}', selectedCount);
				}
			}

			if (text !== undefined && text !== '') {
				$dropdown.find('.current').html(text);
				$dropdown.find('.current').show();
				$dropdown.find('.nulltext').hide();
				$dropdown.find('.clearButton').show();
			}
			else if (placeholderValue !== '') {
				if ($dropdown.find('.nulltext').length === 0) {
					$dropdown.find('.current').after($('<span class="nulltext"></span>'));
				}
				$dropdown.find('.nulltext').text(placeholderValue);
				$dropdown.find('.current').hide();
				$dropdown.find('.nulltext').show();
				$dropdown.find('.clearButton').hide();
			}
		}
		/* Event listeners */

		// Unbind existing events in case that the plugin has been initialized before
		$(document).off('.nice_select');

		// Open/close
		$(document).on('click.nice_select', '.nice-select', function (event) {
			if ($(event.target).hasClass('clearButton')) {
				return;
			}

			if (!$('html').hasClass('ua-mobile')) {
				var $dropdown = $(this);

				$('.nice-select').not($dropdown).removeClass('open');
				$dropdown.toggleClass('open');

				if ($dropdown.hasClass('open')) {
					$dropdown.find('.option');
					$dropdown.find('.focus').removeClass('focus');
					$dropdown.find('.selected').addClass('focus');
				} else {
					$dropdown.focus();
				}
			}
		});

		$(document).on('click.nice_select', '.nice-select .clearButton', function (event) {
			var $dropdown = $(event.target).closest('.nice-select');
			var $select = $dropdown.find('select');
			var settings = $select.data('settings');

			$dropdown.find('.option').removeClass('selected');
			$select.val('');
			refresh($select);

			if (settings.callbackClear) {
				settings.callbackClear($select);
			}
		});

		// Close when clicking outside
		$(document).on('click.nice_select', function (event) {
			if ($(event.target).closest('.nice-select').length === 0) {
				$('.nice-select').removeClass('open').find('.option');
			}
		});

		// Option click
		$(document).on('click.nice_select', '.nice-select .option:not(.disabled)', function (event) {
			var $option = $(this);
			var $dropdown = $option.closest('.nice-select');
			var $select = $dropdown.find('select');
			var multiple = $select.attr('multiple') !== undefined;
			var max = parseInt($select.data('max') || 0);
			var selectedCount = $dropdown.find('.selected').length;
			var settings = $select.data('settings');

			if (multiple && max === 1) {
				multiple = false;
			}

			if (multiple && (max > 0 && max === selectedCount) && !$option.hasClass('selected')) {
				event.stopPropagation();
				return;
			}

			if (multiple) {
				event.stopPropagation();
				if ($option.hasClass('selected')) {
					$option.removeClass('selected');
				}
				else {
					$option.addClass('selected');
				}
			}
			else {
				$dropdown.find('.selected').removeClass('selected');
				$option.addClass('selected');
			}

			refresh($select);

			if (multiple) {
				var values = $.map($dropdown.find('.selected'), function (n, i) {
					return $(n).data('value');
				});
				$select.val(values).trigger('change');
			}
			else {
				$select.val($option.data('value')).trigger('change');
			}

			if (settings.callbackChange) {
				settings.callbackChange($select);
			}
		});

		// Keyboard events
		$(document).on('keydown.nice_select', '.nice-select', function (event) {
			var $dropdown = $(this);
			var $focused_option = $($dropdown.find('.focus') || $dropdown.find('.list .option.selected'));

			// Space or Enter
			if (event.keyCode === 32 || event.keyCode === 13) {
				if ($dropdown.hasClass('open')) {
					$focused_option.trigger('click');
				} else {
					$dropdown.trigger('click');
				}
				return false;
				// Down
			} else if (event.keyCode === 40) {
				if (!$dropdown.hasClass('open')) {
					$dropdown.trigger('click');
				} else {
					var $next = $focused_option.nextAll('.option:not(.disabled)').first();
					if ($next.length > 0) {
						$dropdown.find('.focus').removeClass('focus');
						$next.addClass('focus');
					}
				}
				return false;
				// Up
			} else if (event.keyCode === 38) {
				if (!$dropdown.hasClass('open')) {
					$dropdown.trigger('click');
				} else {
					var $prev = $focused_option.prevAll('.option:not(.disabled)').first();
					if ($prev.length > 0) {
						$dropdown.find('.focus').removeClass('focus');
						$prev.addClass('focus');
					}
				}
				return false;
				// Esc
			} else if (event.keyCode === 27) {
				if ($dropdown.hasClass('open')) {
					$dropdown.trigger('click');
				}
				// Tab
			} else if (event.keyCode === 9) {
				if ($dropdown.hasClass('open')) {
					return false;
				}
			}
		});

		// Detect CSS pointer-events support, for IE <= 10. From Modernizr.
		var style = document.createElement('a').style;
		style.cssText = 'pointer-events:auto';
		if (style.pointerEvents !== 'auto') {
			$('html').addClass('no-csspointerevents');
		}

		return this;
	};

	window.initNiceSelect = function () {
		$('select').not('.noNiceSelect').niceSelect(null, null, { showClearButton: false });
	};

})(jQuery, window, document);
