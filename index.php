<!DOCTYPE html>
<html>
<head>
	<title>PICWORD</title>

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="css/style.css">

	<!-- REQUIRED FOR SYMBOL USED FOR SEARCH BUTTON  -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>

<body>


<!-- NAVBAR CODE -->

<div class="topnav" id="myTopnav">
  <a style="padding: 5px 0 0 0;   pointer-events: none;"><img src="img/logo.png" width="50%" height="50%"></a>	
  <a href="#home" class="active">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
  	<span class="SearchBarInNav">
		<form class="example" style="margin:5px;max-width:250px">
		  <input type="text" placeholder="Search.." name="search2">
		  <button type="submit"><i class="fa fa-search"></i></button>
		</form>
  </span>
  <a href="javascript:void(0);" style="font-size:36px;" class="icon" onclick="myFunction()">&#8801;</a>
</div>
<!-- NAVBAR ENDS -->



<!-- MAIN CONTAINER STARTS HERE -->

<!-- SEARCH RESULTS GOES HERE -->
<div class="wrapper" id="holder">

	<div class="Content" id="mainContainer">
		
		
	</div>
	
<!-- ADS GOES HERE -->
	<div class="Ads">
		
		<span class="SearchBar">
			<form class="example" onsubmit = "return Search(this.search.value);">
			  <input type="text" placeholder="Search.." name="search">
			  <button type="submit"><i class="fa fa-search"></i></button>
			</form>
		</span>

		<div class="GoogleAds" >
			<p>GOOGLE ADS HERE</p>
		</div>
		
		<div class="CustomAds">
			<p>CUSTOM ADS HERE</p>
		</div>
	</div>
</div>

<!-- MAIN CONTAINER ENDS HERE -->




<!-- FOOTER PART  -->
<div class="footer">
	<ul>
	  <li><a style="pointer-events: none;">Designed By </a></li>
	  <li><a href="http://innotrek.in/">&copy Innotrek Infocomm</a></li>
	</ul>
</div>	
<!-- FOOTER PART ENDS -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="js/youtubeapi.js"></script>
<!-- JAVASCRIPTS GOES HERE -->

<script>
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
</script>



</body>
</html>