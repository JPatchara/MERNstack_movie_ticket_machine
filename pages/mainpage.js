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
            movieData: [],
            selection: false,
            listCount: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/get/ASCName')
        .then(response => {
            this.setState({ movieData: response.data })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onChangeName = (e, { value }) => {
        this.setState({ value: value })
        var selectionName = value
        console.log(selectionName)
        this.unsubscribe = axios.get('http://localhost:3000/api/get/movie/'+selectionName)
        .then(response => {
            this.setState({ movieData: [response.data] })
        })
        .catch(function (error) {
            console.log(error);
        })  
    }

    onChangeSortby = (e, { value }) => {
        this.setState({ value: value })
        var selectionSortby = value
        if (selectionSortby  === 'Price(Lower)') {
            this.unsubscribe = axios.get('http://localhost:3000/api/get/ASCPrice')
            .then(response => {
                this.setState({ movieData: response.data })
            })
            .catch(function (error) {
                console.log(error);
            })
        } else if (selectionSortby  === 'Price(Higher)') {
            this.unsubscribe = axios.get('http://localhost:3000/api/get/DESCPrice')
            .then(response => {
                this.setState({ movieData: response.data })
            })
            .catch(function (error) {
                console.log(error);
            })
        } else if (selectionSortby  === 'Date & Time(Older)') {
            this.unsubscribe = axios.get('http://localhost:3000/api/get/ASCDate')
            .then(response => {
                this.setState({ movieData: response.data })
            })
            .catch(function (error) {
                console.log(error);
            })
        } else if (selectionSortby  === 'Date & Time(Newer)') {
            this.unsubscribe = axios.get('http://localhost:3000/api/get/DESCDate')
            .then(response => {
                this.setState({ movieData: response.data })
            })
            .catch(function (error) {
                console.log(error);
            })
        } else if (selectionSortby  === 'none') {
            this.unsubscribe = axios.get('http://localhost:3000/api/get/ASCName')
            .then(response => {
                this.setState({ movieData: response.data })
            })
            .catch(function (error) {
                console.log(error);
            })
        } else {             
            this.unsubscribe = axios.get('http://localhost:3000/api/get/ASCName')
            .then(response => {
                this.setState({ movieData: [response.data] })
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }

    render() {
        const { value } = this.state

        return (
            <div className="mainpageBG">
                <Header/>
                    <header className="mainpageBar">
                        <ul>
                            <li>
                                <h3 className="movieIcon">MOVIES</h3>
                            </li>
                            <li>
                                <Dropdown
                                    style={dropdownSearch}
                                    placeholder="Search and select your movie"
                                    fluid
                                    search
                                    selection
                                    options={moviesName}
                                    value={value}
                                    onChange={this.onChangeName}
                                />
                            </li>
                            <li>
                                <Dropdown
                                    style={dropdownSort}
                                    placeholder="Sort by"
                                    fluid
                                    search
                                    selection
                                    options={sortOptions}
                                    value={value}
                                    onChange={this.onChangeSortby}
                                />
                            </li>
                        </ul>
                    </header>
                    <div className="moviesList">
                        <table className="listContainer">
                            <MovieContent data={this.state.movieData}/>
                        </table>
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

const dropdownSearch = {
    margin: "auto auto",
    width: "50vw",
    maxWidth: "70vw",
    height: "5vh",
    textAlign: "center",
    border: "dotted",
    fontSize: "2vmin"
}
const dropdownSort = {
    margin: "auto auto",
    width: "25vw",
    maxWidth: "50vw",
    height: "5vh",
    textAlign: "center",
    border: "dotted",
    fontSize: "2vmin"
}

export default Mainpage