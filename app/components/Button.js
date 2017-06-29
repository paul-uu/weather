import React from 'react';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                type="button"
                className="btn"
                onClick={this.props.onClick} >
                { this.props.text }
            </button>
        )
    }
}