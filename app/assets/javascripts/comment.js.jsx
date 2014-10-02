/** @jsx React.DOM */

var HelloWorld = React.createClass({
  render: function() {
    return (
      <div className='HelloWorld'>
        Hello, World!
      </div>
    )
  };
});

var renderReact = function () {
  React.renderComponent(
    <HelloWorld />,
    document.getElementById('comments');
  );
};

$(document).ready(renderReact);
