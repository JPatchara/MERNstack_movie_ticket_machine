import React from 'react'
import '../static/styles/mainpage.scss'
import Header from '../components/header'
import MovieContent from '../components/content'
import { Menu, Dropdown } from 'semantic-ui-react'
import axios from 'axios'

class Mainpage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            movieData: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3000/api/get/ASCName')
        .then(response => {
            this.setState({ movieData: response.data })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    moviesListing(){
        return this.state.movieData.map(function(object, i){
            return <MovieContent obj={object} key={i}/>
        })
    }

    render() {
        const { value } = this.state

        return (
            <div className="backgroundMP">
                <Header />
                <div>
                    <div className="menuBar">
                        <Menu stackable style={menuBG}>
                            <Menu.Item>
                                <h3 className="movieIcon">MOVIES</h3>
                            </Menu.Item>
                            <Menu.Item style={gap}/>
                            <Dropdown
                                style={dropdownSearch}
                                placeholder="Search and select your movie"
                                fluid
                                search
                                selection
                                options={moviesName}
                                value={value}
                                // onChange={this.onChangeName}
                            />
                            <Menu.Item/>
                            <Menu.Item style={gap}/>
                            <Dropdown
                                style={dropdownSort}
                                placeholder="Sort by"
                                fluid
                                search
                                selection
                                options={sortOptions}
                                value={value}
                                // onChange={this.onChangeName}
                            />
                            <Menu.Item style={gap}/>
                        </Menu>
                    </div>
                    <div className="moviesList">
                        <table className="listContainer">
                            {this.moviesListing()}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

var moviesSearch = []
var moviesName = []
axios.get('http://localhost:3000/api/get/moviesName')
.then(response => {
    moviesSearch = response.data
    moviesSearch.forEach(function(object, i) {
        console.log(object.name)
        moviesName[i] = {text:object.name, value:object.name}
    })
})
.catch(function (error) {
    console.log(error);
})

const sortOptions = [{
    text: 'Date & Time(Older)',
    value: 'Date & Time(Older)'
},{
    text: 'Date & Time(Newer)',
    value: 'Date & Time(Newer)'
},{
    text: 'Price(Lower)',
    value: 'Price(Lower)'
},{
    text: 'Price(Higher)',
    value: 'Price(Higher)'
},{
    text: 'none',
    value: 'none'
}]

const menuBG = {
    backgroundColor: "dimgray"
}
const gap = {
    visibility: "hidden"
}
const dropdownSearch = {
    display: "table-cell",
    margin: "auto auto",
    width: "50vw",
    maxWidth: "70vw",
    height: "5vh",
    textAlign: "center",
    border: "dotted"
}
const dropdownSort = {
    display: "table-cell",
    margin: "auto auto",
    width: "25vw",
    maxWidth: "50vw",
    height: "5vh",
    textAlign: "center",
    border: "dotted"
}

export default Mainpage