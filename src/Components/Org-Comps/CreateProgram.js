import React, { useState } from "react";
import { FormControl, Input, Select, styled } from "@mui/material";
import AuthService from "../../AuthService";
import TutorialDataService from "../../Service";
const token = AuthService.getToken("authToken");

const StyledFormControl = styled(FormControl)`
  margin-bottom: 20px;

  & label {
    color: #333;
    font-weight: bold;
  }

  & input {
    width: 325px;
    height: 40px;
    padding: 8px;
    border: none;
    border-radius: 10px;
    outline: none;
    border-bottom: none; /* Remove underline */

    &:focus {
      border-color: #007bff;
    }
  }

  & input[type="file"] {
    width: auto;
    padding: 8px 10px;
    border: none;
    outline: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 4px;
  }

  & .date-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 5px;
  }
`;

const FormLabel = styled("label")`
  display: block;
  margin-bottom: 5px;
`;

const Button = styled("button")`
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const FormContainer = styled("div")`
  background-color: white;
  border-radius: 30px;
  padding: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  margin-top: 26px;
  width: 70%;
  height: 85%;
`;

const SpaceBetweenInputs = styled("div")`
  display: flex;
  gap: 200px; /* Adjust the gap as needed */
  text-decoration: none !important;
`;

const FormTitle = styled("h2")`
  text-align: center;
  margin-bottom: 25px;
`;

const WideSelect = styled(Select)`
  width: 203px; /* Adjust width as needed */
  margin-right: 138px;
`;

function CreateProgramForm() {
  const [startDateMonth, setStartDateMonth] = useState("");
  const [startDateDay, setStartDateDay] = useState("");
  const [startDateYear, setStartDateYear] = useState("");

  const [endDateMonth, setEndDateMonth] = useState("");
  const [endDateDay, setEndDateDay] = useState("");
  const [endDateYear, setEndDateYear] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [programName, setProgramName] = useState("");

  const [description, setProgramDescription] = useState(null);
  const [maxVolunteer, setVolunteers] = useState("");
  const [address, setLocation] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleProgramNameChange = (event) => {
    setProgramName(event.target.value);
  };

  const handleProgramDescriptionChange = (event) => {
    setProgramDescription(event.target.value);
  };

  const handleVolunteersChange = (event) => {
    setVolunteers(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("programName", programName);
    formData.append("selectedFile", selectedFile);
    formData.append(
      "startDate",
      `${startDateYear}-${startDateMonth}-${startDateDay}`
    );
    formData.append("endDate", `${endDateYear}-${endDateMonth}-${endDateDay}`);
    formData.append("description", description);
    formData.append("maxVolunteer", maxVolunteer);
    formData.append("address", address);

    try {
    const token = AuthService.getToken("authToken");
      const response = await TutorialDataService.createProgram(formData, token);
      console.log("Program created successfully:", response.data);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  const handleStartDateMonthChange = (event) => {
    setStartDateMonth(event.target.value);
    setStartDateDay("");
    setStartDateYear("");
  };

  const handleEndDateMonthChange = (event) => {
    setEndDateMonth(event.target.value);
    setEndDateDay("");
    setEndDateYear("");
  };

  const generateDays = (month, selectedMonth, selectedDay) => {
    if (selectedMonth === "") {
      return [
        <option key="day" value="">
          Day
        </option>,
      ];
    }

    const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return days;
  };

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <FormContainer>
      <FormTitle>Create Program Form</FormTitle>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "20px" }}>
          <SpaceBetweenInputs>
            <StyledFormControl>
              <FormLabel htmlFor="programName">Program Name</FormLabel>
              <Input
                id="programName"
                placeholder="Enter program name"
                value={programName}
                onChange={handleProgramNameChange}
                required
              />
            </StyledFormControl>
            {/* Other input fields */}
          </SpaceBetweenInputs>
          <SpaceBetweenInputs>
            <StyledFormControl>
              <FormLabel htmlFor="programDescription">
                Program Description
              </FormLabel>
              <Input
                id="programDescription"
                placeholder="Max 10 characters"
                inputProps={{ maxLength: 10 }} // Set maxLength here
                onChange={handleProgramDescriptionChange}
                required
              />
            </StyledFormControl>
            <StyledFormControl>
              <FormLabel htmlFor="programImage">
                Add Picture for your program
              </FormLabel>
              <Input
                type="file"
                id="programImage"
                accept="image/*"
                onChange={handleFileChange}
              />
              {selectedFile && <p>{selectedFile.name}</p>}
            </StyledFormControl>
          </SpaceBetweenInputs>
        </div>
        <SpaceBetweenInputs>
          <StyledFormControl>
            <FormLabel htmlFor="volunteers">Number of Volunteers</FormLabel>
            <Input
              id="volunteers"
              type="number"
              required
              min={1}
              onChange={handleVolunteersChange}
              onBlur={(e) => {
                if (e.target.value < 1) {
                  e.target.setCustomValidity(
                    "Volunteers number must be greater than 0"
                  );
                } else {
                  e.target.setCustomValidity("");
                }
              }}
            />
          </StyledFormControl>
          <StyledFormControl>
            <FormLabel htmlFor="location">Location</FormLabel>
            <Input
              id="location"
              placeholder="Enter location"
              onChange={handleLocationChange}
              required
            />
          </StyledFormControl>
        </SpaceBetweenInputs>
        <div className="date-container">
          <FormLabel htmlFor="startDate">Start Date</FormLabel>
          <WideSelect
            native
            id="startDateMonth"
            value={startDateMonth}
            onChange={handleStartDateMonthChange}
            required
          >
            <option value="">Month</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </WideSelect>
          <WideSelect
            native
            id="startDateDay"
            value={startDateDay}
            onChange={(e) => setStartDateDay(e.target.value)}
            required
          >
            <option value="">Day</option>
            {startDateMonth &&
              generateDays(startDateMonth, startDateMonth, startDateDay)}
          </WideSelect>
          <WideSelect
            native
            id="startDateYear"
            value={startDateYear}
            onChange={(e) => setStartDateYear(e.target.value)}
            required
          >
            <option value="">Year</option>
            {years}
          </WideSelect>
        </div>
        <div className="date-container">
          <FormLabel htmlFor="endDate">End Date</FormLabel>
          <WideSelect
            native
            id="endDateMonth"
            value={endDateMonth}
            onChange={handleEndDateMonthChange}
            required
          >
            <option value="">Month</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </WideSelect>
          <WideSelect
            native
            id="endDateDay"
            value={endDateDay}
            onChange={(e) => setEndDateDay(e.target.value)}
            required
          >
            <option value="">Day</option>
            {endDateMonth &&
              generateDays(endDateMonth, endDateMonth, endDateDay)}
          </WideSelect>
          <WideSelect
            native
            id="endDateYear"
            value={endDateYear}
            onChange={(e) => setEndDateYear(e.target.value)}
            required
          >
            <option value="">Year</option>
            {years}
          </WideSelect>
        </div>
        <Button type="submit">Create Program</Button>
      </form>
    </FormContainer>
  );
}

export default CreateProgramForm;
