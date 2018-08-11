import React, { Component } from 'react';
import CreditCardForm from '../components/credit-card-form/CreditCardForm';

export default class Home extends Component {
    constructor(props){
        super(props);
    }

    render (){
        return <CreditCardForm />
    }
}