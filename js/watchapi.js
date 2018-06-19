/* Global Variables */
var Results;
var URL1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&videoCaption=closedCaption&type=video&maxResults=15&q=";
var URL3 = "&key=AIzaSyCDTZCu2XIiQSP19sFrNLKi-KBrjH1ATmQ";
var category = ["How To/Tutorials", "Bitcoin", "Nokia X", "Xiaomi", "Facebook", "Android", "IBM", "IOS", "SpaceX", "Machine Learning", "Cloud Computing", "Javascript", "AWS", "Ethical Hacking", "Data Center", "Web Apps", "Marvel", "Avengers", "Blockchain", "Mining", "Google Cloud"];
var vid;
var subindex = 0;
var changed = 0;
var ham_status = false;
var v_name;
var player;
var mute = 0;
var hide = 0;
var lang = 'Hindi';
var audio = true;
/* Executes onLoad Used to split parameters */
window.onload = function () {
	
	var url = document.location.href,
		params = url.split('?')[1].split('&'),
		data = {}, tmp;
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split('=');
		data[tmp[0]] = tmp[1];
	}
	vid = data.name;
	lang = data.lang;
	
	showVideo(vid);
}
/* Used to send search query back to index page */
function Search(t) {
	url = '/index.html?name=' + t;

	document.location.href = url;
	return false;
}
/* Used to Inflate Video on the Div */
function showVideo(vid) {
	var container = document.getElementById("mainContainer");
	/* For Desktop View */
	var videoElement = `
	<div id="ytplayer"  align="center"style="padding:2px;margin:2px;">
		<iframe id="YTIframe" width="700" height="400" 
			src="https://www.youtube.com/embed/`+ vid + `?enablejsapi=1&mute=1&disablekb=1&hl=hi&autoplay=0&cc_lang_pref=hi&rel=0">
		</iframe>	
		<div id="Controller" align = "center" style ="color : black;font-weight:bold;">
		<div class="dropdown">
		  <button id="langButton" class="dropbtn">Language</button>
		  <div class="dropdown-content">
			<a href="/watch.html?name=`+vid+`&lang=Hindi">Hindi</a>
			<a href="/watch.html?name=`+vid+`&lang=Marathi">Marathi</a>
			<a href="/watch.html?name=`+vid+`&lang=Gujarati">Gujarati</a>
			<a href="/watch.html?name=`+vid+`&lang=Kannada">Kannada</a>
			<a href="/watch.html?name=`+vid+`&lang=Malayalam">Malayalam</a>
			<a href="/watch.html?name=`+vid+`&lang=Tamil">Tamil</a>
			<a href="/watch.html?name=`+vid+`&lang=Telugu">Telugu</a>
			<a href="/watch.html?name=`+vid+`&lang=Urdu">Urdu</a>
	
			</div>
		</div>
		<button id="muteButton" class="muteButton" onclick="hindiAudio()">Mute Audio</button>
		
		<button id="hideButton" class="muteButton" onclick="hideSubtitles()">Hide Subtitles</button>
		</div>
		
	</div>

	<div id = "v_name" align = "left" style ="color : black;font-weight:bold;"></div>
	<div id = "subs" align = "center"  >Searching Subtitles. Please wait...</div>
	<div id = "subs" >
	
	<ul>
	<li>Website is currently in Beta Version.</li><br>
	<li>Hindi audio may not be in sync with the English audio.</li><br>
	<li>Some videos may not work due to copyright issues.</li><br>
	<li>Audio is available only in Hindi Language.</li>
	<li></li>
	
	
	</ul>
	</div>
	
	
	`;

	/* For Mobile View */
	if (document.documentElement.clientWidth < 720) {

		videoElement = `<div id="ytplayer"  align="center"style="padding:2px;margin:2px;">
		<iframe id="YTIframe" width="350px" height="200" 
			src="https://www.youtube.com/embed/`+ vid + `?enablejsapi=1&mute=1&disablekb=1&hl=hi&autoplay=0&cc_lang_pref=hi&rel=0">
		</iframe>	
		<div id="Controller" align = "center" style ="color : black;font-weight:bold;">
		<div class="dropdown">
		  <button id="langButton" class="dropbtn">Language</button>
		  <div class="dropdown-content">
			<a href="/watch.html?name=`+vid+`&lang=Hindi">Hindi</a>
			<a href="/watch.html?name=`+vid+`&lang=Marathi">Marathi</a>
			<a href="/watch.html?name=`+vid+`&lang=Gujarati">Gujarati</a>
			<a href="/watch.html?name=`+vid+`&lang=Kannada">Kannada</a>
			<a href="/watch.html?name=`+vid+`&lang=Malayalam">Malayalam</a>
			<a href="/watch.html?name=`+vid+`&lang=Tamil">Tamil</a>
			<a href="/watch.html?name=`+vid+`&lang=Telugu">Telugu</a>
			<a href="/watch.html?name=`+vid+`&lang=Urdu">Urdu</a>
	
			</div>
		</div>
		<button id="muteButton" class="muteButton" onclick="hindiAudio()">Mute Audio</button>
		
		<button id="hideButton" class="muteButton" onclick="hideSubtitles()">Hide Subtitles</button>
		</div>
	</div>
	<div id = "v_name" align = "left" style ="color : black;font-weight:bold;"></div>
	<div id = "subs" align = "center"  >Searching Subtitles. Please wait...</div>
	<div id = "subs" >
	
	<ul>
	<li>Website is currently in Beta Version.</li><br>
	<li>Hindi audio may not be in sync with the English audio.</li><br>
	<li>Some videos may not work due to copyright issues.</li><br>
	<li>Audio is available only in Hindi Language.</li>
	<li></li>
	
	
	</ul>
	</div>
		`;
	}

	container.innerHTML = videoElement;
	$('#langButton').text(lang);
	if(lang!="Hindi"){
		$('#muteButton').text("Audio not supported");
		$('#muteButton').attr("disabled","disabled");
		audio=false;
		
	}
	TEST(vid);
}


/* Used for subtitle parsing and displaying as with sync with YTplayer */
function TEST(vid) {
	var player;
	
	function onYouTubeIframeAPIReady() {
		player = new YT.Player('YTIframe', {
			events: {
				'onReady': function onPlayerReady(event) {
					$('#v_name').text(event.target.getVideoData().title);
					console.log('loading Player');
					loadDoc();
				},
				'onStateChange': onPlayerStateChange
			}
		});

	}
	function onPlayerStateChange() {
		console.log("my state changed");
		changed = 1;
	}
	onYouTubeIframeAPIReady();
	function loadDoc() {
		var xhttp = new XMLHttpRequest();
		var parser, xmlDoc;
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var Data = this.responseText.toString();
				if(hide==0)
				$('#subs').text('Subtitles Loaded');
				function Parse(data) {
					var subtitles = [];
					srt = data.replace(/\r\n|\r|\n/g, '\n');
					var srt_ = srt.split('\n');
					var prev = 0;
					var cont = 0;
					var divider = 0;
					try {
						for (s in srt_) {
							srt_[s] = srt_[s].replace(/<\/?[^>]+(>|$)/g, "");
							st = srt_[s].split('\n');
							divider++;
							n = st[0];
							if (divider == 1) {
								subtitles[cont] = {};
								subtitles[cont].number = n;
							}
							else if (divider == 2) {
								var time = n.split(' --> ');
								var mm = time[0].split(':');
								var hr = mm[0] * 3600;
								var min = mm[1] * 60;
								var ss;
								ss = mm[2].split(',')[0];
								var sec = parseInt(ss) + parseInt(min) + parseInt(hr);
								subtitles[cont].start = sec;
							} else if (divider == 3) {
								subtitles[cont].text = n;
							} else if (divider == 4) {
								divider = 0;
								cont++;
							} else {
								console.log('divider error');
							}
						}
						console.log(subtitles);
						if (subtitles.length <= 2) {
							$('#subs').text("Subtitles blocked by Youtube due to Copyrights.");
						}
						var temp = 0;
						time_update_interval = setInterval(function () {
							updateTimerDisplay();
						}, 100);
					} catch (error) {
						$('#subs').text("Subtitles blocked by Youtube due to Copyrights.");
					}
					function updateTimerDisplay() {
						var t = Math.round(player.getCurrentTime());
						if (changed == 1) {
							subindex = 0;
							while (subtitles[subindex].start < t) {
								subindex++;
							}
							changed = 0;
						}
						if (subtitles[subindex].start < t) {




							if (mute == 1) {
								if(hide==0)
								$('#subs').text(subtitles[subindex].text);
								subindex++;
							}
							else {
								if (!responsiveVoice.isPlaying()) {
									if(audio==true)
									responsiveVoice.speak(subtitles[subindex].text, "Hindi Female", { rate: 1 });
									if(hide==0)
										$('#subs').text(subtitles[subindex].text);
									subindex++;
								}
							}
						}
					}
				};
				Parse(Data);
			}
		};
		xhttp.open("GET", "http://picword.in/testSubs.php?Youtube=https://www.youtube.com/watch?v=" + vid + "&Lang="+lang, true);
		xhttp.send();
	}
}
/* For Hamburger Menu in Mobile View */
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
/* For Hindi Audio Button */
function hindiAudio() {

	if (mute == 0) {
		mute = 1;
		$('#muteButton').text('Unmute Audio');
		responsiveVoice.cancel();

	}
	else {
		mute = 0;
		$('#muteButton').text('Mute Audio');
	}


	var t = Math.round(player.getCurrentTime());
	while (subtitles[subindex].start < t) {
		subindex++;
	}
}
/* For hiding subtiles */
function hideSubtitles() {

	if (hide == 0) {
		hide = 1;
		$('#hideButton').text('Show Subtitles');
		$('#subs').text("");

	}
	else {
		hide = 0;
		$('#hideButton').text('Hide Subtitles');
		$('#subs').text("Loading");
	}


	
}
