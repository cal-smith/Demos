onmessage = function(m){
	postMessage({status:"info", data:"culling initiated"});
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
	var keys = m.data.data
	var len = Object.keys(keys).length;
	var i = 0;
	for (k in keys) {
		var v = keys[k];
		if (!(m.data.common == true && k in common || k.length < m.data.minlen)){
			words.push({word:k, value:v});
		}
		i++;
		postMessage({status:"info", data:"culled: "+((i/len)*100).toString().slice(0,5)+"%"});
	}
	postMessage({status:"done", data:words})
};