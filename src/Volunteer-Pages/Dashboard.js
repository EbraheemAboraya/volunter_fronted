import React, { useEffect, useState } from "react";
import "../App.css";
import Program from "../Components/Volunter-Comps/Program";
// new
import AuthService from "../AuthService";
import TutorialDataService from "../Service";

function Dashboard() {
  const [programs, setPrograms] = useState([]);
  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchPrograms() {
      const token = AuthService.getToken("authToken");
      const programsData = await TutorialDataService.getVolunteerPrograms(
        token
      );

      setPrograms(programsData.data);
    }

    fetchPrograms();
  }, [programs]);

  useEffect(() => {
    async function getUserData() {

      const token = AuthService.getToken("authToken");
      const userData = await TutorialDataService.getUserData(token);

      setUserData(userData.data);
    }
    getUserData();
  }, [UserData]);

  return (
    <div className="Dashboard">
      <div className="hey-section">
        <span>👋 Hey {UserData.name}!</span>
      </div>
      <p className="grey-text">
        Browse volunteering organizations and start volunteering!
      </p>
      <h2>Available Programs</h2>
      <div className="programs-container">
        <div className="Dashboard-programs">
          {programs &&
            programs.map((program) => (
              <Program key={program._id} program={program} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
