import React, { Component } from 'react'
import 'semantic-ui-react'
import Icon from 'semantic-ui-react'

class Paymentpage extends Component {
    
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
            return [];
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
            // this.setState({ bills_and_coins: bills_and_coins})
            // console.log(cash)

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
                <div className='bg' style={paymentBG}>
                    <div className="modal" style={paymentModal}>
                        <div className="content" style={paymentContent}>
                            <div className="conclusion">
                                <p style={ccsName}>You are buying ticket for " {this.props.name} ".</p>
                                <p style={ccsPrice}>
                                    <Icon className='payment'/>&nbsp;
                                    Total price is &nbsp;&nbsp;&nbsp;
                                    {this.props.total}&nbsp;&nbsp;&nbsp; Baht.
                                </p>
                                <div style={paymentInputBG}>
                                    <p style={paymentInputText}>Please tab your payment here:</p>
                                    <input style={paymentInput} type="number" 
                                    pattern="[0-9]" step="1" min="0" ref="paid" placeholder="0.00"/>
                                </div>
                            </div>
                        </div>
                    <button className="ui blue button" style={submitBTN}
                        onClick={this.ChangeCalculation}> 
                        <Icon className='money bill alternate'/>
                        Submit
                    </button>
                    <button class="ui red button" style={backBTN} 
                        onClick={this.props.onClose}> Back
                    </button>

                    {/* <EndProcessModal show={this.state.submit} bNc={this.state.bills_and_coins}
                        totalChange={this.state.total_change} numC={this.state.num_coins}
                        numB={this.state.num_bills} bills={this.state.bills}
                        coins={this.state.coins}
                    >
                    </EndProcessModal> */}
                </div>
            </div>
            )}
            </React.Fragment>
        )
    }
}