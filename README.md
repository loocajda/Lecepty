# Aplikace Lecepty

## 1. Funkční specifikace


### 1.1. datový konceptuální model (např. ER diagram či textový popis)

| Recipe | RecipeCategory |
| ----------------- | -------------- |
| uid | uid |
| name | name |
| preparation_time | description |
| difficulty |
| portions |
| ingredients |
| process |
| category_uid |
| image |


### 1.2. charakteristika funkčností aplikace

Aplikace Lecepty je webová aplikace pro správu receptů. Umožňuje uživatelům vytvářet kategorie receptů, do kterých mohou vkládat recepty.


### 1.3. specifikace uživatelských rolí a oprávnění

Neregistrovaný uživatel
- může vkládat recepty
- může vkládat kategorie receptů
- může si prohlížet recepty


### 1.4. uživatelské grafické rozhraní a jeho funkčnosti

> Úvodní stránka
Úvodní stránka aplikace bude zobrazovat seznam nejnovějších receptů. Uživatelé mohou také vyhledávat recepty podle kategorie.

> Stránka receptu
Stránka receptu zobrazuje informace o konkrétním receptu, včetně názvu, obrázku, ingrediencí, postupu, času přípravy, počtu porcí a obtížnosti.

> Stránka pro vkládání receptu
Stránka s formulářem, který bude umožňovat uživatelům vytvářet nové recepty se všemi náležitostmi.

> Stránka vkládání kategorií
Uživatelé mohou prostřednictvím formuláře na stránce vytvářet nové kategorie.


## 2. Technická specifikace


### 2.1. datový logický model

RecipeCategory
    uid: typ Number, autoincrement
    name: typ String
    description: typ String

Recipe
    uid: typ Number, autoincrement
    name: typ String
    preparation_time: typ Number
    difficulty: typ Number
    portions: typ Number
    ingredients: typ String
    process: typ String
    image: typ String (base64 data URL)
    category_uid: typ Number


### 2.2.

Frontend
- HTML5, CSS, JavaScript, [Bootstrap 5](https://getbootstrap.com), [Dexie.js](https://dexie.org), [dexie-export-import modul](https://dexie.org/docs/ExportImport/dexie-export-import), [jQuery](https://jquery.com)

Databáze
- IndexedDB úložiště v prohlížeči přes knihovnu Dexie.js
