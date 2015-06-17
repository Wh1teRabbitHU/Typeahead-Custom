(function($){
	$(function(){
		TypeaheadCustom.CreateTypeahead("typeahead", {
			extended_options: true,
			target: $(".autocomplete"),
			selector: ".autocomplete-selector-div",
			suggestion: ".autocomplete-suggestion",
			hasID: true,
			id: ".autocomplete-id"
		});

		$("#force_search").on("click", function() {
			TypeaheadCustom.GetTypeahead("typeahead").force_search();
		});
	});
})(jQuery);