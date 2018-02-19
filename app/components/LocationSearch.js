import React from 'react';
import Noty from 'noty';
import Button from './Button';
import TextInput from './TextInput';

export default class LocationSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zipCode: null
    }
  }

  returnZipCode() {
    if (this.isValidZipCode( this.state.zipCode )) {
      this.props.onClick(this.state.zipCode);
    }
  }

  isValidZipCode(zipCode) {
    if ( zipCode && zipCode.length === 5 && (typeof parseInt(zipCode, 10) === 'number') ) {
      return true;
    }
    else {
      new Noty({
        type: 'warning',
        layout: 'topCenter',
        theme: 'mint',
        text: 'Please enter a valid Zip Code',
        timeout: 2500,
        progressBar: true,
        closeWith: 'click'
      }).show();
    }
  }

  handleInputChange(e) {
    this.setState({ zipCode: e.target.value })
  }

  render() {
    return (
      <span className='locationSearch'>
        <TextInput placeholder={'Zip Code'} onChange={this.handleInputChange.bind(this)} />
        <Button text={'Search'} onClick={this.returnZipCode.bind(this)} />
      </span>
    );
  }
}
