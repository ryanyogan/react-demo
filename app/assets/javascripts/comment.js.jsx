/** @jsx React.DOM */

var token = $('meta[name="csrf-token"]').attr('content');
$.ajaxSetup({
  beforeSend: function(xhr) {
    xhr.setRequestHeader('X-CSRF-Token', token);
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <table width="100%">
          <thead>
            <tr><th width="100%">{this.props.author}</th></tr>
          </thead>
          <tbody>
            <tr><td><a href={"#/comments/" + this.props.id}>{this.props.comment}</a></td></tr>
          </tbody>
        </table>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.comments.map(function(comment, index) {
      return (
        <Comment author={comment.author} comment={comment.comment} id={comment.id} key={index} />
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function() {
    return { comments: [] };
  },
  componentDidMount: function() {
    this._loadCommentsFromServer();
  },
  _loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  _handleCommentSubmit: function(comment) {
    var comments = this.state.comments;
    var newComment = comments.concat([comment]);
    this.setState({comments: newComment});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {"comment": comment},
      success: function(data) {
        this._loadCommentsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="commentBox">
        <div className="row">
          <div className="small-8 small-centered columns">
            <h4>Got something to say?</h4>
            <CommentForm onCommentSubmit={this._handleCommentSubmit} />
            <CommentList comments={this.state.comments} />
          </div>
        </div>
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var comment = this.refs.comment.getDOMNode().value.trim();
    if (!comment || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, comment: comment});
    this.refs.author.getDOMNode().value = '';
    this.refs.comment.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" id="author" name="author" placeholder="Your name" ref="author" />
        <input type="text" id="comment" name="comment" placeholder="Say something..." ref="comment" />
        <input type="submit" value="Post" className="button small" />
      </form>
    );
  }
});

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

// Move this to the proper spot, as well as all the componenets
var Router = Backbone.Router.extend({
  message: '',
  routes: {
    "" : "index",
    "comments/:comment_id" : "view_comment"
  },
  index : function() {
    React.renderComponent(
      <CommentBox url="/comments.json" />,
      document.getElementById('comments')
    );
  },
  view_comment : function(comment_id) {
  	React.renderComponent(
  		<CommentView comment_id={comment_id} />,
  		document.getElementById('comments')
  	);
  }
});

var r = new Router();

Backbone.history.start();

