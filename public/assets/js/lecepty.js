/**
 * Lecepty JS
 */


const scripts = [
	"assets/js/bootstrap.bundle.min.js",
	"assets/js/jquery-3.7.1.min.js",
	"assets/js/dexie.min.js",
	"assets/js/dexie-import-export.js"
];

// Exec loading some JS scripts when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
let scriptsToGo = scripts.length;

	for (let s of scripts) {
		let scriptEl = document.createElement("script");
		scriptEl.setAttribute("src", s);
		document.body.appendChild(scriptEl);

		scriptEl.onload = () => {
			if (! --scriptsToGo) main();
		};
	}
});

function main() {
	// Load main menu panel
	$.ajax({
		url: "assets/snippets/mainnavbar.html",
		error: (jqXHR, textStatus, errorThrown) => {
			alert("Chyba při nahrávání hlavního menu");
		}
	}).done((result) => {
		$("header").html(result);
	});
}