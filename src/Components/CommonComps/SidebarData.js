import React from "react";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import ProgressIcon from "@mui/icons-material/AddchartOutlined";
import MessageIcon from "@mui/icons-material/SendOutlined";
import IndividualIcon from "@mui/icons-material/VolunteerActivismOutlined";
import AddProgramIcon from "@mui/icons-material/InsertChartOutlinedRounded";
import ProgramRequestIcon from "@mui/icons-material/MedicalInformationOutlined";

export const SidebarData = {
  user1: [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      link: "/dashboard",
    },
    {
      title: "Progress",
      icon: <ProgressIcon />,
      link: "/progress",
    },
    {
      title: "Messages",
      icon: <MessageIcon />,
      link: "/messages",
    },
    {
      title: "Individual",
      icon: <IndividualIcon />,
      link: "/individual",
    },
  ],
  user2: [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      link: "/dashboard",
    },
    {
      title: "Add Program",
      icon: <AddProgramIcon />,
      link: "/program",
    },
    {
      title: "Messages",
      icon: <MessageIcon />,
      link: "/messages",
    },
    {
      title: "Requests",
      icon: <ProgramRequestIcon />,
      link: "/requests",
    },
  ],
};
