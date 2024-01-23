// EditDialog.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
`;

const EditDialog = ({ onClose, onSubmit, initialData }) => {
  const [editedData, setEditedData] = useState({
    auditNr: initialData[0] || '',
    leadAuditor: initialData[1] || '',
    leadAuditee: initialData[2] || '',
    erstelltAm: initialData[3] || '',
    bis: initialData[4] || '',
  });

  const handleChange = (e) => {
    setEditedData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    // Call the onSubmit callback with the editedData
    onSubmit(editedData);

    // Close the dialog
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Audit</h2>

        {/* Form elements for editing */}
        <label>
          Audit-Nr:
          <input type="text" name="auditNr" value={editedData.auditNr} onChange={handleChange} />
        </label>

        <label>
          Lead-Auditor:
          <input type="text" name="leadAuditor" value={editedData.leadAuditor} onChange={handleChange} />
        </label>

        <label>
          Lead-Auditee:
          <input type="text" name="leadAuditee" value={editedData.leadAuditee} onChange={handleChange} />
        </label>

        <label>
          Erstellt am:
          <input type="text" name="erstelltAm" value={editedData.erstelltAm} onChange={handleChange} />
        </label>

        <label>
          Bis:
          <input type="text" name="bis" value={editedData.bis} onChange={handleChange} />
        </label>

        <button onClick={handleSubmit}>Save Changes</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditDialog;


