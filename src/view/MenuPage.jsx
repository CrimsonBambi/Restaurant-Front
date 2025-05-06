import React, { useState, useEffect } from "react";
import MenuItem from "../component/MenuItem";
import MenuModal from "../component/MenuModal";
import "../css/menu.css";
import { fetchData } from "../utils/fetchData"; // Reusable fetch helper

function MenuPage() {
  const [openModal, setOpenModal] = useState(null); // Currently opened modal data
  const [fetchedMenus, setFetchedMenus] = useState([]); // All fetched menu data
  const [highlightedMenu, setHighlightedMenu] = useState(null); // The highlighted menu of the day

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

  useEffect(() => {
    // Logic to select the highlighted menu based on the current day of the week
    if (fetchedMenus.length > 0) {
      const currentDay = new Date().getDay(); // 0 - Sunday, 1 - Monday, etc.
      setHighlightedMenu(fetchedMenus[currentDay % fetchedMenus.length]);
    }
  }, [fetchedMenus]);

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
              Saat lisätietoja menun sisällöstä klikkaamalla kuvaa.<br />
              Päivän menu on korostettu.
            </h2>
          </div>
          <div id="menu-content">
            {fetchedMenus.map((menu) => (
              <div
                key={menu.id}
                className={`menu-item-container ${menu === highlightedMenu ? "highlighted" : ""
                  }`}
              >
                <div id="menu-images">
                  <MenuItem
                    item={menu}
                    onClick={() => handleModalOpen(menu)}
                  />
                </div>
                <div id="menu-text-container">
                  <h3>{menu.name}</h3>
                  <p>{menu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {openModal && <MenuModal item={openModal} onClose={handleModalClose} />}
    </div>
  );
}

export default MenuPage;
