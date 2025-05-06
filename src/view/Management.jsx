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

  const [showDishModal, setShowDishModal] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [dishName, setDishName] = useState('');
  const [dishType, setDishType] = useState('');
  const [dishDesc, setDishDesc] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [dishMenuId, setDishMenuId] = useState('');

  const [allergens, setAllergens] = useState([]);
  const [showAllergenModal, setShowAllergenModal] = useState(false);
  const [allergenName, setAllergenName] = useState('');

  const [selectedAllergen, setSelectedAllergen] = useState(null);
  const [linkActionType, setLinkActionType] = useState('link'); // or 'unlink'
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedDishId, setSelectedDishId] = useState('');


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

    const fetchAllergens = async () => {
      try {
        const response = await fetch('http://10.120.32.81/restaurant/api/v1/allergens');
        if (!response.ok) throw new Error('Failed to fetch allergens');
        const data = await response.json();
        setAllergens(data);
      } catch (error) {
        console.error('Error fetching allergens:', error);
      }
    };


    fetchDishes();
    fetchMenus();
    fetchAllergens();
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

  const deleteDish = async (id) => {
    const confirmDelete = window.confirm('Haluatko varmasti poistaa tämän ruokalajin?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://10.120.32.81/restaurant/api/v1/dishes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete dish');

      setDishes((prevDishes) => prevDishes.filter((dish) => dish.id !== id));
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  const deleteAllergen = async (id) => {
    const confirmDelete = window.confirm('Haluatko varmasti poistaa tämän allergeenin?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://10.120.32.81/restaurant/api/v1/allergens/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete allergen');

      setAllergens((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error('Error deleting allergen:', error);
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
                    }}>Päivitä</button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMenu(menu.id)}>Poista</button>
                </div>
              </div>
            ))) : (<p>No menus available.</p>)}
        </div>

        <div id="dishes-option">
          <h4>Ruokalajit</h4>
          <button id="add-dish-button" onClick={() => {
            setEditingDish(null); // reset for new
            setDishName('');
            setDishType('');
            setDishDesc('');
            setDishPrice('');
            setDishMenuId('');
            setShowDishModal(true);
          }}>&#10010;</button>

          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card">
              <span className="dish-name">{dish.dish_name}</span>
              <div className="dish-buttons">
              <button className="update-btn" onClick={() => {
                setEditingDish(dish);
                setDishName(dish.dish_name);
                setDishType(dish.type);
                setDishDesc(dish.description);
                setDishPrice(dish.price);
                setDishMenuId(dish.menu_id);
                setShowDishModal(true);}}>Päivitä</button>
                <button className="delete-btn" onClick={() => deleteDish(dish.id)}>Poista</button>
              </div>
            </div>
          ))}
        </div>

        <div id="allergens-option">
          <h4>Allergeenit</h4>
          <button id="add-allergen-button" onClick={() => {
            setAllergenName('');
            setShowAllergenModal(true);}}>&#10010;</button>
            {allergens && allergens.length > 0 ? (allergens.map((allergen) => (

            <div key={allergen.id} className="allergen-card">
              <span className="allergen-name">{allergen.name}</span>
            <div className="allergen-buttons">
              <button className="delete-btn" onClick={() => deleteAllergen(allergen.id)}>Poista</button>
              <button id="link-button" onClick={() => {
                setSelectedAllergen(allergen);
                setLinkActionType('link');
                setShowLinkModal(true);
              }}>Linkitä</button>
              <button id="unlink-button" onClick={() => {
                setSelectedAllergen(allergen);
                setLinkActionType('unlink');
                setShowLinkModal(true);
              }}>Irroita</button>
            </div>
        </div>
          ))) : (<p>Ei allergeeneja saatavilla.</p>)}
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
              encType="multipart/form-data">
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

      {showDishModal && (
      <div className="menu-modal">
        <div id="menu-modal-content">
          <button type="button" id="close-menu-modal" onClick={() => {
            setShowDishModal(false);
            setEditingDish(null);
          }}>&times;</button>
          <h5>{editingDish ? 'Päivitä ruokalaji' : 'Lisää ruokalaji'}</h5>
          <form onSubmit={async (e) => {
          e.preventDefault();
          const payload = {
            dish_name: dishName,
            type: dishType,
            description: dishDesc,
            price: dishPrice,
            menu_id: dishMenuId,
          };

          const url = editingDish
            ? `http://10.120.32.81/restaurant/api/v1/dishes/${editingDish.id}`
            : `http://10.120.32.81/restaurant/api/v1/dishes`;

          const method = editingDish ? 'PUT' : 'POST';

          try {
            const response = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to save dish');

            const result = await response.json();

            console.log(result);

            // Close modal
            setShowDishModal(false);
            setEditingDish(null);
            setDishName('');
            setDishType('');
            setDishDesc('');
            setDishPrice('');
            setDishMenuId('');
          } catch (error) {
            console.error('Dish save error:', error);
          }
        }}>
        <input
          type="text"
          placeholder="Nimi"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tyyppi (esim. alku-, pää-, jälkiruoka)"
          value={dishType}
          onChange={(e) => setDishType(e.target.value)}
          required
        />
        <textarea
          placeholder="Kuvaus"
          value={dishDesc}
          onChange={(e) => setDishDesc(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Hinta (€)"
          value={dishPrice}
          onChange={(e) => setDishPrice(e.target.value)}
          required
        />
        <select
          value={dishMenuId}
          onChange={(e) => setDishMenuId(e.target.value)}
          required
        >
          <option value="">Valitse menu</option>
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </select>

        <div className="form-buttons">
          <button type="submit">Tallenna</button>
        </div>
        </form>
      </div>
    </div>
    )}

    {showAllergenModal && (
      <div className="menu-modal">
        <div id="menu-modal-content">
          <button type="button" id="close-menu-modal" onClick={() => {
            setShowAllergenModal(false);
            setAllergenName('');
          }}>&times;</button>
          <h5>Lisää allergeeni</h5>
          <form onSubmit={async (e) => {
          e.preventDefault();

          const payload = {
            name: allergenName,
          };

          const url = `http://10.120.32.81/restaurant/api/v1/allergens`;
          const method = 'POST';


          try {
            const response = await fetch(url, {
              method,
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to save allergen');

            const result = await response.json();

            console.log(result);

            setShowAllergenModal(false);
            setAllergenName('');
          } catch (error) {
            console.error('Error saving allergen:', error);
          }
        }}
      >
        <input
          type="text"
          placeholder="Allergeenin nimi"
          value={allergenName}
          onChange={(e) => setAllergenName(e.target.value)}
          required
        />
        <div className="form-buttons">
          <button type="submit">Tallenna</button>
        </div>
      </form>
    </div>
  </div>
)}

{showLinkModal && (
  <div className="menu-modal">
    <div id="menu-modal-content">
      <button
        type="button"
        id="close-menu-modal"
        onClick={() => {
          setShowLinkModal(false);
          setSelectedAllergen(null);
          setSelectedDishId('');
        }}
      >&times;</button>
      <h5>{linkActionType === 'link' ? 'Linkitä allergeeni ruokalajiin' : 'Irroita allergeeni ruokalajista'}</h5>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const endpoint =
            linkActionType === 'link'
              ? 'http://10.120.32.81/restaurant/api/v1/allergens/link'
              : 'http://10.120.32.81/restaurant/api/v1/allergens/unlink';

          try {
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                dish_id: selectedDishId,
                allergen_id: selectedAllergen.id,
              }),
            });

            if (!response.ok) throw new Error('Operation failed');
            alert(`Allergeeni ${linkActionType === 'linkki' ? 'liitetty' : 'irroitettu'}!`);

            setShowLinkModal(false);
            setSelectedAllergen(null);
            setSelectedDishId('');
          } catch (err) {
            console.error(err);
            alert('Virhe: operaatio epäonnistui.');
          }
        }}
      >
        <select
          value={selectedDishId}
          onChange={(e) => setSelectedDishId(e.target.value)}
          required
        >
          <option value="">Valitse ruokalaji</option>
          {dishes.map((dish) => (
            <option key={dish.id} value={dish.id}>{dish.dish_name}</option>
          ))}
        </select>
        <div className="form-buttons">
          <button type="submit">Tallenna</button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default Management;
