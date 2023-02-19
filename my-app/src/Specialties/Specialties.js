import React from "react";
import "./cards.css";
import "./specialties.js";

function SpecialtyRecommendations() {
  return (
    <div>
      <div className="vertical">
        <button className="specialties-back">Back</button>
      </div>
      <main>
        <section>
          <h1>Specialty Recommendations</h1>
          <hr />
        </section>
        <ul>
          <li>
            <h2>Orthopedic Surgeon</h2>
            <p>
              An orthopedic surgeon is a medical doctor who specializes in the
              diagnosis, treatment, and management of disorders and injuries
              related to the musculoskeletal system, which includes bones,
              joints, ligaments, tendons, muscles, and nerves.
            </p>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default SpecialtyRecommendations;
