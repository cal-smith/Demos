var workers = [];
document.addEventListener("DOMContentLoaded", function(event) {
	var counts = {};
	d3.text("comments.txt", function(e, txt){
		info("getting comments");
		var words = txt.split(/\s|\r\n|\r|\n/);
		var temp = [];
		info("formatting text");
		words = words.map(function(e){//peliminary culling/data normilization. A lot of pointless stuff gets reduced to "", which is kinda nice.
			var a = e.toLowerCase()
			.replace(/[h|f]t+ps?/g, "")//removes http/https/ftp
			.replace(/www\.?/g, "")//removes 'www.', other prefixes are likely either words, or will be eliminated later
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
		document.getElementById("stats").textContent += words.length + " individual words, ";
		info("counting words");
		for (var i = 0; i < words.length; i++) {
			if (!words[i].match(/\d/)) {
				if (counts[words[i]] == null) {
					counts[words[i]] = 1;
				} else {
					counts[words[i]]++;
				}
			}
		}
		document.getElementById("stats").textContent += Object.keys(counts).length + " unique words";
		plot(counts, 3, 20);
	});
	document.getElementById('opts').addEventListener("submit", function(event){
		event.stopPropagation();
		event.preventDefault();
		var min = document.getElementById('min').value;
		var amount = document.getElementById('amount').value;
		var common = !document.getElementById("common").checked
		plot(counts, min, amount, common);
	});
});

function plot(uniques, minlen, amount, common) {
	if (typeof amount === "undefined") { amount = 20; };
	if (typeof common === "undefined") { common = true; };
	if (document.getElementsByClassName("bubble")[0]){
		document.getElementsByClassName("bubble")[0].remove();
	}
	if (workers[0]) {
		workers[0].terminate();
		workers.pop();
	}
	info("culling results");
	if (!window.Worker) {
		var words = []
		var common = {"the":"the", "be":"be", "to":"to", "of":"of", 
					"and":"and", "a":"a", "in":"in", "that":"that", 
					"have":"have", "i":"i", "it":"it", "for":"for", 
					"not":"not", "on":"on", "with":"with", "he":"he", 
					"as":"as", "you":"you", "do":"do", "at":"at", "this":"this", 
					"but":"but", "his":"his", "by":"by", "from":"from", 
					"they":"they", "we":"we", "say":"say", "her":"her", 
					"she":"she", "or":"or", "an":"an", "will":"will", 
					"my":"my", "one":"one", "all":"all", "would":"would", 
					"there":"there", "their":"their", "what":"what", 
					"so":"so", "up":"up", "out":"out", "if":"if", "about":"about", 
					"who":"who", "get":"get", "which":"which", "go":"go", 
					"me":"me", "when":"when", "make":"make", "can":"can", 
					"like":"like", "time":"time", "no":"no", "just":"just", 
					"him":"him", "know":"know", "take":"take", "people":"people", 
					"into":"into", "year":"year", "your":"your", "good":"good", 
					"some":"some", "could":"could", "them":"them", "see":"see", 
					"other":"other", "than":"than", "then":"then", "now":"now", 
					"look":"look", "only":"only", "come":"come", "its":"its", 
					"over":"over", "think":"think", "also":"also", "back":"back", 
					"after":"after", "use":"use", "two":"two", "how":"how", 
					"our":"our", "work":"work", "first":"first", "well":"well", 
					"way":"way", "even":"even", "new":"new", "want":"want", 
					"because":"because", "any":"any", "these":"these", "give":"give", 
					"day":"day", "most":"most", "us":"us"};
		keys = Object.keys(uniques);
		var i = 0;
		for (var i = 0; i < keys.length; i++) {
			var k = keys[i];
			var v = m.data.data[keys[i]];
			if (!(m.data.common == true && k in common || k.length < m.data.minlen)){
				words.push({word:k, value:v});
			}
			i++;
			info("culled: "+((i/keys.length)*100).toString().slice(0,5)+"%");
		}
		draw(words);
	} else {
		var worker = new Worker("cull.js");
		workers.push(worker);
		worker.postMessage({data:uniques, minlen:minlen, common:common});
		worker.onmessage = function(m){
			if (m.data.status == "info") {
				info(m.data.data);
			}
			if (m.data.status == "done") {
				draw(m.data.data);
			}
		};
	}
	function draw(words){
		info("sorting");
		words = words.sort(function(a,b){return b.value - a.value;}).slice(0,amount);

		info("plotting");
		var diameter = 960,
		    format = d3.format(",d"),
		    color = d3.scale.category20c();

		var bubble = d3.layout.pack()
		    .sort(null)
		    .size([diameter, diameter])
		    .padding(1.5);

		var svg = d3.select("body").append("svg")
		    .attr("width", diameter)
		    .attr("height", diameter)
		    .attr("class", "bubble");

		var node = svg.selectAll(".node")
			.data(bubble.nodes({children: words}))
			.enter().append("g")
		 	.attr("class", "node")
		  	.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

		node.append("title").text(function(d){ return d.word; });
		node.append("circle")
			.attr("r", function(d) { return d.r; })
			.style("fill", function(d) { return color(d.word); });;
		node.append("text")
		  .attr("dy", ".3em")
		  .style("text-anchor", "middle")
		  .text(function(d) { return d.word; });
		node.append("text")
			.attr("dy", ".3em")
			.style("text-anchor", "middle")
			.attr("transform", "translate(0,20)")
			.text(function(d) { return d.value; });
		d3.select(self.frameElement).style("height", diameter + "px");
	}
}

function info(a){
	document.getElementById('info').textContent = a;
}