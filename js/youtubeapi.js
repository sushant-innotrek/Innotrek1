var Results;
var URL1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&q=";
var URL3 = "&key=AIzaSyCDTZCu2XIiQSP19sFrNLKi-KBrjH1ATmQ";
var category=["How To/Tutorials","The Unboxing Video","Coding Train","Web Development","Software Development","Product Reviews"];


function Search(searchstring) {
	URL2 = searchstring.replace(/\s/g, "+");
	URL = URL1+URL2+URL3;
	console.log(URL);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	 Results = JSON.parse(this.responseText);
	 showResults(Results.items);
	}
  };
  xhttp.open("GET", URL, true);
  xhttp.send();
  return false;
}

Search(category[Math.floor(Math.random()*category.length)]);

function showResults(items){
	var container = document.getElementById("mainContainer");
	container.innerHTML = "";
	for(i=0;i<items.length;i++){
		var video = items[i].snippet;
		var thumb = video.thumbnails.high.url;
		var Title = video.title;
		var vid = items[i].id.videoId;

		container.innerHTML+=formatResultView(thumb,Title,vid);
	}	
	console.log(items);
}

function formatResultView(thumb,Title,vid){
	var resElement = `<div class="videoResult" onclick = "showVideo('`+vid+`')">
			<div class="video" style='background-image:url(`+thumb+`');'></div>
			<div class="Title">`+Title+`</div>
		</div>`;

	return resElement;
}

function showVideo(vid){
	console.log('Works');
	var container = document.getElementById("mainContainer");
	var videoElement=`<div id="ytplayer"></div>`;
	container.innerHTML=videoElement;
	startVideo(vid);
}

function startVideo(vid){
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  var player;
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
      height: '800',
      width: '600',
      videoId: vid
    });
  }
	
} 