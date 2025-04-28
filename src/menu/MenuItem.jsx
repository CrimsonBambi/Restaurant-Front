import React from 'react';

function MenuItem({ item, onClick }) {
  return (
    <div className="menu-item" onClick={onClick}>
      <img
        src={item.image}
        alt={`Image for ${item.name}`}
        className="image-link"
      />
    </div>
  );
}

export default MenuItem;
