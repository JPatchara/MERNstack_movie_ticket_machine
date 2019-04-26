import React from 'react'
import '../static/styles/content.scss'
import Header from '../components/header'
import { Button, Icon} from 'semantic-ui-react'
import Router from 'next/router'

class MovieContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.handleClickToDetailspage = this.handleClickToDetailspage.bind(this)
    }

    handleClickToDetailspage() { 
        Router.push({ pathname: '/detailspage' })
    }

    render() {
        return (
            <div>
                {this.props.data.map(data => (
                    <tbody className="listBG" key={data.id}>
                        <th className="divImage">
                            {/* <img className="listImage" src={this.props.obj.image} alt=""/> */}
                            <img className="listImage" src={data.image} alt=""/>
                        </th>
                        <th className="content">
                            {/* <tr className="name">{this.props.obj.name}</tr> */}
                            <tr className="name">{data.name}</tr>
                            <tr className="tagline">
                                {/* <span className="cinema">{this.props.obj.tagline}</span> */}
                                <span className="cinema">{data.tagline}</span>
                            </tr>
                            <tr className="priceNdate">
                                {/* <p>Price:&nbsp;&nbsp;&nbsp;&nbsp;{this.props.obj.price}&nbsp;&nbsp;&nbsp;Baht</p> */}
                                <p>Price:&nbsp;&nbsp;&nbsp;&nbsp;{data.price}&nbsp;&nbsp;&nbsp;Baht</p>
                                {/* <p>Available on:&nbsp;&nbsp;{this.props.obj.date}</p> */}
                            </tr>
                        </th>
                        <th className="wrapBTN">
                            <tr className="btn">
                                <Button className="ui right floated primary button" style={btn} onClick={this.handleClickToDetailspage}>
                                    <Icon className='cart' style={icon}/>
                                    Buy tickets
                                </Button>
                            </tr>
                        </th>
                    </tbody>
                ))}
            </div>
        )
    }
}

const icon = {
    marginRight: "0.7vmin",
    marginBottom: "1vmin",
    width: "1vw",
    height: "auto"
}
const btn ={
    width: "10vw",
    height: "5.5vh",
    fontSize: "1.8vmin"
}

export default MovieContent