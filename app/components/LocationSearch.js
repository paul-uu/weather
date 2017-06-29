import React from 'react';
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
        if ( zipCode.length === 5 && (typeof parseInt(zipCode, 10) === 'number') )
            return true;
    }

    handleInputChange(e) {
        this.setState({ zipCode: e.target.value })
    }

    render() {
        return (
            <div className='locationSearch'>
                <TextInput placeholder={'Zip Code'} onChange={this.handleInputChange.bind(this)} />
                <Button text={'Search'} onClick={this.returnZipCode.bind(this)} />
            </div>
        );
    }
}
