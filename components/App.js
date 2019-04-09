import Head from 'next/head'
import "../static/styles/welcome.scss";
import { Button } from "semantic-ui-react";
import logo from "../static/images/CinemaLogo.png";

const App = () => (
    <div class="background">
        <div class="welcome">
            <Head>
                <link
                    rel="stylesheet"
                    href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                />
            </Head>
            <h1>Movie Ticket Machine</h1>
            <img class="logo" src={logo} alt="" />
            <Button color="red" style={btn}>Buy ticket</Button>
        </div>
    </div>
);

const btn = {
    display: "flex",
    flexDirection: "column",
    fontSize: "2vmin",
    marginTop: "24vh",
    marginLeft: "auto",
    marginRight: "auto"
}

export default App;
