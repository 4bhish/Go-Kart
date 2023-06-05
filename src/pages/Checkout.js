import React, {  useContext, useState } from 'react'
import '../styles/Checkout.css'
import { useLocation } from 'react-router';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CartProvider } from '../contexts/CartContext';


function Checkout() {
  
  const location = useLocation()

  const {clearCart} = useContext(CartProvider)

  const subtotal = location.state.total
  
  const [showForm, setShowForm] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddressList((prevAddresses) => [...prevAddresses, formData]);
    setFormData({
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: ''
    });
    setShowForm(false);

    
  };


  const handlePlaceOrder = () => {
    const selectedAddressIndex = document.querySelector('input[name="address"]:checked');
  
  if (!selectedAddressIndex) {
    toast.error(`Please Select addres !`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
      className: 'product-removed-toast',
    });

    return;
  }

  const index = parseInt(selectedAddressIndex.value);
  const selectedAddress = addressList[index];
  
    setIsLoading(true);

    // Simulate placing an order with an asynchronous function
    setTimeout(() => {
      setIsLoading(false);
      setIsOrderPlaced(true);

      toast.success(`Order Placed`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        className: 'product-removed-toast',
      });

      clearCart()
    }, 2000);

    
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="address-section">
        <h2>Address</h2>
        {addressList.length > 0 &&
          addressList.map((address, index) => (
            <div key={index}>
              
              <label ><input  type="radio" name="address" value={index} />
                {address.fullName}, {address.addressLine1}, {address.addressLine2}, {address.city}, {address.state}, {address.zipCode}
              </label>
            </div>
          ))}
        {!showForm && (
          <button onClick={() => setShowForm(true)}>Add Address</button>
        )}
        {showForm && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="addressLine1"
              placeholder="Address Line 1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="addressLine2"
              placeholder="Address Line 2"
              value={formData.addressLine2}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>

      {addressList.length > 0 && (
      <div className="order-summary">
        <h2 className="section-heading">Order Summary</h2>
        {subtotal && <p className="subtotal">Subtotal: ${subtotal}</p>}
        <button
          className="place-order-button"
          onClick={handlePlaceOrder}
          disabled={isLoading || isOrderPlaced}
        >
          {isLoading ? 'Placing Order...' : isOrderPlaced ? 'Order Placed' : 'Place Order'}
        </button>
      </div>
    )}
    </div>
  );
}

export default Checkout
