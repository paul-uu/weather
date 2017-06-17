var React = require('react');

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <label>
                <input 
                    type='checkbox'
                    value={this.props.value} 
                    checked={this.props.checked}
                    onChange={this.props.onChange} />
                {this.props.label}
            </label>
        )
    }
}
module.exports = Checkbox;