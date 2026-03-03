import React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";

function VolunteerTable({ volunteers, onVolunteerClick }) {
  // console.log("VolnData:", volunteers);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left" sx={{ fontWeight: "bold" }}>
            Name
          </TableCell>
          <TableCell align="left" sx={{ fontWeight: "bold" }}>
            Status
          </TableCell>
          <TableCell align="left" colSpan={1} sx={{ fontWeight: "bold" }}>
            Availability
          </TableCell>
          <TableCell
            align="left"
            sx={{ paddingRight: "30px", fontWeight: "bold" }}
          >
            Location
          </TableCell>
          <TableCell
            align="left"
            sx={{ paddingRight: "55px", fontWeight: "bold" }}
          >
            Skils
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {volunteers.map((volunteer, index) => (
          <TableRow
            key={index}
            hover
            onClick={() => onVolunteerClick(volunteer)}
          >
            <TableCell>{volunteer.name}</TableCell>
            <TableCell>{volunteer.status}</TableCell>
            <TableCell>{volunteer.availability}</TableCell>
            <TableCell>{volunteer.location}</TableCell>
            <TableCell>{volunteer.skils}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

VolunteerTable.propTypes = {
  volunteers: PropTypes.array.isRequired,
};

export default VolunteerTable;
