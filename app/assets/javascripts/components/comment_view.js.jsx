/** @jsx React.DOM */

var CommentView = React.createClass({
  getInitialState: function() {
    return { author: '', comment: '' }
  },
  componentWillMount: function() {
  	$.ajax({
  		url: '/comments/' + this.props.comment_id,
  		dataType: 'json',
  		type: 'GET',
  		success: function(data) {
  			this.setState({author: data.author, comment: data.comment});
  		}.bind(this)
  	});
  },
  render: function() {
  	return (
  		<div>
  			<h1>{this.state.author}</h1>
  			<span className="comments">{this.state.comment}</span><br />
  			<a href="#/">Back to list of comments</a>
  		</div>
  	);
  }
});
