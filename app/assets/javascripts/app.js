/** @jsx React.DOM */

var token = $('meta[name="csrf-token"]').attr('content');

$.ajaxSetup({
  beforeSend: function(xhr) {
    xhr.setRequestHeader('X-CSRF-Token', token);
  }
});

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

