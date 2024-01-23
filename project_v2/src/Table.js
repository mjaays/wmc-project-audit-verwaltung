import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './Table.css';
import EditDialog from './EditDialog';

const Home = ({ data, handleEditClick, handleDeleteClick }) => (
  <div>
    <h1 className="heading">PRE PROJEKT</h1>
    <table className="styled-table table-container">
      <thead>
        <tr>
          <th>Audit-Nr</th>
          <th>Lead-Auditor</th>
          <th>Lead-Auditee</th>
          <th>Erstellt am</th>
          <th>Bis</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {(Array.isArray(row) ? row : []).map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
            <td>
              <button onClick={() => handleEditClick(index)}>Edit</button>
              <button onClick={() => handleDeleteClick(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


const App = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchCSVData(); // Load the CSV data on the initial render
  }, []);

  const fetchCSVData = async () => {
    try {
      const csvData = `1,Coddington,Wolsey,6/23/2023,7/14/2023
      2,Crocetti,Szach,2/16/2023,7/15/2023
      3,Covet,Badini,8/8/2023,4/21/2023
      4,Baudichon,Winsiowiecki,3/23/2023,4/18/2023
      5,Philip,Shrubsall,1/29/2023,9/15/2023
      6,Feria,Collelton,8/17/2023,11/18/2022
      7,Velten,Plackstone,6/28/2023,11/14/2022
      8,Sheasby,Streatley,10/21/2023,2/18/2023
      9,Sutherden,Balstone,12/5/2022,11/6/2023
      10,Davidi,Stealy,6/4/2023,3/29/2023
      11,Oguz,Kestle,1/1/2023,10/9/2023
      12,Pacher,Doudney,7/16/2023,9/9/2023
      13,Veevers,Rubke,6/3/2023,7/8/2023
      14,Mostyn,Fulstow,10/2/2023,4/15/2023
      15,Deek,Thomazet,8/25/2023,3/22/2023
      16,McKirdy,Hanscombe,6/27/2023,6/27/2023
      17,Vail,Whiles,10/21/2023,3/16/2023
      18,Jentgens,Kinglake,12/21/2022,3/14/2023
      19,Allans,Glyssanne,1/1/2023,1/4/2023
      20,Arkwright,Redford,12/6/2022,10/30/2023
      21,Neads,Pratton,9/18/2023,1/23/2023
      22,Strood,Curson,9/5/2023,12/27/2022
      23,Bellanger,Polino,5/15/2023,8/24/2023
      24,Frostdick,Worvell,9/28/2023,11/26/2022
      25,Darnell,Gullifant,6/10/2023,3/15/2023
      `;

      const parsedData = csvData.split("\n").map((row) => row.split(","));

      setData(parsedData);
    } catch (error) {
      console.error("Error setting hard-coded CSV data:", error);
    }
  };

  const handleEditClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (rowIndex) => {
    const newData = [...data];
    newData.splice(rowIndex, 1);
    setData(newData);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
    setSelectedRow(null);
  };

  const handleEditDialogSubmit = (editedData) => {
    const newData = data.map((row, rowIndex) =>
      rowIndex === selectedRow ? Object.values(editedData) : row
    );
  
    setData(newData);
    handleEditDialogClose();
  };
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home data={data} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />} />
        {/* Add more routes for different views/components */}
      </Routes>

      {isEditDialogOpen && (
        <EditDialog
          onClose={handleEditDialogClose}
          onSubmit={handleEditDialogSubmit}
          initialData={selectedRow !== null ? data[selectedRow] : {}}
        />
      )}
    </Router>
  );
};

export default App;
