import '../static/styles/welcome.scss'
import { Button } from 'semantic-ui-react'
import logo from '../static/images/CinemaLogo.png'
import Background from '../components/Background'
import Router from 'next/router'

const handleClickToMainpage = () => Router.push({
    pathname: '/mainpage'
})

const App = () => (
    <div>
        <Background/>
        <div className="welcome">
            <h1>Movie Ticket Machine</h1>
            <img className="logo" src={logo} alt="" />
            <Button color="red" style={btn} onClick={() => handleClickToMainpage()}>
                Buy ticket
            </Button>
        </div>
    </div>
)

const btn = {
    display: "flex",
    flexDirection: "column",
    fontSize: "2vmin",
    marginTop: "24vh",
    marginLeft: "auto",
    marginRight: "auto"
}

export default App
