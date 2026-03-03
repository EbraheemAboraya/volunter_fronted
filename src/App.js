import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./Components/CommonComps/sidebar";
import Topbar from "./Components/CommonComps/Topbar";
import LoginPage from "./Authentication-Pages/LoginPage";
import RegisterPage from "./Authentication-Pages/RegisterPage";

import VolunteerDashboard from "./Volunteer-Pages/Dashboard";
import VolunteerProgress from "./Volunteer-Pages/Progress";
import VolunteerIndividual from "./Volunteer-Pages/Individual";
import ChatHomePage from "./pages/ChatHome/Home";


import OrganizationDashboard from "./Org-Pages/Dashboard";
import AddProgram from "./Org-Pages/AddProgram";
import Requests from "./Org-Pages/Requests";
// new
import AuthService from "./AuthService";
import TutorialDataService from "./Service";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = AuthService.getToken("authToken");
    if (token !== "undefined" && token !== null) {

      getUserData(token);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const token = AuthService.getToken("authToken");
      if (token !== "undefined" && token !== null) {
        AuthService.setToken(token);
      }
    }
  }, [isLoggedIn]);

  const getUserData = async (token) => {
    try {

      const userData = await TutorialDataService.getUserData(token);

      if (userData.data.role === "volunteer") {
        const UserImage = await TutorialDataService.getUserImage(
          token,
          userData.data.id,
          userData.data.role
        );
        setIsLoggedIn(true);
        setUserType("user1");
        setUserInfo({
          username: userData.data.userName,
          displayName: userData.data.name,
          profilePic: UserImage,
        });
      } else if (userData.data.role === "admin") {
        const UserImage = await TutorialDataService.getUserImage(
          token,
          userData.data.id,
          userData.data.role
        );
        setIsLoggedIn(true);
        setUserType("user2");
        setUserInfo({
          username: userData.data.userName,
          displayName: userData.data.name,
          profilePic: UserImage,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = async () => {
    AuthService.removeToken("authToken");
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  const handleLogin = async (username, passwrd) => {
    try {
      const token = await TutorialDataService.login(username, passwrd);
      if (token.data !== false) {
        AuthService.setToken(token.data.token);

        getUserData(token.data.token);
      } else {
        console.log("User entered incorrect login information");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Sidebar
            isLoggedIn={isLoggedIn}
            userType={userType}
            handleLogout={handleLogout}
          />
          <div className="main-content">
            <Topbar {...userInfo} />
            <Routes>
              {userType === "user1" && (
                <>
                  <Route path="/" element={<VolunteerDashboard />} />
                  <Route path="/dashboard" element={<VolunteerDashboard />} />
                  <Route path="/progress" element={<VolunteerProgress />} />
                  <Route path="/messages" element={<ChatHomePage />} />

                  

                  <Route path="/individual" element={<VolunteerIndividual />} />
                </>
              )}
              {userType === "user2" && (
                <>
                  <Route path="/" element={<OrganizationDashboard />} />
                  <Route
                    path="/dashboard"
                    element={<OrganizationDashboard />}
                  />
                  <Route path="/messages" element={<ChatHomePage />} />
                  <Route path="/program" element={<AddProgram />} />
                  <Route path="/requests" element={<Requests />} />
                </>
              )}
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
