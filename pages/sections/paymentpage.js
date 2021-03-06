import React from 'react'
import Header from '../../components/header.js'
import '../../static/styles/paymentpage.scss'
import 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import Endprocesspage from './endprocesspage.js'

var paid_forMailing = 0

class Paymentpage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            submit: false,
            bills_and_coins: [],
            total_change: 0,
            num_coins: 0,
            num_bills: 0,
            bills: [],
            coins: []
        }
        this.ChangeCalculation = this.ChangeCalculation.bind(this)
        this.AmountToChange = this.AmountToChange.bind(this)
    }

    AmountToChange(amount, change) {
        if(amount === 0) {
            return []
        } else {
            if(amount >= change[0]) {
                var left = (amount - change[0])
                return [change[0]].concat( this.AmountToChange(left, change) )
            } else {
                change.shift()
                return this.AmountToChange(amount, change)
            }
        }
    }

    ChangeCalculation() {
        var paid = this.refs.paid.value
        paid_forMailing = paid
        var total_price = this.props.total
        var changes = 0
        var cash = []
        var numCoins = 0
        var numBills = 0
        var bill= []
        var coin= []
        
        if(paid < total_price) {
            window.alert("Please put more money for the payment.")
        } else {
            // find the total change
            this.setState({total_change: paid - total_price})
            changes = paid - total_price
            // find number of bills and coins for the change
            this.setState({bills_and_coins: this.AmountToChange(this.state.total_change, [1000, 500, 100, 50, 20, 10, 5, 2, 1])})
            cash = this.AmountToChange(changes, [1000, 500, 100, 50, 20, 10, 5, 2, 1])

            for(let i = 0; i < cash.length; i++) {

                if(cash[i] < 20) {

                    numCoins = numCoins + 1
                    if (numCoins === 1) {
                        coin[numCoins] = cash[i]
                    } else { coin[numCoins] = ", "+cash[i] }

                } else if(cash[i] >= 20) {

                    numBills += 1
                    if (numBills === 1) {
                        bill[numBills] = cash[i]
                    } else { bill[numBills] = ", "+cash[i] }

                }
            }
            this.setState({num_coins: numCoins })
            this.setState({num_bills: numBills })
            this.setState({bills: bill })
            this.setState({coins: coin })
        }

        if(paid >= total_price) {
            this.setState({ submit: true })
        } else {
            window.alert("Please put more money for the payment.")
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.show && (
                <div className="backgroundPM">
                    <Header />
                    <div className="contentPM">
                        <p className="ccsName">You are buying ticket for " {this.props.name} ".</p>
                        <p className="ccsPrice">
                            <Icon className='payment'/>&nbsp;
                            Total price is &nbsp;&nbsp;&nbsp;
                            {this.props.total}&nbsp;&nbsp;&nbsp; Baht.
                        </p>
                        <div className="paymentInputBG">
                            <p className="paymentInputText">Please tab your payment here:</p>
                            <input className="paymentInput" type="number" 
                            pattern="[0-9]" step="1" min="0" ref="paid" placeholder="0.00"/>
                        </div>
                        <button className="submitBTN" onClick={this.ChangeCalculation}> 
                            <Icon className='money bill alternate'/>
                            Submit
                        </button>
                        <button class="backBTN" onClick={this.props.onHide}>Back</button>
                    </div>
                    <Endprocesspage show={this.state.submit} bNc={this.state.bills_and_coins}
                        totalChange={this.state.total_change} numC={this.state.num_coins}
                        numB={this.state.num_bills} bills={this.state.bills}
                        coins={this.state.coins}
                    />
                </div>
                )}
            </React.Fragment>
        )
    }
}

export default Paymentpage