/* Global Variables */
var Results;
var URL1 = "https://www.googleapis.com/language/translate/v2";
var URL3 = "&source=en&target=hi";
var key = "?key=AIzaSyCDTZCu2XIiQSP19sFrNLKi-KBrjH1ATmQ";
var category = ["How To/Tutorials", "Bitcoin", "Nokia X", "Xiaomi", "Facebook", "Android", "IBM", "IOS", "SpaceX", "Machine Learning", "Cloud Computing", "Javascript", "AWS", "Ethical Hacking", "Data Center", "Web Apps", "Marvel", "Avengers", "Blockchain", "Mining", "Google Cloud"];
var ham_status = false;
var data;
var dataindex = 0;
var err;
var cardindex = 0;
var listen_status = -1;
var container = document.getElementById("mainContainer");
/* Executes on Load.Gets the parameter,Parses and sets sends to search function */
window.onload = function () {

	//translate("hello");
}
/* Uses Youtube Api to Search by video id */
function translate(thumb, Title, desc) {

	URL = URL1 + key + '&q=' + Title + URL3;
	var xhttp = new XMLHttpRequest();
	var Title_hi;
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			Title_hi = JSON.parse(this.responseText);
			//showResults(Results.items);
			console.log(Title_hi);
			/* Desc function */
			URL = URL1 + key + '&q=' + desc + URL3;
			var xhttp = new XMLHttpRequest();
			var desc_hi;
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					desc_hi = JSON.parse(this.responseText);
					//showResults(Results.items);
					console.log(desc_hi);
					document.getElementById("mainContainer").innerHTML += formatResultView(thumb, Title_hi.data.translations[0].translatedText, desc_hi.data.translations[0].translatedText);



				}
			};
			xhttp.open("GET", URL, true);
			xhttp.send();

		}
	};
	xhttp.open("GET", URL, true);
	xhttp.send();

	return false;

}
/* For Hamburger Expansion in Mobile View */
function hamFunction() {
	if (ham_status == false) {
		document.getElementById('myTopnav').style.height = "320px";
		ham_status = true;
	}
	else {
		document.getElementById('myTopnav').style.height = "60px";
		ham_status = false;
	}
}
/* Calling the Floating Scroll Button */
window.onscroll = function () { scrollFunction() };
/* Defination of Custom Scroll Function */
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		$('#float').css({ 'display': 'block' });


	} else {
		$('#float').css({ 'display': 'none' });


	}
}

/* To set Scrollbar to top */
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
/* Called from Search Function to Display Results in mainContainer */
function showResults(items) {
	

	document.getElementById("loading").style.display = "none";
	document.getElementById("Ads").style.display = "grid";
	if (items.success == true) {
		console.log('data length : ' + items.data.length);

		for (j = 0; j < items.data.length; j++) {

			var thumb = items.data[j].imageUrl;
			var Title = items.data[j].title;
			var desc = items.data[j].content;
			translate(thumb, Title, desc);
			//container.innerHTML += formatResultView(thumb, Title, desc);

		}
	}
}
/* Adds Tags to Format the Results before inflating */
function formatResultView(thumb, Title, desc) {
	var resElement = `<div class="videoResult">
			<div class="video" style='background-image:url(`+ thumb + `);'></div>
			<div id="title_`+ cardindex + `" class="Title" style="font-weight:bold;">` + Title + `</div>
			<div id="desc_`+ cardindex + `" class="Title">` + desc + `</div>
			<button class="listen_btn" onclick="listen_btn('`+ cardindex + `');" ><center><h3 class="listen_txt">Listen/Stop</h3></center></button>
		</div>`;
	cardindex++;
	return resElement;
}

function listen_btn(index) {
	var title = document.getElementById('title_' + index).innerHTML;
	var desc = document.getElementById('desc_' + index).innerHTML;


	if (listen_status == index) {
		responsiveVoice.cancel();
		listen_bit = false;
		listen_status = -1;
	} else {

		responsiveVoice.speak(title + desc, "Hindi Female", { rate: 1 });
		listen_status = index;
	}




}
/* Handles onClick Events on each result card */
function showVideo(vid) {
	url = '/watch.html?name=' + vid + '&lang=Hindi';
	document.location.href = url;
}


/* http json request */
var getJSON = function (url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function () {
		var status = xhr.status;
		if (status === 200) {
			callback(null, xhr.response);
		} else {
			callback(status, xhr.response);
		}
	};
	xhr.send();
};
/*
getJSON('http://127.0.0.1:5000/news?category=national',
	function (err, data) {
		if (err !== null) {
			alert('Something went wrong: ' + err);
		} else {
			console.log(data);
			showResults(data);
		}
	});
*/
/*
getJSON("http://127.0.0.1:5000/news?category=science",
	function (err, data) {
		if (err !== null) {
			alert('Something went wrong: ' + err);
		} else {
			console.log(data);
			showResults(data);
		}
	});
*/

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
		  
		showResults(JSON.parse(this.response));
		
      }
    };
    xhttp.open("GET", "inshorts.php", true);
    xhttp.send();
  }

  loadDoc();

