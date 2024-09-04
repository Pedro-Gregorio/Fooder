import React, { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import Input from "./UI/Input";
import UserContext from "../store/UserContext";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserContext);

  const {
    data,
    loading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig, []);

  const totalPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleReturn() {
    userCtx.hideCheckout();
    userCtx.showCart();
  }

  function handleFinish() {
    userCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button
        className="text-lg hover:text-secondary hover:underline"
        onClick={handleReturn}
        type="button"
      >
        Return
      </Button>
      <Button className="button bg-primary text-accent text-lg rounded-none">
        Submit
      </Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data.message && !error) {
    return (
      <Modal open={userCtx.progress === "checkout"} onClose={handleFinish}>
        <h2 className="modal-title mb-4">Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="flex justify-end items-center space-x-4 mt-4">
          <Button
            className="button bg-primary text-accent text-lg rounded-none"
            onClick={handleFinish}
          >
            OK
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl text-primary font-bold uppercase">Checkout</h1>
        <div id="checkout-form" className="mt-4">
          <Input title="Full Name" type="text" identifier="name" />
          <Input title="Email Address" type="email" identifier="email" />
          <Input title="Street" type="text" identifier="street" />
          <div className="flex justify-between gap-4">
            <Input title="Postal Code" type="text" identifier="postal-code" />
            <Input title="City" type="text" identifier="city" />
            <Input
              title="Fiscal Number"
              type="number"
              identifier="fiscal-number"
            />
          </div>
        </div>

        <div>
          <p className="mt-4 font-bold">
            Price to pay: {currencyFormatter.format(totalPrice)}
          </p>
          <h3>Available Payment Methods:</h3>
          <div className="flex items-center gap-6">
            <img src="mastercard.svg" alt="Mastercard" className="w-16 h-16" />
            <img src="visa.svg" alt="Visa" className="w-16 h-16" />
            <img src="paypal.svg" alt="PayPal" className="w-16 h-16" />
            <img src="apple-pay.svg" alt="Apple Pay" className="w-16 h-16" />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-center text-xl font-bold text-red-700">
            Oops! An error occurred submitting the order. Please, try again
            later...
          </p>
        )}

        <p className="flex justify-end items-center space-x-4 mt-4">
          {actions}
        </p>
      </form>
    </Modal>
  );
}
