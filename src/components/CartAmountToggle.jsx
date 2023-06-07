import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import './CartAmountToggle.css'
const CartAmountToggle = ({ quantity, setDecrease, setIncrease }) => {
  return (
    <div className="cart-button">
      <div className="amount-toggle">
        <button onClick={() => setDecrease()} className="amount-button">
          <FaMinus />
        </button>
        <div className="amount-style">{quantity}</div>
        <button onClick={() => setIncrease()} className="amount-button">
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartAmountToggle;
