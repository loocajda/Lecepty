/**
 * Lecepty JS
 */

$(() => {
	// TODO: Add error handling!
	$.ajax({
		url: "assets/snippets/mainnavbar.html",
	}).done((result) => {
		$("header").html(result);
	});
});