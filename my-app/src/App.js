
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
                const questionArray = res.questions;
                console.log(deptArray);
                console.log(defArray);
                console.log(questionArray);
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
                res.map((bis) => (
                    console.log(bis.name + "-" + isDr(bis.name))
                ))
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
let drDict = ['MD', 'DO', 'DPM', 'DDS', 'DMD', 'DVM', 'DPT', 'DNP', 'PharmD', 'PsyD', 'AuD', 'DC', 'OD', 'PhD', 'DrPH', 'DSW', 'DNSc'];
function isDr(name){
    let spltTxt = name.split(" ")
    console.log(spltTxt);
    for (let i = 0; i<spltTxt.length; i++){
        for(let j = 0; j<drDict.length; j++){
            if(spltTxt[i]===drDict[j]){
                return "Dr"
            }
        }
    }
    return "Center"
}
export default App;