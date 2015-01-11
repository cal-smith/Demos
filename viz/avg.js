document.addEventListener("DOMContentLoaded", function(event) {
	var subs = ["pics", "askreddit"];
	avg = [];
	subs.map(function(x){
		d3.json("comments_"+ x +".json", function(e, json){
			var total_words = 0;
			for (var i = 0; i < json.length; i++) {
				var temp = [];
				var words = json[i].body.split(/\s|\r\n|\r|\n/);
				words = words.map(function(e){//peliminary culling/data normilization. A lot of pointless stuff gets reduced to "", which is kinda nice.
					var a = e.toLowerCase()
					.replace(/[h|f]t+ps?/g, "")//removes http/https/ftp
					.replace(/www\.?|\.com/g, "")
					.replace(/\/?(r|u)\/\w+/g,"")//removes /r/ or /u/ and the username/subreddit
					.replace(/\d+|\\|\/|\&(gt|lt|amp)\;/g, " ")//replaces digits and slashes with spaces, also &gt|lt|amp;
					.replace(/\.|\,|\-|\_|\*|\+|\?\|/g, " ")//replaces various formatting characters with spaces
					.replace(/\[|\]|\(|\)|\:|\;|\!|\#|\^/g," ")//more formatting character replacement
					.replace(/\~|\=|\%|\$|\&|\@/g," ")//EVEN MORE
					.replace(/\'|\"/g,"")
					.trim().split(" ");
					if (a.length > 0) temp = temp.concat(a.slice(1,a.length));
					return a[0];
				});
				words = words.concat(temp);
				words = words.filter(function(x){ if (x !== "" || x !== " ") { return x; } });
				json[i].body = words;
				total_words += json[i].body.length;
			}
			console.log(json);
			console.log("average words per comment:", total_words/json.length);
			avg.push({avg:total_words/json.length, sub:x});
		});
	});
});