import React from "react";

function MenuModal({ item, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <img src={item.image} alt={item.name} />
      </div>
    </div>
  );
}

export default MenuModal;
