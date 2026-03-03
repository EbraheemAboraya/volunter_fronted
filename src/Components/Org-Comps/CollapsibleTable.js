import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Row from "./ProgramsTable";

export default function CollapsibleTable({ data, type }) {
  // console.log("COLData:", data);
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "90%", marginTop: "2%", maxHeight: "70vh" }}
    >
      <Table aria-label="collapsible table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Program Name
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Status
            </TableCell>
            <TableCell align="right" colSpan={1} sx={{ fontWeight: "bold" }}>
              Volunteers No.
            </TableCell>
            <TableCell
              align="right"
              sx={{ paddingRight: "30px", fontWeight: "bold" }}
            >
              Location
            </TableCell>
            <TableCell
              align="right"
              sx={{ paddingRight: "55px", fontWeight: "bold" }}
            >
              Date Range
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflowY: "auto" }}>
          {data.map((row, index) => (
            <Row key={index} data={row} type={0} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
