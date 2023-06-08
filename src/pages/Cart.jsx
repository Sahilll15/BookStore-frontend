import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useGetCart } from "../hooks/carthooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useCreateOrder } from "../hooks/orderhooks";
const Cart = () => {
  const username=localStorage.getItem("user_name")
  const { cart, getCart, isloading } = useGetCart();
  const [showModal, setShowModal] = useState(false);
  const { createOrder, isLoading }=useCreateOrder();
  const [selectedItems, setSelectedItems] = useState([]);
 
 
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = item.book.price * item.quantity;
    return total + itemPrice;
  }, 0);

  console.log(totalPrice)
  useEffect(() => {
    getCart();
  }, []);

  const handlePlaceOrder = () => {
  
    createOrder(cart,totalPrice);
    setShowModal(true);
  };

  if (isloading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-container">
      <h2><FontAwesomeIcon icon={faShoppingCart} /> Cart</h2>
      {Array.isArray(cart) && cart.length > 0 ? (
        cart.map((item) => (
          <div className="card mb-3" key={item.id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={item.book.image} className="img-fluid rounded-start" alt={item.title} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.book.title}</h5>
                  <p className="card-text">Quantity: {item.quantity}</p>
                  <p className="card-text">Price: {item.book.price} Rs</p>
                  <p className="card-text" >Total: {item.book.price * item.quantity} Rs</p>
                  
      

                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
  <button
        className="btn btn-primary"
        onClick={() => handlePlaceOrder()}
      >
        Place Order <FontAwesomeIcon icon={faShoppingCart} />
      </button>
      {/* Success Message Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <FontAwesomeIcon icon={faCheckCircle} /> Order Placed
                </h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Your order has been successfully <strong>{username}</strong> .</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>
                  Close <FontAwesomeIcon icon={faCheckCircle} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
