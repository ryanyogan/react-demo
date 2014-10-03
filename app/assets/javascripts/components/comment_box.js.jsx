/** @jsx React.DOM */

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
