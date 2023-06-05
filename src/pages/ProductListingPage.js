import React, { useContext, useEffect, useState } from 'react';
import '../styles/ProductListingPage.css';
import SearchIcon from '@mui/icons-material/Search';
import { fakeFetch } from '../FakeFetch';
import ProductCard from '../components/ProductCard';
import { CartProvider } from '../contexts/CartContext';
import { WishlistProvider } from '../contexts/WishlistContext';
import { useLocation } from 'react-router';
import Loader from '../components/Loader';

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // New state for showing/hiding filters

  const location = useLocation();

  const [userSearchInput, setUserSearchInput] = useState('');
  const [priceInput, setPriceInput] = useState(0);
  const [ratingInput, setRatingInput] = useState('All');
  const [checkboxInput, setCheckboxInput] = useState({
    fragrances: false,
    laptops: false,
    smartphones: false,
  });

  const { handleAddToCart, cartProds } = useContext(CartProvider);
  const {
    handleAddToWishlist,
    wishlistProds,
    removeFromWishlist,
  } = useContext(WishlistProvider);

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await fakeFetch('https://example.com/api/products');
      setProducts(data.products);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  function handleClearClick() {
    setUserSearchInput('');
    setPriceInput(0);
    setRatingInput('All');
    setCheckboxInput({
      fragrances: false,
      laptops: false,
      smartphones: false,
    });
  }

  const filterSearch =
    userSearchInput === undefined || userSearchInput === ''
      ? products
      : products.filter((product) =>
          product.title.toLowerCase().includes(userSearchInput)
        );

  const filterPrice =
    priceInput <= 0
      ? filterSearch
      : filterSearch.filter((product) => product.price > priceInput);

  const filterRating =
    ratingInput === 'All'
      ? filterPrice
      : filterPrice.filter(
          (product) => Number(product.rating) > Number(ratingInput)
        );

  function handleCheckbox(e) {
    const { name, checked } = e.target;
    setCheckboxInput((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    if (category) {
      setCheckboxInput((prevState) => ({
        ...prevState,
        [category]: true,
      }));
    }
  }, [location.search]);

  const filterCategory = filterRating.filter((product) => {
    if (
      checkboxInput.fragrances &&
      checkboxInput.laptops &&
      checkboxInput.smartphones
    ) {
      return true;
    } else {
      if (checkboxInput.fragrances && product.category === 'fragrances') {
        return true;
      }
      if (checkboxInput.laptops && product.category === 'laptops') {
        return true;
      }
      if (checkboxInput.smartphones && product.category === 'smartphones') {
        return true;
      }
      return false;
    }
  });

  const isAnyCheckboxSelected = Object.values(checkboxInput).includes(true);

  const filteredProducts = isAnyCheckboxSelected ? filterCategory : filterRating;

  return (
    <div className="productlistingpage">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <button
            className="mobile__toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Close Filters' : 'Open Filters'}
          </button>
          
          <div className="search__container">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setUserSearchInput(e.target.value.toLowerCase())}
            />
            <SearchIcon className="search__icon" />
          </div>

          <div className="productlistingpage__details">
            <div className={`productlistingpage__filters ${showFilters ? 'show' : ''}`}>
              <div className="filter__heading">
                <h4 className="filter__title">Filters</h4>
                <p className="filter__clear" onClick={handleClearClick}>
                  Clear
                </p>
              </div>

              <div className="filter__price">
                <h4 className="price__heading">Price: {priceInput}</h4>
                <input
                  type="range"
                  value={priceInput}
                  className="price__input"
                  min={0}
                  max={2000}
                  step={10}
                  onChange={(e) => setPriceInput(e.target.value)}
                />
              </div>

              <div className="filter__container">
                <h4 className="filter__title">Ratings</h4>
                <div className="input__container">
                  <label htmlFor="rating__All">
                    <input
                      defaultChecked
                      id="rating__All"
                      checked={ratingInput === 'All'}
                      type="radio"
                      name="rating"
                      value="All"
                      onChange={(e) => setRatingInput(e.target.value)}
                    />
                    All
                  </label>
                  <label htmlFor="rating__four">
                    <input
                      id="rating__four"
                      checked={ratingInput === '4'}
                      type="radio"
                      name="rating"
                      value={4}
                      onChange={(e) => setRatingInput(e.target.value)}
                    />
                    Above 4 rating
                  </label>
                  <label htmlFor="rating__three">
                    <input
                      id="rating__three"
                      checked={ratingInput === '3'}
                      type="radio"
                      name="rating"
                      value={3}
                      onChange={(e) => setRatingInput(e.target.value)}
                    />
                    Above 3 rating
                  </label>
                  <label htmlFor="rating__two">
                    <input
                      id="rating__two"
                      checked={ratingInput === '2'}
                      type="radio"
                      name="rating"
                      value={2}
                      onChange={(e) => setRatingInput(e.target.value)}
                    />
                    Above 2 rating
                  </label>
                </div>
              </div>

              <div className="filter__container">
                <h4 className="filter__title">Category</h4>
                <div className="input__container">
                  <label htmlFor="fragrances">
                    <input
                      id="fragrances"
                      checked={checkboxInput.fragrances}
                      type="checkbox"
                      onChange={handleCheckbox}
                      value={checkboxInput.fragrances}
                      name="fragrances"
                    />
                    Fragrances
                  </label>
                  <label htmlFor="laptops">
                    <input
                      id="laptops"
                      checked={checkboxInput.laptops}
                      type="checkbox"
                      onChange={handleCheckbox}
                      value={checkboxInput.laptops}
                      name="laptops"
                    />
                    Laptops
                  </label>
                  <label htmlFor="smartphones">
                    <input
                      id="smartphones"
                      checked={checkboxInput.smartphones}
                      type="checkbox"
                      onChange={handleCheckbox}
                      value={checkboxInput.smartphones}
                      name="smartphones"
                    />
                    Smartphones
                  </label>
                </div>
              </div>
            </div>

            <div className="productlistingpage__products">
              {filteredProducts.map((product) => (
                <ProductCard
                  id={product.id}
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                  handleAddToWishlist={handleAddToWishlist}
                  cart={cartProds}
                  wishlist={wishlistProds}
                  removeFromWishList={removeFromWishlist}
                />
              ))}
            </div>
          </div>
          
          
        </div>
      )}
    </div>
  );
}

export default ProductListingPage;
