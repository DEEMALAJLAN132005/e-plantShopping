import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

// Five categories with six plants each.
const plantsArray = [
  {
    "category": "Air Purifying Plants",
    "plants": [
      {
        "name": "Snake Plant",
        "image": "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
        "description": "Produces oxygen at night, improving air quality.",
        "cost": "$15"
      },
      {
        "name": "Spider Plant",
        "image": "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
        "description": "Filters formaldehyde and xylene from the air.",
        "cost": "$12"
      },
      {
        "name": "Peace Lily",
        "image": "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
        "description": "Removes mold spores and purifies the air.",
        "cost": "$18"
      },
      {
        "name": "Boston Fern",
        "image": "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
        "description": "Adds humidity to the air and removes toxins.",
        "cost": "$20"
      },
      {
        "name": "Rubber Plant",
        "image": "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
        "description": "Easy to care for.",
        "cost": "$17"
      },
      {
        "name": "Aloe Vera",
        "image": "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
        "description": "Known for its soothing gel.",
        "cost": "$14"
      }
    ]
  },
  {
    "category": "Aromatic Fragrant Plants",
    "plants": [
      {
        "name": "Lavender",
        "image": "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba",
        "description": "Calming scent, used in aromatherapy.",
        "cost": "$20"
      },
      {
        "name": "Jasmine",
        "image": "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b",
        "description": "Sweet fragrance, promotes relaxation.",
        "cost": "$18"
      },
      {
        "name": "Rosemary",
        "image": "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
        "description": "Invigorating scent, often used in cooking.",
        "cost": "$15"
      },
      {
        "name": "Mint",
        "image": "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
        "description": "Refreshing aroma, used in teas and cooking.",
        "cost": "$12"
      },
      {
        "name": "Lemon Balm",
        "image": "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
        "description": "Citrusy scent and soothing aroma.",
        "cost": "$14"
      },
      {
        "name": "Hyacinth",
        "image": "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
        "description": "Beautiful flowering plant with a sweet fragrance.",
        "cost": "$22"
      }
    ]
  },
  {
    "category": "Insect Repellent Plants",
    "plants": [
      {
        "name": "Oregano",
        "image": "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg",
        "description": "Aromatic herb commonly used in cooking.",
        "cost": "$10"
      },
      {
        "name": "Marigold",
        "image": "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg",
        "description": "Adds vibrant colors to the garden.",
        "cost": "$8"
      },
      {
        "name": "Geraniums",
        "image": "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg",
        "description": "Colorful flowers with a pleasant scent.",
        "cost": "$20"
      },
      {
        "name": "Basil",
        "image": "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg",
        "description": "Fragrant herb also used in cooking.",
        "cost": "$9"
      },
      {
        "name": "Lavender",
        "image": "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba",
        "description": "Calming scent, used in aromatherapy.",
        "cost": "$20"
      },
      {
        "name": "Catnip",
        "image": "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg",
        "description": "Aromatic herb known for attracting cats.",
        "cost": "$13"
      }
    ]
  },
  {
    "category": "Medicinal Plants",
    "plants": [
      {
        "name": "Aloe Vera",
        "image": "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
        "description": "Soothing gel traditionally used in skincare.",
        "cost": "$14"
      },
      {
        "name": "Echinacea",
        "image": "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg",
        "description": "A flowering herb used in traditional remedies.",
        "cost": "$16"
      },
      {
        "name": "Peppermint",
        "image": "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg",
        "description": "Refreshing herb often used in herbal teas.",
        "cost": "$13"
      },
      {
        "name": "Lemon Balm",
        "image": "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
        "description": "Fragrant herb popular in herbal infusions.",
        "cost": "$14"
      },
      {
        "name": "Chamomile",
        "image": "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
        "description": "Popular flowering herb used in calming teas.",
        "cost": "$15"
      },
      {
        "name": "Calendula",
        "image": "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg",
        "description": "Bright flowers traditionally used in skincare.",
        "cost": "$12"
      }
    ]
  },
  {
    "category": "Low Maintenance Plants",
    "plants": [
      {
        "name": "ZZ Plant",
        "image": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361",
        "description": "Thrives in low light and needs minimal watering.",
        "cost": "$25"
      },
      {
        "name": "Pothos",
        "image": "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg",
        "description": "Easy-care trailing houseplant.",
        "cost": "$10"
      },
      {
        "name": "Snake Plant",
        "image": "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
        "description": "Needs infrequent watering.",
        "cost": "$15"
      },
      {
        "name": "Cast Iron Plant",
        "image": "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg",
        "description": "Hardy plant that tolerates low light.",
        "cost": "$20"
      },
      {
        "name": "Succulents",
        "image": "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg",
        "description": "Drought-tolerant plants with unique shapes.",
        "cost": "$18"
      },
      {
        "name": "Aglaonema",
        "image": "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg",
        "description": "Requires minimal care and adds indoor color.",
        "cost": "$22"
      }
    ]
  }
];

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    const alreadyAdded = cartItems.some((item) => item.name === plant.name);
    if (!alreadyAdded) dispatch(addItem(plant));
  };

  const handleHomeClick = (event) => {
    event.preventDefault();
    if (typeof onHomeClick === 'function') onHomeClick();
  };

  return (
    <div>
      <nav className="navbar" style={{ gap: 16, flexWrap: 'wrap' }}>
        <div className="tag" style={{ width: 'auto', gap: 12 }}>
          <span role="img" aria-label="Plant" style={{ fontSize: 40 }}>🌿</span>
          <div>
            <h3 style={{ margin: 0 }}>Paradise Nursery</h3>
            <small>Where Green Meets Serenity</small>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, flexWrap: 'wrap' }}>
          <a href="#home" onClick={handleHomeClick} style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
          <a href="#plants" onClick={(event) => { event.preventDefault(); setShowCart(false); }} style={{ color: '#fff', textDecoration: 'none' }}>Plants</a>
          <a href="#cart" onClick={(event) => { event.preventDefault(); setShowCart(true); }} style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            <span aria-label="Number of plants in cart">{cartCount}</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <main id="plants" className="product-list-container" style={{ padding: 24, boxSizing: 'border-box', width: '100%' }}>
          {plantsArray.map((category) => (
            <section className="plant-category" key={category.category} style={{ marginBottom: 32 }}>
              <h2 style={{ color: '#1f4424', marginBottom: 18 }}>{category.category}</h2>
              <div className="product-grid" style={{ display: 'grid', width: '100%', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, alignItems: 'stretch', justifyContent: 'stretch' }}>
                {category.plants.map((plant, index) => {
                  const added = cartItems.some((item) => item.name === plant.name);
                  return (
                    <article className="plant-card" key={`${category.category}-${index}`} style={{ padding: 16, borderRadius: 12, backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)', textAlign: 'center' }}>
                      <img src={plant.image} alt={plant.name} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8 }} />
                      <h3 style={{ marginTop: 12, color: '#23472b' }}>{plant.name}</h3>
                      <p style={{ minHeight: 45, color: '#333' }}>{plant.description}</p>
                      <p style={{ fontWeight: 'bold', color: '#333' }}>{plant.cost}</p>
                      <button
                        type="button"
                        className={`product-button ${added ? 'added-to-cart' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={added}
                        style={{ backgroundColor: added ? '#888' : '#4caf50', cursor: added ? 'not-allowed' : 'pointer' }}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}

export default ProductList;
