import React, { useEffect, useState } from "react";
import "../App.css";
import ProgramProgress from "../Components/Volunter-Comps/ProgramProgress";
// new
import AuthService from "../AuthService";
import TutorialDataService from "../Service";

function Progress() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    async function fetchPrograms() {
      const token = AuthService.getToken("authToken");
      const programsData = await TutorialDataService.getProgressPrograms(token);
      setPrograms(programsData.data);
    }

    fetchPrograms();
  }, [programs]);

  return (
    <div className="Progress">
      <div className="Progress-Title">
        <span>Progress</span>
      </div>

      <p className="grey-text">
        Track your progress and update them accordingly!
      </p>

      <h2>Your current Programs</h2>
      <div className="programs-container">
        <div className="Dashboard-programs">
          {programs &&
            programs.map((program) => (
              <ProgramProgress key={program._id} program={program} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Progress;
