import React from 'react'
import Header from '../../components/header.js'
import '../../static/styles/endprocesspage.scss'
import 'semantic-ui-react'
import { Input, Icon } from 'semantic-ui-react'
import axios from 'axios'
import { movie_name_forMailing, num_of_ticket_forMailing, movie_price_forMailing ,total_price_forMailing,
paid_forMailing, movie_image_forMailing } from './detailspage.js'

class Endprocesspage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            getInfo: false,
            email: '',
            detail01: '',
            detail02: '',
            detail03: '',
            detail04: '',
            detail05: '',
            MovieImg: ''
        }
        this.goMailing = this.goMailing.bind(this)
        this.Exit = this.Exit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.MailingTheDetails = this.MailingTheDetails.bind(this)
    }

    goMailing = () => {
        this.setState({ getInfo: true })
    }

    Exit() {
        this.setState({ getInfo: false })
        window.location.href = '/' 
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    async MailingTheDetails(e) {
        e.preventDefault()

        var { email, MovieImg, detail01, detail02, detail03, detail04, detail05} = this.state
        detail01 = this.refs.detail01.textContent
        detail02 = this.refs.detail02.textContent
        detail03 = this.refs.detail03.textContent
        detail04 = this.refs.detail04.textContent
        detail05 = this.refs.detail05.textContent
        MovieImg = this.refs.MovieImg.textContent

        await axios.post('http://localhost:3000/api/email', { email, MovieImg, detail01, detail02, detail03, detail04, detail05})
    }

    render() {
        return (
            <React.Fragment>
                {this.props.show && (
                <div className="backgroundEnd">
                    <Header/>
                    <div className="contentEnd">
                        <p className="thanks">Thank you for using our service.</p><hr/><br/>
                        <img className="conclusionImg" src={movie_image_forMailing} alt=""/><br/>
                        <p className="conclusion" ref="detail01">>>&nbsp;&nbsp;&nbsp;&nbsp;You bought&nbsp;&nbsp;&nbsp;{num_of_ticket_forMailing}
                            &nbsp;&nbsp;&nbsp;ticket(s)&nbsp;&nbsp;&nbsp;for&nbsp;&nbsp;&nbsp;"{movie_name_forMailing}".
                        </p><br/>
                        <p className="conclusion" ref="detail02">>>&nbsp;&nbsp;&nbsp;&nbsp;The price of this movie is&nbsp;&nbsp;&nbsp;
                            {movie_price_forMailing}&nbsp;&nbsp;&nbsp;baht per ticket.
                        </p><br/>
                        <p className="conclusion" ref="detail03">>>&nbsp;&nbsp;&nbsp;&nbsp;The total price is&nbsp;&nbsp;&nbsp;
                            {total_price_forMailing}&nbsp;&nbsp;&nbsp;and you paid&nbsp;&nbsp;&nbsp;{paid_forMailing}
                            &nbsp;&nbsp;&nbsp;baht.
                        </p><br/>
                        <p className="conclusion" ref="detail04">>>&nbsp;&nbsp;&nbsp;&nbsp;You will get&nbsp;&nbsp;&nbsp;
                            {this.props.totalChange}&nbsp;&nbsp;&nbsp;Baht for the change.
                        </p><br/>
                        <p className="conclusion" ref="detail05">>>&nbsp;&nbsp;&nbsp;&nbsp;There are&nbsp;&nbsp;{this.props.numB}
                            &nbsp;&nbsp;bills&nbsp;( {this.props.bills} )&nbsp;&nbsp;and&nbsp;&nbsp;
                            {this.props.numC}&nbsp;&nbsp;coins ( {this.props.coins} )&nbsp;&nbsp;for the change.
                        </p><br/>
                        <p className="imgSrc" ref="MovieImg" name="MovieImg">{movie_image_forMailing}</p>
                        <p className="bless">Have a great time!!!</p><hr/>
                        <button className="exitBTN" onClick={this.Exit}>
                            <Icon className='home' style={homeIcon}/>
                        </button>
                    </div>
                    <div className="MailingPart">
                        <p className="mailingtext">Get the ticket details to your Email here:</p>
                        <Input style={emailInput} name="email" 
                            type="email" placeholder="type your email here.." 
                            onChange={this.handleChange}    
                        />
                        <button className="getDetailBTN" 
                            onClick={this.MailingTheDetails}> Send Email
                        </button>
                    </div>  
                </div>
                )}
            </React.Fragment>
        )
    }
}

const emailInput = {
    position: 'relative',
    textAlign: 'center',
    marginLeft: '5vmin',
    marginTop: '2vmin',
    width: '40vmin',
    bottom: '1vmin'
}
const homeIcon = {
    marginRight: 'auto',
    marginLeft: 'auto',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: "2vw",
    height: "auto"
}

export default Endprocesspage