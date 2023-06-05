import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import LoginDetails from './pages/LoginDetails';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import RequiresAuth from './components/RequiresAuth';
import { ToastContainer } from 'react-toastify';
import Checkout from './pages/Checkout';
import CheckoutNavigate from './components/CheckoutNavigate';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/cart' element={<RequiresAuth>
          <Cart/>
        </RequiresAuth>} />

        <Route path='/wishlist' element={<RequiresAuth>
          <Wishlist/>
        </RequiresAuth>} />
        
        <Route path='/logindetails' element={<LoginDetails/>} />
        <Route path='/productlistingpage' element={<ProductListingPage />} />
        <Route path='/productlistingpage/:id' element={<ProductDetailPage />}  />
        <Route path='/checkout' element={<CheckoutNavigate>
          <Checkout />
        </CheckoutNavigate>}  />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
