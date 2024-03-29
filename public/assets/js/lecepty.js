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
let urlParams = new URLSearchParams(window.location.search);
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

	// Render main page
	if ($('template#recipe').length) {
		// Render recipes
		$('#recipes>.row').html('');

		db.open().then(() => {
			if (urlParams.has('catuid')) {
				return db.recipe.where('category_uid').equals(urlParams.get('catuid'));
			} else {
				return db.recipe;
			}
		}).then((recipes) => {
			recipes.each(recipe => $('#recipes>.row').append(renderTmpl(recipe.image ? $('template#recipe').html() : $('template#recipe_placeholder').html(), recipe)));
		});

		// Render categories
		$('#categories').html('');
		db.recipeCategory.each(category => $('#categories').append(renderTmpl($('template#category').html(), category)));
	}

	// Render category options
	if ($('template#category_option').length) {
		db.recipeCategory.each(category => $('select#category_select').append(renderTmpl($('template#category_option').html(), category)));
	}

	// Render recipe detail
	if ($('template#recipe_detail').length) {
		if (urlParams.has('uid')) {
			db.open().then(() => {
				return db.recipe.where('uid').equals(Number(urlParams.get('uid'))).toArray();
			}).then((recipe) => {
				$('main').html(recipe[0].image ? renderTmpl($('template#recipe_detail').html(), recipe[0]) : renderTmpl($('template#recipe_detail_placeholder').html(), recipe[0]));
			});
		} else {
			window.location.href='.';
		}
	}
}

function addEditCategory() {
	db.transaction("rw", db.recipeCategory, () => {
		db.recipeCategory.add({
			name: $('form [name="catname"]').val(),
			description: $('form [name="catdescription"]').val()
		});
	}).then(() => {
		window.location.href='.';
	}).catch((error) => {
		console.log(error);
	});
}

function addEditRecipe() {
	db.transaction("rw", db.recipe, () => {
		db.recipe.add({
			name: $('form [name="recname"]').val(),
			preparation_time: $('form [name="rectime"]').val(),
			difficulty: $('form [name="recdifficulty"]').val(),
			portions: $('form [name="recportion"]').val(),
			ingredients: $('form [name="recingredients"]').val(),
			process: $('form [name="recprocess"]').val(),
			image: $('#img-thumb img').prop('src'),
			category_uid: $('form [name="catuid"]').val()
		});
	}).then(() => {
		window.location.href='.';
	}).catch((error) => {
		console.log(error);
	});
}

function loadImage() {
	let fileR = new FileReader();
	fileR.onload = (e) => {
		let imgEl = document.createElement("img");
		imgEl.setAttribute("class", "img-fluid");
		imgEl.setAttribute("src", e.target.result);
		$('#img-thumb').html(imgEl);
	};
	fileR.readAsDataURL($('form [name="recimg"]').prop('files')[0]);
}
