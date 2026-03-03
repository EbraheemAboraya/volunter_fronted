// import React, { useState } from "react";

// function UpdateModal({ onClose, onUpdate }) {
//   const [arrivalDate, setArrivalDate] = useState("");
//   const [whatIDid, setWhatIDid] = useState("");

//   const handleUpdate = () => {
//     // Logic to update arrival date and what I did
//     onUpdate(arrivalDate, whatIDid);
//     onClose();
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <h2>Update Arrival Details</h2>
//         <label htmlFor="arrivalDate">Arrival Date:</label>
//         <input
//           type="text"
//           id="arrivalDate"
//           value={arrivalDate}
//           onChange={(e) => setArrivalDate(e.target.value)}
//         />
//         <label htmlFor="whatIDid">What I Did:</label>
//         <textarea
//           id="whatIDid"
//           value={whatIDid}
//           onChange={(e) => setWhatIDid(e.target.value)}
//         />
//         <div className="modal-buttons">
//           <button onClick={handleUpdate}>Update</button>
//           <button onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UpdateModal;
