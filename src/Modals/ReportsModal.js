import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function ReportModal({ open, onClose, volunteer }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: "80vh", // Set maximum height
          overflowY: "auto", // Enable vertical scrolling
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 8,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Volunteer Report
        </Typography>
        {volunteer ? (
          <div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <strong>Name:</strong> {volunteer.name}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <strong>Last Report:</strong> {volunteer.lastreport}
            </Typography>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Reports:
            </Typography>
            {volunteer.reports && volunteer.reports.length > 0 ? (
              volunteer.reports.map((report, index) => (
                <Box key={index} sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">
                    <strong>Date:</strong> {report.date}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {report.content}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ mt: 2 }}>
                No reports available.
              </Typography>
            )}
          </div>
        ) : (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            No report available.
          </Typography>
        )}
        <Button onClick={handleClose} variant="outlined" sx={{ mt: 3 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

ReportModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  volunteer: PropTypes.object,
};

export default ReportModal;
