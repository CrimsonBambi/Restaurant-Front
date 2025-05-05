// renders a modal with menu and dish information

import React from "react";

function MenuModal({ item, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <div id="modal" className="show" onClick={onClose}>
      <div id="modal-content" onClick={(e) => e.stopPropagation()}>
        <span id="close" onClick={onClose}>
          &times;
        </span>
        <img src={item.image} alt={item.name} />
        <h2>{item.name}</h2>

        <div id="dishes-container">
          {item.dishes && item.dishes.length > 0 ? (
            item.dishes.map((dish) => (
              <div key={dish.id} className="dish-item">
                <h4>{dish.dish_name}</h4>
                <p>{dish.description}</p>
                <p>Hinta: {dish.price} €</p>

                <h5>Allergeenit:</h5>
                {dish.allergens && dish.allergens.length > 0 ? (
                  <ul>
                    {dish.allergens.map((allergen) => (
                      <li key={allergen.id}>{allergen.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Ei allergeeneja.</p>
                )}
              </div>
            ))
          ) : (
            <p>Ei annoksia.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
