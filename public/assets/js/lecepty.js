/**
 * Lecepty JS
 */


const scripts = [
	"assets/js/bootstrap.bundle.min.js",
	"assets/js/jquery-3.7.1.min.js",
	"assets/js/dexie.min.js",
	"assets/js/dexie-import-export.js"
];


var db;

// Simple templating engine
var renderTmpl = (template, data) => {
	return template.replace(/{{(.*?)}}/g, (match) => {
		return data[match.split(/{{|}}/).filter(Boolean)[0].trim()] ?? "";
	});
}

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
db = new Dexie('LeceptyDB');

	// Load main menu panel
	$.ajax({
		url: "assets/snippets/mainnavbar.html",
		error: (jqXHR, textStatus, errorThrown) => {
			alert("Chyba při nahrávání hlavního menu");
		}
	}).done((result) => {
		$("header").html(result);
	});

	db.version(1).stores({
		recipe: `
			++uid,
			name,
			preparation_time,
			difficulty,
			portions,
			ingredients,
			process,
			image,
			category_uid
		`,
		recipeCategory: `
			++uid,
			name,
			description
		`
	});

	// Render categories
	if ($('template#category')) {
		$('#categories').html('');
		db.recipeCategory.each(category => $('#categories').append(renderTmpl($('template#category').html(), category)));
	}

	// Render category options
	if ($('template#category_option')) {
		db.recipeCategory.each(category => $('select#category_select').append(renderTmpl($('template#category_option').html(), category)));
	}
}

function addEditCategory() {
	db.recipeCategory.add({
		name: $('form [name="catname"]').val(),
		description: $('form [name="catdescription"]').val()
	});
	db.recipeCategory.toArray();
	window.location.href='.';
}

function addEditRecipe() {
	db.recipe.add({
		name: $('form [name="recname"]').val(),
		preparation_time: $('form [name="rectime"]').val(),
		difficulty: $('form [name="recdifficulty"]').val(),
		portions: $('form [name="recportion"]').val(),
		ingredients: $('form [name="recingredients"]').val(),
		process: $('form [name="recprocess"]').val(),
		//image: ,
		category_uid: $('form [name="catuid"]').val()
	});
	window.location.href='.';
}
