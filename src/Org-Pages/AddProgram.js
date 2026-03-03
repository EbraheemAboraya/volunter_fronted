import React from "react";
import "../App.css";
import CreateProgramForm from "../Components/Org-Comps/CreateProgram";

function AddProgram() {
  return (
    <div className="Dashboard">
      <div className="hey-section">
        <span>Add your program</span>
      </div>

      <p className="grey-text">
        We will do our best to find volunteers for your need!
      </p>
      <CreateProgramForm />
    </div>
  );
}

export default AddProgram;
