import React from 'react'
import '../static/styles/content.scss'
import { Icon } from 'semantic-ui-react'
import Detailspage from '../pages/sections/detailspage.js'

class MovieContent extends React.Component {

    constructor(props) {
        super(props)
        this.state = { showModal: 0 }
    }

    getModalDT = value => {
        this.setState({ showModal: value });
    }
    
    hideModalDT = value => {
        this.setState({ showModal: 0 });
    }

    render() {
        return (
            <div>
                {this.props.data.map((data, id) => (
                    <div key={id+1} className="listBG">
                        <div className="divImage">
                            <div className="borderImage">
                                <img className="listImage" ref="image" src={data.image} alt=""/>
                                <span/><span/><span/><span/>
                            </div>
                        </div>
                        <div className="content">
                            <div className="name" ref="name">{data.name}</div>
                            <div className="tagline">
                                <p ref="tagline">{data.tagline}</p>
                            </div>
                            <div className="priceNdate">
                                <p ref="price">Price:&nbsp;&nbsp;&nbsp;&nbsp;{data.price}&nbsp;&nbsp;&nbsp;Baht</p>
                                <p ref="date">Available on:&nbsp;&nbsp;{data.date}</p>
                            </div>
                        </div>
                        <div className="wrapBTN">
                            <button className="btn" onClick={() => this.getModalDT(id+1)}>
                                <Icon className='cart' style={icon}/>
                                Buy tickets
                            </button>
                        </div>
                        <Detailspage
                            show={this.state.showModal === id+1}
                            onHide={() => this.hideModalDT(id+1)}
                            name={data.name} image={data.image}
                            tagline={data.tagline}
                            price={data.price}
                        />
                    </div>
                ))}
            </div>
        )
    }
}

const icon = {
    marginRight: "2vmin",
    marginBottom: "1vmin",
    width: "1vw",
    height: "auto"
}

export default MovieContent