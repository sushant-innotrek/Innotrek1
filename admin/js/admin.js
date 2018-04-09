
/*  Code For Location
function getLocation(){
	if(navigator.geolocation){
		//console.log(navigator.geolocation)
		//API KEY 	AIzaSyCDTZCu2XIiQSP19sFrNLKi-KBrjH1ATmQ
		navigator.geolocation.getCurrentPosition(showPosition);
	}
}

function showPosition(position){

	var APIURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&key=AIzaSyCDTZCu2XIiQSP19sFrNLKi-KBrjH1ATmQ";
	$.get({
		url: APIURL,
		success: function(data){
			console.log(data.results[0].address_components[4].long_name);
		}
	});
}
*/
function errorDetected(Msg){
	console.log("Working");
	var box = document.getElementById("ERROR");
	box.classList.add("error");
	box.innerHTML = Msg;
}

