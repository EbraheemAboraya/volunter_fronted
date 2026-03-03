import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { SidebarData } from "./SidebarData";
import Logo from "../../Pictures/logo.jpg";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";

function Sidebar({ isLoggedIn, userType, handleLogout }) {
  const [selectedOption, setSelectedOption] = useState("");
  const sidebarData = isLoggedIn ? (userType === "user1" ? SidebarData.user1 : SidebarData.user2) : [];
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    setSelectedOption(link);
    navigate(link);
  };

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <h1>Volunify</h1>
        </div>
        {sidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className={`row ${selectedOption === val.link ? "selected" : ""}`}
              onClick={() => handleNavigation(val.link)}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
        {isLoggedIn && (
          <li className="row logout" onClick={handleLogout}>
            <div id="icon">
              <LogoutIcon />
            </div>
            <div id="title">Logout</div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
