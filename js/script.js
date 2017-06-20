(function (global) {
	var cc = {};
	var listNotes = 
	"https://floating-scrubland-23282.herokuapp.com/notes?token=IPVeWZlVJlZKNQGqb"
	var carsHtml = 
	"https://floating-scrubland-23282.herokuapp.com/car?token=IPVeWZlVJlZKNQGqb"

	var setActive = function (element) {
		var active = document.querySelector(".active");
		if (active) {
			document.querySelector(".active").classList = ""
		}		
		document.querySelector(element).classList = "active"; 
	}
	var showLoading = function (selector) {
		var html = "<div class='text-center'>";
		html += "<img src='images/ajax-loader.gif'></div>";
		insertHtml(selector, html);
		};
	var insertHtml = function (selector, html) {
		var targetElem = document.querySelector(selector);
		targetElem.innerHTML = html;
	}
	var insertProperty = function (string, propName, propValue) {
		var propToReplace = "{{" + propName + "}}";
		string = string
		.replace(new RegExp(propToReplace, "g"), propValue);
		return string;
	}

	var loadCarsList = function () {
		$ajaxUtils.sendGetRequest(carsHtml, carsListLoader)
	};

	carsListLoader = function (res) {
		var carsList = res;
		showLoading("#insertHere");
		setActive('#cars');
		$ajaxUtils.sendGetRequest("snippets/carsList.html", function(request) {
			var html = request.responseText;
			var string = "";
			$ajaxUtils.sendGetRequest("snippets/cars.html", function (car) {
				cars = car.responseText;
				for (var i=0; i<carsList.length; i++) {				
					string = insertProperty(cars, 'id', i+1);
					string = insertProperty(string, 'govNumber', carsList[i].gov_number);
					string = insertProperty(string, 'carType', carsList[i].car_type);
					string = insertProperty(string, 'carId', carsList[i].id);
					html += string;
				}
				html += "</tbody></table></div>"
			document.querySelector("#insertHere").innerHTML=html;				
				}, false);			
		}, false)		
	}
	global.$loadCarsList = loadCarsList

	var loadNotesList = function () {
		$ajaxUtils.sendGetRequest(listNotes, notesListLoader)
	};

	notesListLoader = function (res) {
		var notesList = res;
		showLoading("#insertHere");
		setActive('#notes');
		$ajaxUtils.sendGetRequest("snippets/listNotes.html", function(request) {
			var html = request.responseText;
			var string = "";
			var date;
			$ajaxUtils.sendGetRequest("snippets/notes.html", function (note) {
				notes = note.responseText;
				for (var i=0; i<notesList['notes'].length; i++) {				
					string = insertProperty(notes, 'id', i+1);
					string = insertProperty(string, 'govNumber', notesList.notes[i].car.gov_number);
					string = insertProperty(string, 'carType', notesList.notes[i].car.car_type);
					string = insertProperty(string, 'carId', notesList.notes[i].car.id);
					string = insertProperty(string, 'date', notesList.notes[i].date.slice(4, 16));
					string = insertProperty(string, 'km', notesList.notes[i].km);
					string = insertProperty(string, 'works', notesList.notes[i].works);
					string = insertProperty(string, 'pays', notesList.notes[i].pays);
					html += string;
				}
				html += "</tbody></table></div>"
			document.querySelector("#insertHere").innerHTML=html;				
				}, false);			
		}, false)		
	}
	global.$loadNotesList = loadNotesList



})(window);