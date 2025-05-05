
// fetches and displays all menus. Clicking a menu image opens a modal with more details.

import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import MenuModal from "./MenuModal";
import "../css/menu.css";
import { fetchData } from "../utils/fetchData"; // Reusable fetch helper

function MenuPage() {
  const [openModal, setOpenModal] = useState(null); // Currently opened modal data
  const [fetchedMenus, setFetchedMenus] = useState([]); // All fetched menu data

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        // Fetch all menus from backend
        const menus = await fetchData("http://10.120.32.81/restaurant/api/v1/menus");

        // Attach full image URLs for rendering
        const menusWithImages = menus.map((menu) => ({
          ...menu,
          image: `http://10.120.32.81/restaurant/uploads/${menu.image}`,
        }));

        setFetchedMenus(menusWithImages);
      } catch (error) {
        console.error("Error fetching the menus:", error.message);
      }
    };

    fetchMenus();
  }, []);

  const handleModalOpen = (item) => {
    setOpenModal(item);
  };

  const handleModalClose = () => {
    setOpenModal(null);
  };

  return (
    <div id="menu-webpage">
      <main>
        <div id="menu-container">
          <div id="menu-heading-container">
            <h2 id="menu-heading">
              Click an image to view more details about the menu
            </h2>
          </div>
          <div id="menu-content">
            <div id="menu-images">
              {fetchedMenus.map((menu) => (
                <MenuItem
                  key={menu.id}
                  item={menu}
                  onClick={() => handleModalOpen(menu)}
                />
              ))}
            </div>
            <div id="menu-text-container">
              {fetchedMenus.map((menu) => (
                <div id="menu-item" key={menu.id}>
                  <h3>{menu.name}</h3>
                  <p>{menu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {openModal && <MenuModal item={openModal} onClose={handleModalClose} />}
    </div>
  );
}

export default MenuPage;
