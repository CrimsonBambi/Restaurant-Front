import React, { useState } from "react";
import MenuItem from "./MenuItem";
import MenuModal from "./MenuModal";
import menu1 from "../assets/menu1.jpg";
import menu2 from "../assets/menu2.jpg";
import menu3 from "../assets/menu3.jpg";
import "../menu/menu.css"; 

function MenuPage() {
  const [openModal, setOpenModal] = useState(null);

  const menuItems = [
    { id: "menu1", name: "Menu1", description: "Menu description fetched from the database", image: menu1 },
    { id: "menu2", name: "Menu2", description: "Menu description fetched from the database", image: menu2 },
    { id: "menu3", name: "Menu3", description: "Menu description fetched from the database", image: menu3 },
  ];

  // Function to handle opening the modal
  const handleModalOpen = (id) => {
    const item = menuItems.find((menu) => menu.id === id);
    console.log("Opening modal for item:", item); // Debug-tulostus
    setOpenModal(item);
  };

  // Function to close the modal
  const handleModalClose = () => {
    setOpenModal(null); // Reset the state to close the modal
  };

  return (
    <div className="webpage">
      <header>
        <div className="page-header">
          <div className="logo">
            <div id="logo-image"></div>
            <p>Restaurant name</p>
          </div>
          <div className="navigation">
            <a href="/frontpage/frontpage.html" className="nav-button">Home</a>
            <a href="/menu.html" className="nav-button">Menu</a>
            <a href="/profiili/profiili.html#login-modal" className="nav-button">Login</a>
            <a href="/profiili/profiili.html#register-modal" className="nav-button">Register</a>
          </div>
        </div>
      </header>

      <main>
        <div className="menu-container">
          <div className="menu-heading-container">
            <h2 className="menu-heading">Click on the image to get more details about the menu items</h2>
          </div>
          <div className="menu-content">
            <div className="menu-images">
              {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} onClick={() => handleModalOpen(item.id)} />
              ))}
            </div>
            <div className="menu-text-container">
              {menuItems.map((item) => (
                <div className="menu-item" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {openModal && <MenuModal item={openModal} onClose={handleModalClose} />}

      <footer>
        <div className="page-footer">
          <div className="contact-info">
            <p>Restaurant Name</p>
            <p>Address</p>
            <p>Phone number</p>
            <p>email@email.com</p>
            <button id="feedback">Leave Feedback!</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MenuPage;