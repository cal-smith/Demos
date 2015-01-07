each = function(ctx, callback){
	for (var i = 0; i < Object.keys(ctx).length; i++) {
		var k = Object.keys(ctx)[i];//key
		var v = ctx[Object.keys(ctx)[i]];//value
		callback(k, v);//calls the callback once for each key. first argument is the key, second argument is the value
	}
	return ctx;
};

onmessage = function(m){
	postMessage({status:"info", data:"culling initiated"});
	var words = []
	var i = 0;
	each(m.data.data, function(k, v){
		if (k.length < m.data.minlen) {
			delete m.data.data.k;
		} else {
			words.push({word:k, value:v});
		}
		i++;
		postMessage({status:"info", data:"culled: "+((i/Object.keys(m.data.data).length)*100).toString().slice(0,5)+"%"});
	});
	postMessage({status:"done", data:words, u:m.data.data})
};