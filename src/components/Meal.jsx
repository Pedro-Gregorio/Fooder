import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
import { useState, useContext } from "react";
import CartContext from "../store/CartContext";
import Notification from "./UI/Notification";

export default function Meal({ meal }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const cartCtx = useContext(CartContext);

  function handleAddMeal() {
    cartCtx.addItem(meal);
    setModalIsOpen(true);
  }

  const mealIndex = cartCtx.items.findIndex(
    (cartMeal) => cartMeal.name === meal.name
  );

  function buttonContent() {
    if (mealIndex !== -1) {
      return (
        <div className="w-full bg-tertiary px-4 py-2 rounded-lg flex justify-between items-center gap-4">
          <Button onClick={() => cartCtx.addItem(meal)}>
            <img src="add.svg" alt="Add Meal" className="w-6 h-6" />
          </Button>
          <span>Added: {cartCtx.items.at(mealIndex).quantity}</span>
          <Button onClick={() => cartCtx.removeItem(meal.id)}>
            <img src="remove.svg" alt="Add Meal" className="w-6 h-6" />
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          onClick={handleAddMeal}
          className="button bg-secondary text-accent w-full"
        >
          🛒 Add to Cart
        </Button>
      );
    }
  }

  return (
    <>
      <li className="bg-primary border-none rounded-2xl overflow-hidden text-center list-item  shadow-md shadow-gray-600">
        <article className="relative h-full flex flex-col justify-between">
          <img
            src={`http://localhost:3000/${meal.image}`}
            alt={meal.name}
            className="w-full h-80 object-cover"
          />
          <p className="absolute right-3 text-lg text-accent py-2 rounded-lg font-bold tracking-widest">
            {currencyFormatter.format(meal.price)}
          </p>
          <div>
            <h3 className="text-2xl font-bold text-tertiary my-3">
              {meal.name}
            </h3>
            <p className="m-4 text-accent">{meal.description}</p>
          </div>
          <div className="flex items-center justify-between px-4 mb-6">
            {buttonContent()}
          </div>
        </article>
      </li>
      <Notification open={modalIsOpen} close={() => setModalIsOpen(false)}>
        <h3>🛒 {meal.name} was added to the cart!</h3>
      </Notification>
    </>
  );
}
