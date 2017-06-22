var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');

require('./styles/main.scss');
//require("!style-loader!css-loader!sass-loader!./styles/main.scss");

ReactDOM.render(<App />, document.getElementById('app'));