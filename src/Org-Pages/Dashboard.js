import React, { useEffect, useState } from "react";
import "../App.css";
import CollapsibleTable from "../Components/Org-Comps/CollapsibleTable";
import AuthService from "../AuthService";
import TutorialDataService from "../Service";

function Dashboard() {
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
        const token = AuthService.getToken("authToken");
        const programs = await TutorialDataService.getAdminPrograms(token);
        if (programs.data !== false && programs.data.length !== 0) {
          setPrograms(programs.data);
        } else {
          console.log("there is no progrmas for you");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    }

    getAdminPrograms();
    getAdminData();
  }, [programs,adminData]);

  const rows = programs.map((program) => ({
    name: program.name,
    status: "Active",
    volunteersno: program.volunteersno,
    location: program.location,
    daterange: program.daterange,
    volunteers: program.volunteers.map((volunteer) => ({
      name: volunteer.name,
      status: volunteer.status,
      availability: volunteer.availability,
      location: volunteer.location,
      skils: volunteer.skils,
      reports: volunteer.reports.map((report) => ({
        date: new Date(report.createdAt).toLocaleDateString(),
        content: report.content,
      })),
    })),
  }));

  return (
    <div className="Dashboard">
      <div className="hey-section">
        <span>👋 Hey {adminData.fullName}!</span>
      </div>
      <p className="grey-text">
        Browse volunteering organizations and start volunteering!
      </p>
      <div className="programs-header">
        <h2>Your Programs</h2>
        <h2 className="program-count">({programs.length})</h2>{" "}
      </div>
      <CollapsibleTable data={rows} type={1} />{" "}
    </div>
  );
}

export default Dashboard;
