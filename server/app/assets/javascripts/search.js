(function($){
	$(function(){
		var typeahead = new TypeaheadCustom({
			extended_options: true,
			target: $(".autocomplete"),
			selector: ".autocomplete-selector-div",
			suggestion: ".autocomplete-suggestion",
			hasID: true,
			id: ".autocomplete-id"
		});

		$("#force_search").on("click", function() {
			typeahead.force_search();
		});
	});
})(jQuery);