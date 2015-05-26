<script type="text/javascript">
var Tree = function(){
	this.root = new Node();
	return this.root;
}

var Node = function(parent){
	this.parent = typeof parent === "undefined"?null:parent;
	this.nodes = [];
	this.data = {};
}

var Node.prototype.add = function(){
	this.nodes.push(new Node(this));
}

var tree = new Tree();
tree.add();
tree.add();
</script>