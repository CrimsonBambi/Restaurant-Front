import React from "react";

// display the modal with the menu item details
function MenuModal({ item, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <div id="modal" className="show" onClick={onClose}>
      <div id="modal-content" onClick={(e) => e.stopPropagation()}>
        <span id="close" onClick={onClose}>&times;</span>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <img src={item.image} alt={item.name} />
      </div>
    </div>
  );
}

export default MenuModal;