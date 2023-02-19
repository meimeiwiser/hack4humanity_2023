

import React, { useState } from "react";
import axios from "axios";

function EnterSymptoms() {
    const [symptom, setSymptom] = useState("");
    const [providers, setProviders] = useState("");
    const [zip, setZip] = useState("");
    const [symptomList, setSymptomList] = useState([]);

    const handleSymptomChange = (event) => {
        setSymptom(event.target.value);
    };

    const handleProvidersChange = (event) => {
        setProviders(event.target.value);
    };

    const handleZipChange = (event) => {
        setZip(event.target.value);
    };

    const handleAddSymptom = () => {
        setSymptomList([...symptomList, symptom]);
        setSymptom("");
    };

    return (
        <div>
            <header>
                <nav>
                    <h1>HealthMatch</h1>
                </nav>
            </header>
            <main>
                <br />
                <section>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h2>Enter Symptoms</h2>
                        <fieldset>
              <span className="inputWrapper">
                <input
                    type="text"
                    name=""
                    id="add-symptoms"
                    placeholder="e.g. I have a headache, and my stomach hurts."
                    value={symptom}
                    onChange={handleSymptomChange}
                />
                <button type="button" onClick={handleAddSymptom}>
                  Add Symptom
                </button>
              </span>
                        </fieldset>

                        {symptomList.length > 0 && (
                            <ul>
                                {symptomList.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        )}

                        <br />

                        <fieldset>
              <span className="inputWrapper">
                <input
                    type="search"
                    name=""
                    id="add-providers"
                    placeholder="Enter a Care Provider"
                    list="provider-list"
                    value={providers}
                    onChange={handleProvidersChange}
                />
              </span>
                            <span className="inputWrapper">
                <input
                    type="text"
                    name=""
                    id="add-zip"
                    placeholder="Enter Zip Code"
                    value={zip}
                    onChange={handleZipChange}
                />
              </span>
                        </fieldset>

                        <datalist id="provider-list">
                            <option value="Sutter Health"></option>
                            <option value="Kaiser Permanente"></option>
                            <option value="Other"></option>
                        </datalist>

                        <button type="submit">Submit Information</button>
                    </form>
                </section>
            </main>
        </div>
    );
}

function getDataSpecialties(symptoms) {
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
export default EnterSymptoms;