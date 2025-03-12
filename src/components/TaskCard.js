import React, { useState } from "react";

const TaskModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          cursor: "pointer"
        }} 
        onClick={onClose}
      />
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        zIndex: 1001,
        maxWidth: "500px",
        width: "90%"
      }}>
        <h2 style={{ marginBottom: "16px" }}>Complaint Details</h2>
        {Object.entries(task).map(([key, value]) => (
          <p key={key} style={{ margin: "8px 0" }}>
            <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value}
          </p>
        ))}
        <button 
          style={{
            marginTop: "16px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const TaskCard = ({ task, isDraggingOver, onClick }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ id: task.id })
    );
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <div 
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={handleCardClick}
        style={{ 
          padding: "8px", 
          marginBottom: "8px", 
          cursor: "grab", 
          backgroundColor: "white", 
          boxShadow: isDraggingOver ? "0 4px 8px rgba(0,0,0,0.2)" : "0 2px 4px rgba(0,0,0,0.1)", 
          border: "1px solid #ccc", 
          borderRadius: "4px",
          transition: "transform 0.2s, box-shadow 0.2s",
          transform: isDraggingOver ? "scale(1.02)" : "none",
          position: "relative"
        }}
      >
        <p><strong>{task.crime_type}</strong></p>
        <p style={{ fontSize: "12px", color: "gray" }}>{task.complainant_name}</p>
      </div>
      {showModal && <TaskModal task={task} onClose={handleCloseModal} />}
    </React.Fragment>
  );
};

export default TaskCard;
