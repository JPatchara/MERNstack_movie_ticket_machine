import React from 'react'
import '../static/styles/detailspage.scss'
import Header from '../components/header'
import { Icon } from 'semantic-ui-react'
import axios from 'axios'
import Router from 'next/router'

class Detailspage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            totalPrice: 0,
            checkOut: false,
            movie_name: props.name
        }
        this.doDecrement = this.doDecrement.bind(this)
        this.doIncrement = this.doIncrement.bind(this)
        this.goCheckOut = this.goCheckOut.bind(this)
    }

    doDecrement() {
        if(this.state.value > 0) {
            this.setState({ value: this.state.value - 1 })
            this.setState({ totalPrice: (this.state.value-1)*this.props.price })      
        }
    }

    doIncrement() {
        this.setState({ value: this.state.value + 1 })
        this.setState({totalPrice: (this.state.value+1)*this.props.price})
    }

    goCheckOut = () => {
        if(this.state.value > 0) {
            this.setState({ checkOut: true })

            movie_name_forMailing = this.state.movie_name
            movie_price_forMailing = this.props.price
            movie_image_forMailing = this.props.image
            num_of_ticket_forMailing = this.state.value
            total_price_forMailing = this.state.totalPrice
        } else {
            window.confirm("Please choose number of your ticket.")
        }
    }

    handleClickToMainpage() { 
        Router.push({ pathname: '/mainpage' })
    }

    render() {

        return (
            <div className="backgroundDT">
                <Header />
                <div className="contentDT"><hr/>
                    {/* <div className="content" style={content}> */}
                        <div className="divImg">
                            <img className="imgStyle" src={this.props.image} alt=""/>
                        {/* </div> */}
                        <Header style={NameHeader}>{this.props.name}</Header>
                        <p className="Tagline" >{this.props.tagline}</p>
                        <p className="Price" >Price:&nbsp;&nbsp;&nbsp;{this.props.price}&nbsp;&nbsp;&nbsp;Baht</p>
                        <div className="NumTicket">
                            <h4 className="numText" >Number of ticket :</h4>
                            <div className="numInput">
                                <button className="minusBtn" onClick={this.doDecrement} className="fa fa-minus fa-inverse fa-2x">
                                    <Icon className='minus'/>
                                </button>
                                <input className="num" type="text" value={this.state.value}></input>
                                <button className="plusBtn" onClick={this.doIncrement} className="fa fa-plus fa-inverse fa-2x">
                                    <Icon className='plus'/>
                                </button>
                            </div>
                        </div>
                        <div>
                            <p className="Total">Total price:&nbsp;&nbsp;&nbsp;
                            {this.state.totalPrice}&nbsp;&nbsp;&nbsp;
                            </p>
                        </div>
                    </div>
                    <button className="ui blue button" id="okBTN" onClick={this.goCheckOut}> 
                        <Icon className='money bill alternate' style={tagIcon}/>
                        Checkout
                    </button>
                    <button className="ui red button" id="cancelBTN" 
                        onClick={this.handleClickToMainpage}>Cancel
                    </button>
                </div>
            </div>
      )
    }
}

const NameHeader = {
    position: 'relative',
    left: '32vmin',
    bottom: '34vmin',
    fontSize: '3.2vmin'
}
const tagIcon = {
    marginRight: '2vmin'
}

export default Detailspage