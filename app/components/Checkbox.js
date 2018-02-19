import React from 'react';

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <label>
        <input 
          type='checkbox'
          name={this.props.name}
          checked={this.props.checked}
          onChange={this.props.onChange} />
        {this.props.label}
      </label>
    )
  }
}