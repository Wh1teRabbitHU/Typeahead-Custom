Typeahead-Custom 0.2.1 - EN
======================

<p>
	Its a custom workaround for handling autocomplete inputs

	Description in progress...
</p>

Typeahead-Custom 0.2.1 - HU
======================

<p>
	Képes selectorral GET-es szűrőlistát küldeni a szerver felé (ID alapú) valamint beállításfüggően id-t vagy input szöveget kitölteni Figyelni kell, hogy a 'target' nevű beállítás csak azonos beállításokkal inicializált inputra legyen érdemes (azaz ne legyen dupla inicializálás egy inputra, mert a kétszer lefutó scriptek hibás működést okozhatnak!)

	Inicializálás: new kulcsszóval létrehozni egy TypeaheadCustom(_OPTIONS_) példányt ahol az _OPTIONS_ a beállításokat tartalmazza! Az alábbi beállítások elérhetőek jelenleg:
</p>

<table>
	<thead>
		<tr>
			<th>
				Beállítás neve
			</th>
			<th>
				Leírás
			</th>
			<th>
				Alapértelmezett érték
			</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>extended_options</td>
			<td>Ez abban az esetben szükséges, ha a 'target', 'selector', 'suggestion' és opcionálisan az 'id' mezőt kézzel szeretnénk megadni! Ilyenkor mindegyik kívánt selectort át kell adni a függvénynek!</td>
			<td>false</td>
		</tr>
		<tr>
			<td>field</td>
			<td>Abban az esetben ha az 'extended_options' false, elég csak ezt az értéket kitölteni és a lenti 3 beállításba kerül beillesztésre egyszerűsítés végett. Ha az 'extended_options' false, kötelező megadni!</td>
			<td>-</td>
		</tr>
		<tr>
			<td>target</td>
			<td>Ez jelöli a fő input mezőt amibe írva kerül megjelenítésre a suggestion lista. Pontos Jquery selectorral működik, meg lehet neki ezen belül bármit adni, egy inicializálással akár több typeaheadet is! Fontos: egy oldalon nem lehet két inicializálás ugyanarra az inputra, mert hibás működést okozhat!</td>
			<td>extended_options == true  : $(".autocomplete")</br>
				extended_options == false : $("#autocomplete-" + 'field')</td>
		</tr>
		<tr>
			<td>selector</td>
			<td>A találati listához tartozó div, itt jelenik meg a gépelés során visszatért javaslati lista. String formátumban kell megadni a selectort, azon belül jquerys konvenció érvényesül! Nem szabad ugyanazzal a selectorral más elemet elhelyezni a containeren belül az input mellé, mert hibás működést okozhat!</td>
			<td>extended_options == true  : ".autocomplete-selector-div"</br>
				extended_options == false : "#autocomplete-selector-div-" + 'field'</td>
		</tr>
		<tr>
			<td>suggestion</td>
			<td>A találati lista legelső elemét az input mező mögé helyezi, javaslatként, ami ha nincs kijelölve a listán elem, akkor kiválasztáskor bekerül az inputba (plusz ha meg lett adva, akkor az id is). String formátumban kell megadni a selectort, azon belül jquerys konvenció érvényesül! Nem szabad ugyanazzal a selectorral más elemet elhelyezni a containeren belül az input mellé, mert hibás működést okozhat!</td>
			<td>extended_options == true  : ".autocomplete-suggestion"</br>
				extended_options == false : "#autocomplete-suggestion-" + 'field'</td>
		</tr>
		<tr>
			<td>hasID</td>
			<td>Ez egy boolean érték, amivel be lehet állítani, hogy a visszakapott hashmapból az értékhez tartozó kulcs is eltárolásra kerüljön e! A nevével ellentétben akár stringet is megadhatunk neki! </td>
			<td>false</td>
		</tr>
		<tr>
			<td>id</td>
			<td>Abban az esetben, ha a hasID true, ezzel a string formátumú selectorral adhatjuk meg, hogy hová töltse be a kulcsot kijelölés után. String formátumban kell megadni a selectort, azon belül jquerys konvenció érvényesül! Nem szabad ugyanazzal a selectorral más elemet elhelyezni a containeren belül az input mellé, mert hibás működést okozhat!</td>
			<td>extended_options == true  : ".autocomplete-id"</br>
				extended_options == false : "#autocomplete-id-" + 'id'</td>
		</tr>
		<tr>
			<td>filter</td>
			<td>További szűrőfeltételekhez tartozó selectort lehet beállítani vele. A szerver felé GET-ben utazik és az URL végére kerül tömb formátumban. Elsődlegesen ID alapú szűrésre használható az esetleges UTF-8 encoding hibák miatt. Ha meg lett adva filter, de nem található az oldalon megfelelő elem, akkor 0-t fűz az URL végére</td>
			<td>null</td>
		</tr>
		<tr>
			<td>suggestion_size</td>
			<td>A lenyíló lista méretét lehet vele beállítani. Ha több találatot jelenítünk meg, mint ami kifér, a fel le nyilakkal lehet lapozni a találatok közt</td>
			<td>4</td>
		</tr>
		<tr>
			<td>suggestion_pcs</td>
			<td>A megjelenítendő találatok száma. A visszakapott lista elejéről a megadott értéknek megfelelő mennyiségű találatot tölt be.</td>
			<td>10</td>
		</tr>
		<tr>
			<td>never_delete_text</td>
			<td>Ha nincs pontos találat és az input elveszti a fókuszt true érték esetében nem törlődik az input. False esetén csak pontos kiválasztás után nem lesz törölve!</td>
			<td>false</td>
		</tr>
		<tr>
			<td>never_delete_id</td>
			<td>Ugyanaz, mint a text esetén, az id mező értékét kezeli fókuszvesztés esetén</td>
			<td>false</td>
		</tr>
		<tr>
			<td>required_input_length</td>
			<td>A minimum begépelt szöveg mennyiségét lehet beállítani vele, amiután megjelenik a találati lista. Nagy lekérdezések esetén jön jól, megszabadítva a fölösleges kommunikációtól mindkét felet.</td>
			<td>1</td>
		</tr>
	</tbody>
</table>
<h2>Példa inputra <a href="http://getbootstrap.com/">Bootstrapet</a> (ajánlott) használva:</h2>
<div>
	<pre>
		<code>
			[div class="col-sm-9" id="autocomplete-container"]
				[input type="text" class="form-control autocomplete-suggestion" id="suggestion-text" /]
				[input type="text" class="form-control autocomplete" autocomplete="off" data-target="/url/to/suggestion/list/{0,1,2 ..}" id="text" name="text" /]
				[input type="hidden" class="autocomplete-id" id="id" name="id" /]

				[div class="col-sm-12 panel-info autocomplete-selector-div" id="selector-div-text"]
					[select class="autocomplete-selector" multiple="multiple" id="selector-text"][/select]
				[/div]
			[/div]
		</code>
	</pre>
</div>
<p>
	Megjegyzés: Az 'id' mező csak akkor kell, ha szeretnénk az id-t is eltárolni!
	A '#name' és az '#id' inputok kerülnek kitöltésre, rájuk tetszőlegesen lehet 'name' attribútumot rakni. Kötelező megadni id attribútumot a '#text' mezőnek, mivel ez alabján történik a különböző inputok indexelése javascriptben!
	Az .autocomplete-suggestion, .autocomplete-selector és a .autocomplete-selector-div osztályok jelenleg kötelezőek, a mellékelt css-ben ezekhez lett készítve a formázás. Későbbi fejlesztés során javascript alapú inicializálás is elérhető lesz, de addig csak a css fájllal együtt lehet módosítani ezeket az osztályneveket! Az #autocomplete-container nem hagyható el és ezen belül csak egy typeahead ajánlott a helyes működés miatt! Abban az esetben ha mégis belekerülne másik typeahead, ügyelni kell rá, hogy a targeten kívül a selector, a suggestion és az id is egyedi selectort kapjon inicializálásnál!
</p>