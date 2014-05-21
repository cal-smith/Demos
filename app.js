var flickr = "http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=d00c131296743ab4a254eae6250a7fe8&user_id=61402163@N02&per_page=5&format=json&jsoncallback=?";
var insta = "https://api.instagram.com/v1/users/1853464/media/recent?count=5&access_token=1853464.f34c5fd.a79e763765ef4151816378b13762166e&callback=?";

$.getJSON(flickr, {
	format: "json"
}).done(function (flickr_data) {
	console.log("flickr got it");
	console.log(flickr_data);
	$.getJSON(insta, {
		format: "json"
	}).done(function (insta_data) {
		console.log("insta got it");
		console.log(insta_data);
		for (var f = 0; f < flickr_data.photos.total; f++){
			var farm = flickr_data.photos.photo[f].farm;
			var id = flickr_data.photos.photo[f].id;
			var secret = flickr_data.photos.photo[f].secret;
			var server = flickr_data.photos.photo[f].server;
			var title = flickr_data.photos.photo[f].title;
			var flickr_url = "http://farm"+ farm +".staticflickr.com/"+ server +"/"+ id +"_"+ secret +"_b.jpg";
			var image = insta_data.data[f].images.standard_resolution.url;
			var caption = insta_data.data[f].caption.text;
			$('.left').append('<div><img src='+ flickr_url +'><p>'+ title +'</p></div><div><img src='+ image +'><p>'+ caption +'</p></div>');
		}
	});
});

//location.href="https://instagram.com/oauth/authorize/?display=touch&client_id=f34c5fd9a3004b0d80373449a593b8f0&redirect_uri=http://hansolo669.github.io/Demos/index.html&response_type=token";
