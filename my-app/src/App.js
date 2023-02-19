import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {

    // new line start
    const [profileData, setProfileData] = useState(null)

    function getData() {
        axios({
            method: "GET",
            url:"http://127.0.0.1:5000/yelp-doctors",
        })
            .then((response) => {
                const res = response.data
                console.log(res)
        })}
    //end of new line

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

                {/* new line start*/}
                <p>To get your profile details: </p><button onClick={getData}>Click me</button>
                {profileData && <div>
                    <p>Profile name: {profileData.profile_name}</p>
                    <p>About me: {profileData.about_me}</p>
                </div>
                }
                {/* end of new line */}
            </header>
        </div>
    );
}

export default App;