import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import MenuModal from "./MenuModal";
import "../css/menu.css";

function MenuPage() {
  const [openModal, setOpenModal] = useState(null);
  const [fetchedMenus, setFetchedMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const ids = [1, 2, 3];
        const promises = ids.map((id) =>
          fetch(`http://10.120.32.81/restaurant/api/v1/menus/${id}`).then((res) =>
            res.json()
          )
        );
        const results = await Promise.all(promises);

        const menusWithImages = results.map((menu) => ({
          ...menu,
          image: `http://10.120.32.81/restaurant/uploads/${menu.image}`,
        }));

        setFetchedMenus(menusWithImages);
      } catch (error) {
        console.error("Error fetching the menus:", error);
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
              Saat lisätietoja menun sisällöstä klikkaamalla kuvaa
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
