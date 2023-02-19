
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {

    // new line start
    let symptoms = "pain in leg and pain in left chest"
    function getDataSpecialties() {
        axios({
            method: "GET",
            url:`/departments?symptoms=${spacedTextToDashed(symptoms)}`,
        })
            .then((response) => {
                const res = response.data;
                const deptArray = res.departments
                const defArray = res.definitions
                console.log(deptArray);
                console.log(defArray);
        })}

    let department = "Internal Medicine"
    let location = "89451"
    function getDataDoctors() {
        axios({
            method: "GET",
            url:`/yelp-doctors?searchTerm=${department}&location=${location}`,
        })
            .then((response) => {
                const res = response.data.businesses;
                console.log(res);
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
                <p>To get your profile details: </p><button onClick={getDataSpecialties}>Specialites</button>
                <button onClick={getDataDoctors}>Doctors</button>
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

function spacedTextToDashed(text){
    let textSplit = text.split('');
    for(let i = 0; i<textSplit.length; i++){
        if(textSplit[i] === ' '){
            textSplit[i] = '_'
        }
    }
    let combinedText = textSplit.join();
    console.log(combinedText);
    return combinedText;
}
export default App;