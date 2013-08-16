
if(!('contains' in String.prototype))// polyfill for chrome so str.contains actually works.
	String.prototype.contains = function(str, startIndex) { return -1 !== String.prototype.indexOf.call(this, str, startIndex); };

var datavar; //le data variable
datavar = {'limit': '50'};//party bitches
var loading = false;//shits not loading
var after;//yup
var url; //global url. cause functions aint shit

$(document).ready(function() {//add a check for /false or /true and set the includepics var appropriatly
	if(localStorage.getItem("includepics") == null){
		localStorage.setItem("includepics", "true");
		$('#picstrue').prop('checked', true);
		console.log("null - set all true");
		checkurl();
	} else if (localStorage.getItem("includepics") == 'true'){
		$('#picstrue').prop('checked', true);
		console.log("true - set radio true");
		checkurl();
	} else if (localStorage.getItem("includepics") == 'false'){
		$('#picsfalse').prop('checked', true);
		console.log("false - set radio false");
		//set include pics radio to false so we dont break the rest of the code -_-
		checkurl();
	}

	function checkurl(){
		var sub = window.location.hash; //gets the hash varible we built up earlyer
		var subreddits = sub.replace('#', ' ').trimLeft();//removes the hash and trims it up
		console.log(subreddits);//logging dis bitch
		if (localStorage.getItem("includepics") == 'true') {
			if(window.location.hash){
				url = "http://www.reddit.com/r/pics+"+ subreddits +".json";
				$('.alert').remove();
				imgload(datavar);
			}else{
				url = "http://www.reddit.com/r/pics.json";
				$('.alert').remove();
				imgload(datavar);
			}
		} else if (localStorage.getItem("includepics") == 'false' && window.location.hash) {
			url = "http://www.reddit.com/r/"+ subreddits +".json";
			$('.alert').remove();
			$( ".pics" ).remove();
			imgload(datavar);
		} else{
			$('.images').append('<div class="image alert" id="plz"><h1>Add Subreddits plz</h1></div>');
		}
	}

	function imgload(datavar){
		$.ajax({
			url: url,
			jsonp: "jsonp",
			data: datavar,
			dataType: "jsonp"
		}).done(function(json){
			$('.alert').remove();
			loading = false;
			console.log(json);
			after = json.data.after;
			var finalhtml;
			for (var r = 0; r < json.data.children.length; r++){
				var image = json.data.children[r].data.url;
				var subreddit = json.data.children[r].data.subreddit;
				var title = json.data.children[r].data.title;
				if (image.contains("i.imgur")) {
					if (json.data.children[r].data.over_18 === true) {
						finalhtml += '<div class="image '+ subreddit +'"><img class="nsfw" src='+ image +'><h1 class="title">'+ title +'</h1></div>';
						//$('.images').append('<div class="image '+ subreddit +'"><img class="nsfw" src='+ image +'><h1 class="title">'+ title +'</h1></div>');
					}else if (json.data.children[r].data.over_18 === false){
						finalhtml += '<div class="image '+ subreddit +'"><img src='+ image +'><h1 class="title">'+ title +'</h1></div>';
						//$('.images').append('<div class="image '+ subreddit +'"><img src='+ image +'><h1 class="title">'+ title +'</h1></div>');
					}
				}
			}
			$('.images').append(finalhtml);//appends the html we built
			
		});
	}
	$('#addsub').submit(function() {
		var sub = document.getElementById("subname").value;
		if (window.location.hash){
			window.location.hash += "+" + sub;
			checkurl();
			return false;
		} else{
			window.location.hash += sub;
			checkurl();
			return false;
		}
	});

	function loadmore(){
		console.log(after);
		datavar = {'limit': '50', 'after':after};
		checkurl();
	}

	$(window).scroll(function(){
		if($(window).scrollTop()==$(document).height()-$(window).height()){
			console.log("bottom!");
			if (loading == false){
				loadmore();	
				loading = true;
			} else if (loading == true){
				console.log("loading...");
			}
		}
	});
	$( "#picstrue" ).click(function(){
		localStorage.setItem("includepics", "true");
		$( ".image" ).remove();
		$('.alert').remove();
		//set the window to top
		checkurl();
	});
	$( "#picsfalse" ).click(function(){
		localStorage.setItem("includepics", "false");
		$( ".image" ).remove();
		$('.images').prepend('<div class="image alert" id="plz"><h1>Add Subreddits plz</h1></div>');
		//set the window to top
		checkul();
	});
	/*$("nsfw:checked"){
		//display: block;
	}
	$("nsfw:unchecked"){
		//display: none;
	}*/

	$("#reload").click(function(){//remove the auto-reload on adding subreddits?
		//set the window back to top
		checkurl();
	});

});