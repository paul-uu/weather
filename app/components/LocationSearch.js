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
        let zipCode = parseInt(this.state.zipCode, 10);
        if ( this.isValidZipCode(zipCode) )
            this.props.onClick(zipCode);
    }

    isValidZipCode(zipCode) {
        if ((typeof zipCode === 'number') && (zipCode.toString().length === 5)) {
            return true;
        }    
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
