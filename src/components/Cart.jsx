import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserContext from "../store/UserContext";

export default function Cart() {
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userCtx.hideCart();
  }

  function handleOpenCheckout() {
    userCtx.showCheckout();
  }

  function calculateFinalPrice(price, quantity) {
    return price * quantity;
  }

  function handleRemoveItem(id) {
    cartCtx.resetItem(id);
  }

  if (cartCtx.items.length === 0) {
    return (
      <Modal open={userCtx.progress === "cart"}>
        <h1 className="modal-title">Your Cart</h1>
        <div className="mt-4">
          <p>Your cart is currently empty. Add meals to the cart first.</p>
          <Button
            className="button bg-primary text-accent mt-4"
            onClick={handleCloseCart}
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={userCtx.progress === "cart"}
      onClose={userCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h1 className="text-3xl text-primary font-bold uppercase">Your Cart</h1>
      <div className="mt-8">
        <ul className="space-y-4">
          {cartCtx.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between pb-4 border border-b-tertiary"
            >
              <div className="flex justify-center items-center gap-4">
                <img
                  src={"http://localhost:3000/" + item.image}
                  alt=""
                  className="w-24 h-24 rounded-xl"
                />
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  {currencyFormatter.format(
                    calculateFinalPrice(item.price, item.quantity)
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  className="btn-checkout"
                  onClick={() => cartCtx.addItem(item)}
                >
                  <img
                    src="add.svg"
                    alt="Add Meal"
                    className="hover:stroke-black"
                  />
                </Button>
                <span className="text-lg">{item.quantity}</span>
                <Button
                  className="btn-checkout"
                  onClick={() => cartCtx.removeItem(item.id)}
                >
                  <img src="remove.svg" alt="Remove Meal" />
                </Button>
                <Button
                  onClick={() => handleRemoveItem(item.id)}
                  className="hover:text-secondary"
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-end text-lg text-secondary font-bold mt-4">
          Total: {currencyFormatter.format(totalPrice)}
        </p>
        <div className="flex justify-end items-center space-x-4 mt-4">
          <Button
            className="text-lg hover:text-secondary hover:underline"
            onClick={handleCloseCart}
          >
            Close
          </Button>
          <Button
            className="button bg-primary text-accent text-lg rounded-none"
            onClick={handleOpenCheckout}
          >
            Go To Checkout
          </Button>
        </div>
      </div>
    </Modal>
  );
}
