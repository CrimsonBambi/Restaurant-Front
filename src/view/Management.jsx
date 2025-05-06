import '../css/management.css';
import { useEffect, useState } from 'react';

const Management = () => {
  const [menus, setMenus] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuDesc, setNewMenuDesc] = useState('');
  const [newMenuImage, setNewMenuImage] = useState(null);
  const [editingMenu, setEditingMenu] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('http://10.120.32.81/restaurant/api/v1/menus');
        if (!response.ok) {
          throw new Error('Failed to fetch menus');
        }
        const data = await response.json();
        setMenus(data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    const fetchDishes = async () => {
      try {
        const response = await fetch('http://10.120.32.81/restaurant/api/v1/dishes');
        if (!response.ok) throw new Error('Failed to fetch dishes');
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
    fetchMenus();
  }, []);

  const deleteMenu = async (id) => {
    const confirmDelete = window.confirm('Haluatko varmasti poistaa tämän menun?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://10.120.32.81/restaurant/api/v1/menus/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete menu');
      }

      setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };

  const handleUpdateMenu = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('restaurant_id', 1);
    formData.append('name', newMenuName);
    formData.append('description', newMenuDesc);
    if (newMenuImage) {
      formData.append('image', newMenuImage);
    }

    try {
      const response = await fetch(`http://10.120.32.81/restaurant/api/v1/menus/${editingMenu.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update menu');
      }

      const result = await response.json();
      console.log(result);

      // Reset form and modal state after successful update
      setShowMenuModal(false);
      setNewMenuName('');
      setNewMenuDesc('');
      setNewMenuImage(null);
      setEditingMenu(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="management-container">
      <div id="management-options">
        <div id="menu-option">
          <h4>Menut</h4>
          <button
            id="add-menu-button"
            onClick={() => {
              setShowMenuModal(true);
              setEditingMenu(null); // Reset the editing menu when adding new
            }}
          >
            &#10010;
          </button>
          {menus && menus.length > 0 ? (
            menus.map((menu) => (
              <div key={menu.id} className="menu-card">
                <span className="menu-name">{menu.name}</span>
                <div className="menu-buttons">
                  <button
                    className="update-btn"
                    onClick={() => {
                      setEditingMenu(menu);
                      setNewMenuName(menu.name);
                      setNewMenuDesc(menu.description);
                      setNewMenuImage(null);
                      setShowMenuModal(true);
                    }}
                  >
                    Päivitä
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMenu(menu.id)}
                  >
                    Poista
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No menus available.</p>
          )}
        </div>

        <div id="dishes-option">
          <h4>Ruokalajit</h4>
          <button id="add-dish-button">&#10010;</button>
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card">
              <span className="dish-name">{dish.dish_name}</span>
              <div className="dish-buttons">
                <button className="update-btn">Päivitä</button>
                <button className="delete-btn">Poista</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showMenuModal && (
        <div className="menu-modal">
          <div id="menu-modal-content">
            <button type="button" id="close-menu-modal" onClick={() => setShowMenuModal(false)}>
              &times;
            </button>
            <h5>{editingMenu ? 'Päivitä menu' : 'Lisää uusi menu'}</h5>
            <form
              onSubmit={editingMenu ? handleUpdateMenu : async (e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append('restaurant_id', 1);
                formData.append('name', newMenuName);
                formData.append('description', newMenuDesc);
                if (newMenuImage) {
                  formData.append('image', newMenuImage);
                }

                try {
                  const response = await fetch('http://10.120.32.81/restaurant/api/v1/menus', {
                    method: 'POST',
                    body: formData,
                  });

                  if (!response.ok) throw new Error('Failed to add menu');

                  const result = await response.json();
                  setMenus([...menus, result.menu]);
                  setShowMenuModal(false);
                  setNewMenuName('');
                  setNewMenuDesc('');
                  setNewMenuImage(null);
                } catch (err) {
                  console.error(err);
                }
              }}
              encType="multipart/form-data"
            >
              <input
                type="text"
                placeholder="Menu nimi"
                value={newMenuName}
                onChange={(e) => setNewMenuName(e.target.value)}
                required
              />
              <textarea
                placeholder="Kuvaus"
                value={newMenuDesc}
                onChange={(e) => setNewMenuDesc(e.target.value)}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewMenuImage(e.target.files[0])}
              />
              <div className="form-buttons">
                <button type="submit">{editingMenu ? 'Päivitä' : 'Tallenna'}</button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;




