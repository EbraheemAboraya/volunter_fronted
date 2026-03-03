import React, { useEffect, useState } from "react";
import RequestsTable from "../Components/Org-Comps/RequestTable";
import AuthService from "../AuthService";
import TutorialDataService from "../Service";


function Requests() {
  const [adminData, setAdminData] = useState([]);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const token = AuthService.getToken("authToken");
    async function getAdminData() {
      try {
        const adminData = await TutorialDataService.getAdminData(token);
        setAdminData(adminData.data);

      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    }

    async function getAdminPrograms() {
      try {
        const programs = await TutorialDataService.getProgramstoVolunteers(token);
        if (programs.data !== false && programs.data.length !== 0){
          setPrograms(programs.data);
        }
        else{
          console.log("there is no progrmas for you");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    }



    getAdminPrograms();
    getAdminData();
  }, [adminData]);

  const rows = programs.map(program => ({
    programId:  program._id,
    name: program.name,
    status: "Active", 
    volunteersno: program.volunteersno,
    location: program.location,
    daterange: program.daterange,
    volunteers: program.volunteers.map(volunteer => ({
      volunteerId:volunteer._id,
      name: volunteer.name,
      status: volunteer.status,
      availability: volunteer.availability,
      location: volunteer.location,
      skils: volunteer.skils, 
      age: volunteer.age, 
      sex: volunteer.sex, 
    })),
  }));

  return (
    <div className="Dashboard">
      <div className="hey-section">
        <span>Requests</span>
      </div>

      <p className="grey-text">
        You can check which volunteer wants to participate in your program!
      </p>

      <div className="programs-header">
        <h2>Your Programs</h2>
        <h2 className="program-count">({programs.length})</h2>
      </div>
      <RequestsTable data={rows} />
    </div>
  );
}

export default Requests;
