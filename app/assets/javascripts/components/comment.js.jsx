/** @jsx React.DOM */

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
