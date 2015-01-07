onmessage = function(m){
	postMessage({status:"info", data:"culling initiated"});
	var words = []
	keys = Object.keys(m.data.data);
	var i = 0;
	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		var v = m.data.data[keys[i]];
		if (k.length < m.data.minlen) {
			delete m.data.data.k;
		} else {
			words.push({word:k, value:v});
		}
		i++;
		postMessage({status:"info", data:"culled: "+((i/keys.length)*100).toString().slice(0,5)+"%"});
	}
	postMessage({status:"done", data:words})
};