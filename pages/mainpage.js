import React from 'react'
import "../static/styles/mainpage.scss";
import Background from "../components/Background";
import { Menu, Dropdown, Button } from "semantic-ui-react";

class Mainpage extends React.Component {

    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { value, activeItem  } = this.state

        return (
            <div>
                <Background />
                <div>
                <div class="menuBar">
                    <Menu stackable style={menuBG}>
                        <Menu.Item>
                            <h3 class="movieIcon">MOVIES</h3>
                        </Menu.Item>
                        <Menu.Item style={gap}/>
                        <Dropdown
                            style={dropdownSearch}
                            placeholder="Search and select your movie"
                            fluid
                            search
                            selection
                            options={moviesSearch}
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
                <div class="moviesList">
                    <div class="listContainer">
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

var moviesSearch = [{
    text: 'Movie01',
    value: 'Movie01'
},{
    text: 'Movie02',
    value: 'Movie02'
},{
    text: 'Movie03',
    value: 'Movie03'
},{
    text: 'Movie04',
    value: 'Movie04'
}]
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