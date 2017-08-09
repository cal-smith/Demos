/** @jsx React.DOM */
if (!('contains' in String.prototype)) {
    String.prototype.contains = function (str, startIndex) {
        return -1 !== String.prototype.indexOf.call(this, str, startIndex);
    };
}

var Reddit = React.createClass({
	loading: false,
	loadReddit: function(after, reload){
		var url = "https://www.reddit.com/r/pics/.json";
		var urlvars = after ? ["limit=50", "after="+after] : ["limit=50"];
		if (window.location.hash) {
			var multi = window.location.hash.slice(1);
			url = "https://www.reddit.com/r/" + multi + "/.json";
		}
		if(!this.loading){
			this.loading = true;
			ajax.send({
				url:url,
				json: true,
				url_var: urlvars
			}, function(data){
				var posts = [];
				posts.push(data.data.children);
				if (!reload) {
					posts = this.state.data;
					posts.push(data.data.children);
				}
				this.setState({data: posts, after: data.data.after});
				this.loading = false;
			}.bind(this));
		}
	},
	scrollListener: function(){
		if (document.body.scrollTop >= document.body.scrollHeight - window.innerHeight - 1000) {
			console.log("load");
			this.loadReddit(this.state.after);
		}
	},
	getInitialState: function(){
		return {data: []};
	},
	componentDidMount: function(){
		this.loadReddit();
		window.addEventListener('scroll', this.scrollListener);
	},
	render: function(){
		var after = this.state.after;
		var loadReddit = this.loadReddit;
		console.log(this.state.data);
		var nodes = this.state.data.map(function(posts){
			return (
				posts.map(function(post){
					if (post.data.url.contains("i.imgur")){
						return (<Picture url={post.data.url} title={post.data.title}></Picture>);
					}
				}));
		});
		return (
			<div>
				<Controls loadReddit={this.loadReddit}></Controls>
				<div className="pictures">
					{nodes}
				</div>
			</div>
		)
	}
});

var Controls = React.createClass({
	addSubs: function(){
		var sub = this.refs.subname.getDOMNode().value.trim();
		window.location.hash ? window.location.hash += "+" + sub : window.location.hash += sub;
		this.props.loadReddit(false, true);
		this.refs.subname.getDOMNode().value = "";
		return false;
	},
	render: function(){
		return (
			<div className="controls">
				<span>controls: </span>
				<form className="addsub" onSubmit={this.addSubs}>
					<input type="text" ref="subname" placeholder="Add Subreddits" />
					&nbsp;
					<input type="submit" value="Add" />
				</form>
			</div>
		)
	}
});

var Picture = React.createClass({
	render: function(){
		return(
			<div className="image">
				<img src={this.props.url}></img>
				<h1 className="title">{this.props.title}</h1>
			</div>
		);
	}
});

React.renderComponent(
	<Reddit />,
	document.getElementById('react')
);
