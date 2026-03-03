import React, { useEffect, useState } from "react";
import "../App.css";
import Program from "../Components/Volunter-Comps/Program";
import AuthService from "../AuthService";
import TutorialDataService from "../Service";

function Individual() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    async function fetchPrograms() {
      const token = AuthService.getToken("authToken");
      const programsData = await TutorialDataService.getVolIndividual(token);
      setPrograms(programsData.data);
    }

    fetchPrograms();
  }, [programs]);

 return (
    <div className="Progress">
      <div className="Progress-Title">
        <span>Individual</span>
      </div>

      <p className="grey-text">
        Volunteer Individually and help others achieve small tasks!
      </p>

      <h2>Available Programs</h2>
      <div>
        {" "}
        {programs && programs.map((program) => (
            <Program key={program._id} program={program} />
          ))}
      </div>
    </div>
  );
}

export default Individual;
