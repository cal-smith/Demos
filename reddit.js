
if(!('contains' in String.prototype))// polyfill for chrome so str.contains actually works.
	String.prototype.contains = function(str, startIndex) { return -1 !== String.prototype.indexOf.call(this, str, startIndex); };

var datavar = {'limit': '50'};//party bitches
var loading = false;//shits not loading
var after;//yup
var imagearray = [];
var db;
var request = window.indexedDB.open("imagedb");

request.onsuccess = function(event){
	console.log("made indexedDB");
	db = request.result;
}

request.onupgradeneeded = function(event){
	var db = event.target.result;
	var objectStore = db.createObjectStore("image", {keyPath: "id"});
}

$(document).ready(function() {//add a check for /false or /true and set the includepics var appropriatly
	if(localStorage.getItem("includepics") == null){//checks if /r/pics is included/if this is first visit, and sets /r/pics to be included
		localStorage.setItem("includepics", "true");
		$('#picstrue').prop('checked', true);
		console.log("null - set all true");
		checkurl();
	} else if (localStorage.getItem("includepics") == 'true'){//checks if /r/pics is included and sets the radio to true.
		$('#picstrue').prop('checked', true);
		console.log("true - set radio true");
		checkurl();
	} else if (localStorage.getItem("includepics") == 'false'){//checks if /r/pics is set to false and set the radio to false
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
				var url = "http://www.reddit.com/r/pics+"+ subreddits +".json"; //sets url to /r/pics + other subreddits
				$('.alert').remove(); //removes the "add subreddits" text
				imgload(url);
			}else{
				var url = "http://www.reddit.com/r/pics.json";//sets url to the default only /r/pics 
				$('.alert').remove(); //removes the "add subreddits" text
				imgload(url);
			}
		} else if (localStorage.getItem("includepics") == 'false' && window.location.hash) {
			var url = "http://www.reddit.com/r/"+ subreddits +".json"; //sets url to just other subreddits
			$('.alert').remove(); //removes the "add subreddits" text
			$( ".pics" ).remove(); //removes all /r/pics images
			imgload(url);
		} else{
			$('.images').append('<div class="image alert" id="plz"><h1>Add Subreddits Plz</h1></div>'); //appends a nice alert... lol
		}
	}

	function imgload(url){
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
			for (var r = 0; r < json.data.children.length; r++){ //loops through the reddit results
				var image = json.data.children[r].data.url; //sets up a nice reference to the image url
				var subreddit = json.data.children[r].data.subreddit; //sets up a nice refernce to the subreddit url
				var title = json.data.children[r].data.title; //sets up a nice refernce to the title
				var id = json.data.children[r].data.id; //sets a nice reference to the reddit id
				if (image.contains("i.imgur")) { //checks if the url points to imgur
					imagearray.push({'id':id, 'url':image, 'subreddit':subreddit, 'title':title}); //adds valid images to the imagearray
					var imageDB = [{'id':id, 'url':image, 'subreddit':subreddit, 'title':title}];
					var transaction = db.transaction("image", "readwrite");
					var objectStore = transaction.objectStore("image");
					var request = objectStore.add(imageDB[0]);
					if (json.data.children[r].data.over_18 === true) {
						finalhtml += '<div class="image '+ subreddit +" "+ id +'" id="'+ id +'"><img class="nsfw" src='+ image +'><h1 class="title">'+ title +'</h1></div>';
					}else if (json.data.children[r].data.over_18 === false){
						finalhtml += '<div class="image '+ subreddit +" "+ id +'" id="'+ id +'"><img src='+ image +'><h1 class="title">'+ title +'</h1></div>';
					}
				}
			}
			$('.images').append(finalhtml);//appends the html we built
			console.log(imagearray[0].id);
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
	//!!!!!
	loop{
		loop_over_indexdb{
			when(id) == 100px + above_window && hidden == false{
				remove image;
				hidden == true
			}
			when(id) == 100px + above_window && hidden == true{
				add image;
				hidden == false
			}
		} 
	}

	$(window).scroll(function(){
		if($(window).scrollTop()==$(document).height()-$(window).height()){
			console.log("bottom!");
			if (loading == false){
				console.log(after);
				datavar = {'limit': '50', 'after':after};
				checkurl();
				loading = true;
			} else if (loading == true){
				console.log("loading...");
			}
		}

		if($(id).offset().top < $(window).scrollTop()){
			console.log("a");
			console.log($(".image").attr("class"));
		}
		/*on window scroll, check to see if a image in the iamgearray is obscued by window (element.pos > top of window/viewport) 
		at the same time check if a image in the image array is comeing back in view (element.pos > 10px from the top of the window/viewport)
		if the image is obscured delete the <img> from the <div>
		if the image is comeing back down, append it back to the <div>(and remove the div height)
		<div> should be referenced by reddit id, as should the image.
		each <div> should be set to the same height as the image that will be deleted (element.image.heigt, div.height set element.image.height).
			of course we could also just set the <div> to the image's heght in the first place, and then continue simply removeing the <img>
		basically we are going to chew through cpu cycles to save on memory. costly on the processing front, but should leave everyone with a snappier experiance.



		*/
		/*
		$('#someDiv').height();
		$('#someDiv').height(newHeight);
		window.scroll
			pagehieght = display area
				when .images go 100px above window.top
					set div height to image height
					remove image
					set visibility to hidden
				when .images come within 100px of window.top
					set visibility to show
					add image back (grab the imgur url from the array of images that imgload will build)
				when .images go 100px below window.bottom
					remove image
					setvisibility to hidden
				when .images come within 100px of window.bottom
					setvisibility to show
					add image back
		*/
	});

	$( "#picstrue" ).click(function(){
		localStorage.setItem("includepics", "true");
		$( ".image" ).remove();
		$('.alert').remove();
		window.scrollTo(0, 0); //set the window to top
		checkurl();
	});

	$( "#picsfalse" ).click(function(){
		localStorage.setItem("includepics", "false");
		$( ".image" ).remove();
		$('.images').prepend('<div class="image alert" id="plz"><h1>Add Subreddits plz</h1></div>');
		window.scrollTo(0, 0); //set the window to top
		checkurl();
	});

	/*$("nsfw:checked"){
		//display: block;
	}
	$("nsfw:unchecked"){
		//display: none;
	}*/

	$("#reload").click(function(){//remove the auto-reload on adding subreddits?
		window.scrollTo(0, 0); //set the window back to top
		checkurl();
	});


});
