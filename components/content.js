import React from 'react'
import '../static/styles/content.scss'
import Header from '../components/header'
import { Button, Icon} from 'semantic-ui-react'

class MovieContent extends React.Component {

    render() {
        return (
            <div><Header/>
            <div className="ui divided items">
                <div className="listBG">
                    {/* <div className="item">  */}
                        <div className="divImage">
                            <img className="listImage" src={this.props.obj.image} alt=""/>
                        </div>
                        <div className="content">
                            <p className="header" style={{marginTop: 2+'vmin'}}>{this.props.obj.name}</p>
                            <div className="meta" style={{marginTop: 3+'vmin'}}>
                                <span className="cinema">{this.props.obj.tagline}</span>
                            </div>
                            <div className="description">
                                <p>Price:&nbsp;&nbsp;&nbsp;&nbsp;{this.props.obj.price}&nbsp;&nbsp;&nbsp;Baht</p>
                                {/* <p>Available on:&nbsp;&nbsp;{this.props.obj.date}</p> */}
                            </div>
                            <div className="btn">
                                <Button className="ui right floated primary button">
                                    <div className="icon">
                                        <Icon className='cart'/>
                                    </div>
                                    Buy tickets
                                </Button>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
            </div>
        );
    }
}

export default MovieContent