
/**
 * See more: https://github.com/Wh1teRabbitHU/Typeahead-Custom
 */

function TypeaheadCustom(OPTIONS) {

	// Declare options
	var extended_options = OPTIONS.extended_options === true;
	var field = OPTIONS.field || "";
	var target = !extended_options ? $("#autocomplete-" + field) : OPTIONS.target || $(".autocomplete");
	var selector = !extended_options ? "#autocomplete-selector-div-" + field : OPTIONS.selector || ".autocomplete-selector-div";
	var suggestion = !extended_options ? "#autocomplete-suggestion-" + field : OPTIONS.suggestion || ".autocomplete-suggestion";
	var id = !extended_options ? "#autocomplete-id-" + OPTIONS.id : OPTIONS.hasID ? OPTIONS.id || ".autocomplete-id" : null;
	var execute_function = OPTIONS.execute_function || $.noop;

	var filter = OPTIONS.filter || null;
	var hasID = OPTIONS.hasID || false;
	var suggestion_size = OPTIONS.suggestion_size || 4;
	var suggestion_pcs = OPTIONS.suggestion_pcs || 10;
	var never_delete_text = OPTIONS.never_delete_text !== false;
	var never_delete_id = OPTIONS.never_delete_id !== false;
	var required_input_length = OPTIONS.required_input_length || 1;
	var show_empty_list = OPTIONS.show_empty_list || true;

	var adapterMap = {};
	var selectedMap = [];

	var suggestionText = "";
	var suggestionId = 0;
	var highlighted = null;
	var scrollPosition = 0;

	// Declare methods
	this.force_search = function() {
		target.focus();
		search(target);
	};

	$(selector).children("select").attr("size", suggestion_size);

	target.each(function () {
		adapterMap[$(this).attr("id")] = new AutoCompleteAdapter($(this));
		selectedMap[$(this).attr("id")] = $(this).val() !== 0 || getCurrentId($(this)).val() !== 0;
	});

	target.on("keydown", function (event) {
		if (event.keyCode == 13) {
			event.preventDefault();
		}
	});

	target.on("keyup", function (event) {
		update(event, $(this));
	});

	target.on("blur", function () {
		var _target = $(this);
		setTimeout(function () {
			if ($(':focus').is(getCurrentSelector(_target).children("select")) && getCurrentSelector(_target).children("select").is(":visible")) {
				highlighted = getCurrentSelector(_target).children("select").find(":selected");
				select(_target);
			} else {
				close(_target);
			}
		}, 100);
	});

	var update = function (event, _target) {
		var optionElements = getCurrentSelector(_target).children("select").children();

		switch (event.keyCode || event.which) {
			case 38 : //up
				if (highlighted === null) {
					highlighted = optionElements.first();
					highlighted.prop("selected", true);
				} else if (!optionElements.first().is(highlighted)) {
					highlighted.prop("selected", false);
					highlighted = highlighted.prev();
					highlighted.prop("selected", true);
				}
				if (highlighted.index() < scrollPosition) {
					scrollPosition--;
				}
				getCurrentSelector(_target).children("select").scrollTop(17 * scrollPosition);
				break;
			case 40 : //down
				if (highlighted === null) {
					highlighted = optionElements.first();
					highlighted.prop("selected", true);
				} else if (!optionElements.last().is(highlighted)) {
					highlighted.prop("selected", false);
					highlighted = highlighted.next();
					highlighted.prop("selected", true);
				}
				if (highlighted.index() + 1 > scrollPosition + suggestion_size) {
					scrollPosition++;
				}
				getCurrentSelector(_target).children("select").scrollTop(17 * scrollPosition);
				break;
			case 37 : //left
				close(_target);
				break;
			case 39 : //right
				select(_target);
				break;
			case 13 : //enter
				event.preventDefault();
				select(_target);
				break;
			default :
				if (_target.val().length >= required_input_length) {
					search(_target);
				} else {
					suggestionText = "";
					getCurrentSuggestion(_target).val(suggestionText);
					selectedMap[_target.attr('id')] = false;
					highlighted = null;
					getCurrentSelector(_target).hide();
				}
				break;
		}
	};

	var search = function(_target) {
		suggestionText = "";
		var counter = 0;
		var options = "";

		getCurrentAdapter(_target).generateData(filter ? $(filter) : null);

		$.each(getCurrentAdapter(_target).getResultMap(), function (key, value) {
			if (counter < suggestion_pcs) {
				options += "<option value='" + value["id"] + "'>" + value["value"] + "</option>";
				if (value["value"].indexOf(target.val()) === 0) {
					suggestionText = value["value"];
					suggestionId = value["id"];
				}
				counter++;
			}
		});
		getCurrentSelector(_target).children("select").html(options);

		if (_target.val() === "") {
			getCurrentSelector(_target).hide();
			suggestionText = "";
		} else {
			getCurrentSelector(_target).show();
		}

		getCurrentSuggestion(_target).val(suggestionText);
		selectedMap[_target.attr('id')] = false;
		highlighted = null;

		if (!show_empty_list && getCurrentAdapter(_target).getResultMap().length === 0) {
			closeSelector(_target);
		}
	};

	var select = function (_target) {
		selectedMap[_target.attr('id')] = true;
		if (highlighted === null) {
			_target.val(suggestionText);
		} else {
			_target.val(highlighted.html());
			suggestionId = highlighted.val();
		}
		if (hasID && getCurrentId(_target) !== null) {
			getCurrentId(_target).val(suggestionId);
		}
		close(_target);
	};

	var close = function (_target) {
		if (!selectedMap[_target.attr('id')]) {
			if (!never_delete_text) {
				_target.val("");
			}
			if (hasID && !never_delete_id) {
				getCurrentId(_target).val("");
			}
		}
		closeSelector(_target);

		execute_function();
	};

	var closeSelector = function (_target) {
		highlighted = null;
		scrollPosition = 0;
		getCurrentSuggestion(_target).val("");
		getCurrentSelector(_target).hide();
		getCurrentSelector(_target).children("select").html("");
	};

	var getCurrentSelector = function (_target) {
		return _target.siblings(selector);
	};

	var getCurrentSuggestion = function (_target) {
		return _target.siblings(suggestion);
	};

	var getCurrentId = function (_target) {
		return _target.siblings(id);
	};

	var getCurrentAdapter = function (_target) {
		return adapterMap[_target.attr("id")];
	};
}

function AutoCompleteAdapter(_target) {
	var url = _target.attr("data-target");
	var resultMap = [];

	this.getResultMap = function () {
		return resultMap;
	};

	this.generateData = function (filter) {
		var searchConditionPost = _target.val();
		var searchConditionGet = "/";

		resultMap = [];


		if (filter !== null) {
			if (filter.length === 0) {
				searchConditionGet += "0";
			}
			filter.each(function () {
				if ($(this).val() !== "") {
					searchConditionGet += (searchConditionGet == "/" ? "" : ",") + $(this).val();
				}
			});
		}

		if (searchConditionPost !== "") {
			$.ajax({
				url: url + searchConditionGet,
				data: JSON.stringify(_target.val()),
				type: "POST",
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				async: false,
				success: function (response) {
					$.each(response, function (key, value) {
						resultMap.push(value);
					});
				}
			});
		}
	};
}