import React from "react";

const modalBackdrop = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};
const modalBox = {
  background: "#fff",
  borderRadius: "12px",
  padding: "2rem 1.5rem 1.5rem 1.5rem",
  minWidth: "320px",
  maxWidth: "90vw",
  maxHeight: "80vh",
  overflow: "auto",
  boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
  position: "relative",
};
const closeBtn = {
  position: "absolute",
  top: 10,
  right: 16,
  background: "none",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
  color: "#333",
};

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={modalBackdrop} onClick={onClose}>
      <div style={modalBox} onClick={e => e.stopPropagation()}>
        <button style={closeBtn} onClick={onClose} aria-label="Close">&times;</button>
        {children}
      </div>
    </div>
  );
}

export default Modal; 