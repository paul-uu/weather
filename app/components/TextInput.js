var React = require('react');

class TextInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input type='text' placeholder={this.props.placeholder} onChange={this.props.onChange} />
        );
    }
}

module.exports = TextInput;