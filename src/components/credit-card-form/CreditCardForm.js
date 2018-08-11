import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { css } from 'react-emotion';
import { BarLoader } from 'react-spinners';
import { LOADING, DONE_LOADING } from '../../actions/ActionTypes';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
class CreditCardForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName : '',
            creditCardNumber : '',
            cardType: 'Visa',
            expiryYear: '',
            expiryMonth: '',
            Ccv: '',
            cardIcon: "https://s3-us-west-2.amazonaws.com/ryde-bucket-oregon/icons/sample.png",
            error : false,
            isSubmitting: false,
            success : false,
            message: ''
        }
    }

    _handleFormSubmit = async () => {
        try {
            const { userName,creditCardNumber,expiry } = this.state;
            const { dispatch } = this.props;
            this.setState({isSubmitting: true, success: false, message: ''})
            if(this.state.error){
                return false;
            }
            console.log('this._validate()',this._validate());

            if(!this._validate()){
                return false
            }
            dispatch({ type: LOADING,payload: true })
            /**
             * SEND POST REQUEST TO API
             *
            const response = await (await axios.post('API_END_POINT', {
                headers: {
                    Authorization: localStorage.access_token
                }
            }));
           if(!response.data.error){
                this.setState({success: true , message: response.data.message});
           }
           **/
          setTimeout(()=>{
            dispatch({ type: DONE_LOADING ,payload: true })
            this.setState({success: true , message: 'Successfuly saved..!'});
          },2000);
        } catch (error) {
            this.props.dispatch({ type: DONE_LOADING ,payload: true })
            console.log('Error ',error.response.data.message);
        }
    }

    _handleCardNumberChange = (e) => {
        let cardNumber =e.target.value.replace("-","").replace("-","").replace("-","").replace("-","")
        let newCard = ''
        cardNumber.split("").forEach((element,index) => {
            if(index === 4 || index === 8 || index === 12 || index === 16 ){
                newCard = newCard +'-' + element ;
            }else{
                newCard = newCard + element;
            }
        });
        if(cardNumber.length <= 16){
            this.setState({ creditCardNumber: newCard, error: false },state=>{
                this._onChageCreditCardNumber()
            })
        }

    }

    _onChageCreditCardNumber = () =>{
        const { creditCardNumber } = this.state;
        const s3Link = "https://s3-us-west-2.amazonaws.com/ryde-bucket-oregon/icons/";
        if(creditCardNumber.charAt(0) == 3 &&  ((creditCardNumber.charAt(1) == 4 || creditCardNumber.charAt(1) == 7))){
          this.setState({cardType: 'American Express', error:false ,cardIcon: s3Link+"americanExpress.png" })
        }else if(creditCardNumber.charAt(0) == 6 && (creditCardNumber.charAt(2)== 0 || creditCardNumber.charAt(1) == 4 || creditCardNumber.charAt(1) == 5)){
          this.setState({cardType: 'Discover', error:false ,cardIcon: s3Link+"discover.png" })
        }else if(creditCardNumber.charAt(0) == 3 && (creditCardNumber.charAt(1) == 9 || creditCardNumber.charAt(1) == 0 || creditCardNumber.charAt(1) == 6 || creditCardNumber.charAt(1) == 8)){
          this.setState({cardType: 'JCB', error:false ,cardIcon: s3Link+"jcb.png" })
        }else if(creditCardNumber.charAt(0) == 3 &&  (creditCardNumber.charAt(1) == 4 || creditCardNumber.charAt(1) == 7 || creditCardNumber.charAt(1) == 8)){
          this.setState({cardType: 'Diners Club/ Carte Blanche' , error:false ,cardIcon: s3Link+"dccb.png"})
        }else if(creditCardNumber.charAt(0) == 4){
          this.setState({cardType: 'Visa' , error:false ,cardIcon: s3Link+"visa.png"})
        }else if(creditCardNumber.charAt(0) == 5 && (creditCardNumber.charAt(1) >= 1 && creditCardNumber.charAt(1) <= 5)){
          this.setState({cardType: 'Mastercard' , error:false ,cardIcon: s3Link+"mastercard.png"})
        }else {
          this.setState({cardType: '' ,cardIcon: "https://s3-us-west-2.amazonaws.com/ryde-bucket-oregon/icons/sample.png",error:true})
        }

      }

    _handleChangeExpireMonth = (e)=> {
        const month = e.target.value;
        if(month.length <= 2)
            this.setState({expiryMonth : e.target.value })
    }

    _handleChangeExpireYear = (e)=> {
        const month = e.target.value;
        if(month.length <= 4)
            this.setState({expiryYear :  e.target.value })
    }

    _handleCcv= (e) =>{
        if(e.target.value.length <= 4)
            this.setState({Ccv: e.target.value})
    }

    _validate = () => {
        if(!this.state.userName){
            this.setState({ error: true});
            return false;
        }else if(!this.state.creditCardNumber){
            this.setState({ error: true});
            return false;
        }else if(!this.state.expiryMonth){
            this.setState({ error: true});
            return false;
        }else if(!this.state.expiryYear){
            this.setState({ error: true});
            return false;
        }else if(!this.state.Ccv){
            this.setState({ error: true});
            return false;
        }else{
            this.setState({ error: false});
            return true;
        }
    }

    render(){
        console.log('this.state.error',this.state.error);
        return(
            <div className="row">
                <div className="col-sm-6">
                    <div className={(!this.state.userName && this.state.isSubmitting === true)? "form-group   has-error": "form-group"}>
                        <label>Name</label>
                        <input type="text" className="form-control"  placeholder="Name" onChange={(e)=> this.setState({userName: e.target.value}) } />
                    </div>
                    <div className={((this.state.creditCardNumber.length >= 2 && !this.state.cardType) || (!this.state.creditCardNumber && this.state.isSubmitting === true) )? "form-group  has-error" : " form-group "}>
                        <label>Card #</label>
                        <div className="row">
                            <div className="col-sm-8">
                                <input type="text" className="form-control " value={this.state.creditCardNumber}  placeholder="**** **** **** ****" onChange={this._handleCardNumberChange} />
                            </div>
                            <div className="col-sm-2">
                                <img width="50" src={this.state.cardIcon} />
                            </div>
                        </div>
                    </div>
                    <div className={
                        (this.state.expiryMonth.length > 1 && (parseInt(this.state.expiryMonth) > 12 ||
                        parseInt(this.state.expiryMonth) < 1 )) ||
                        (this.state.expiryYear.length > 3 &&
                        (parseInt(this.state.expiryYear) < 2017 ||
                        parseInt(this.state.expiryYear) > 2060 ) ||
                        ((!this.state.expiryMonth || !this.state.expiryYear) && this.state.isSubmitting)
                        ) ? "form-group has-error": "form-group" }>
                        <label>Expire</label>
                        <div className="row">
                            <div className="col-sm-3">
                                <input type="text" className="form-control text-right" value={this.state.expiryMonth} placeholder="MM" onChange={this._handleChangeExpireMonth} />
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control text-right" value={ this.state.expiryYear }  placeholder="YYYY" onChange={this._handleChangeExpireYear} />
                            </div>
                        </div>
                    </div>
                    <div className={(!this.state.Ccv && this.state.isSubmitting === true)? "form-group has-error" : "form-group"}>
                        <label>Ccv</label>
                        <div className="row">
                            <div className="col-sm-4">
                                <input type="text" className="form-control" value ={ this.state.Ccv} onChange={ this._handleCcv}  placeholder="****" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <BarLoader
                                className={override}
                                sizeUnit={"px"}
                                size={150}
                                color={'#123abc'}
                                loading={this.props.isLoading}
                                />
                        </div>
                        <br/>
                    </div>
                    <button disabled={ this.props.isLoading } onClick={()=> this._handleFormSubmit() } className="btn btn-default">Submit</button>
                    {
                        (this.state.success) &&
                        <div className="form-group">
                            <label></label>
                            <div className="alert alert-success" role="alert">{this.state.message}</div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.common.loading
    }
}
export default connect(mapStateToProps)(CreditCardForm)
