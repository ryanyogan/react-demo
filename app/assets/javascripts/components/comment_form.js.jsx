/** @jsx React.DOM */

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
