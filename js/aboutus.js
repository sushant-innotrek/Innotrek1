/* Global Variables */
var Results;
var URL1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&videoCaption=closedCaption&type=video&maxResults=50&q=";
var URL3 = "&key=AIzaSyCDTZCu2XIiQSP19sFrNLKi-KBrjH1ATmQ";
var category = ["How To/Tutorials", "Bitcoin", "Nokia X", "Xiaomi", "Facebook", "Android", "IBM", "IOS", "SpaceX", "Machine Learning", "Cloud Computing", "Javascript", "AWS", "Ethical Hacking", "Data Center", "Web Apps", "Marvel", "Avengers", "Blockchain", "Mining", "Google Cloud"];
var ham_status = false;
/* Executes on Load.Gets the parameter,Parses and sets sends to search function */
window.onload = function () {
	
	try {
		var url = document.location.href,
			params = url.split('?')[1].split('&'),
			data = {}, tmp;
		for (var i = 0, l = params.length; i < l; i++) {
			tmp = params[i].split('=');
			data[tmp[0]] = tmp[1];
		}
		Search(data.name);
	} catch (error) {
		Search(category[Math.floor(Math.random() * category.length)]);
	}
}
/* Uses Youtube Api to Search by video id */
function Search(searchstring) {
	URL2 = searchstring.replace(/\s/g, "+");
	URL = URL1 + URL2 + URL3;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			Results = JSON.parse(this.responseText);
			showResults(Results.items);
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
		 $('#float').css({'display' : 'block'});
		

	} else {
		$('#float').css({'display' : 'none'});
		

	}
}

/* To set Scrollbar to top */
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
/* Called from Search Function to Display Results in mainContainer */
function showResults(items) {
	var container = document.getElementById("mainContainer");
	/* container.innerHTML = "";
	document.getElementById("loading").style.display = "none"; */
	document.getElementById("Ads").style.display = "grid";
	for (i = 0; i < items.length; i++) {
		var video = items[i].snippet;
		var thumb = video.thumbnails.high.url;
		var Title = video.title;
		var vid = items[i].id.videoId;

		//container.innerHTML += formatResultView(thumb, Title, vid);
	}

}
/* Adds Tags to Format the Results before inflating */
function formatResultView(thumb, Title, vid) {
	var resElement = `<div class="videoResult" onclick = "showVideo('` + vid + `')">
			<div class="video" style='background-image:url(`+ thumb + `');'></div>
			<div class="Title"><b>`+ Title + `</b></div>
		</div>`;

	return resElement;
}
/* Handles onClick Events on each result card */
function showVideo(vid) {
	url = '/watch.html?name=' + vid + '&lang=Hindi';
	document.location.href = url;
}

/* For Counting number of visitors */
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("counter").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "count.php", true);
    xhttp.send();
  }

  loadDoc();

