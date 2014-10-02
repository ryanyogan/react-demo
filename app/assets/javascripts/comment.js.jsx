/** @jsx React.DOM */

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
          {this.props.comment}
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.comments.map(function(comment, index) {
      return (
        <Comment author={comment.author} comment={comment.comment} key={index} />
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var renderReact = function() {
  var fakeComments = [
    { author: "Ryan", comment: "This is a comment." },
    { author: "Moose", comment: "This is *another* comment" }
  ];

  React.renderComponent(
    <CommentList comments={fakeComments} />,
    document.getElementById('comments')
  );
};

$(document).ready(renderReact);
