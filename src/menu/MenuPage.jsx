import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import MenuModal from "./MenuModal";
import "../menu/menu.css";

// Tuodaan kuvat
import menu1 from "../assets/menu1.jpg";
import menu2 from "../assets/menu2.jpg";
import menu3 from "../assets/menu3.jpg";

function MenuPage() {
  const [openModal, setOpenModal] = useState(null);
  const [fetchedMenus, setFetchedMenus] = useState([]); // Huom! nyt taulukko, koska monta menu

  // Mapping menu ID -> kuva
  const menuImages = {
    1: menu1,
    2: menu2,
    3: menu3,
  };

  // Hakee kaikki menut
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const ids = [1, 2, 3];
        const promises = ids.map(id =>
          fetch(`http://10.120.32.81/restaurant/api/v1/menus/${id}`).then(res => res.json())
        );
        const results = await Promise.all(promises);

        // Lisätään jokaiseen menuun kuva mukaan
        const menusWithImages = results.map(menu => ({
          ...menu,
          image: menuImages[menu.id],
        }));

        setFetchedMenus(menusWithImages);
      } catch (error) {
        console.error("Error fetching the menus:", error);
      }
    };

    fetchMenus();
  }, []);

  // Modal auki
  const handleModalOpen = (item) => {
    setOpenModal(item);
  };

  // Modal kiinni
  const handleModalClose = () => {
    setOpenModal(null);
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
            <h2 className="menu-heading">Saat lisätietoja menun sisällöstä klikkaamalla kuvaa</h2>
          </div>
          <div className="menu-content">
            <div className="menu-images">
              {fetchedMenus.map((menu) => (
                <MenuItem
                  key={menu.id}
                  item={menu}
                  onClick={() => handleModalOpen(menu)}
                />
              ))}
            </div>
            <div className="menu-text-container">
              {fetchedMenus.map((menu) => (
                <div className="menu-item" key={menu.id}>
                  <h3>{menu.name}</h3>
                  <p>{menu.description}</p>
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
