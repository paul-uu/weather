import React from 'react';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input type='text' placeholder={this.props.placeholder} onChange={this.props.onChange} />
        );
    }
}
