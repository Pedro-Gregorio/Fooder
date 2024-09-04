import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
import { useState, useContext } from "react";
import CartContext from "../store/CartContext";
import Notification from "./UI/Notification";

export default function Meal({ meal }) {
  const [buttonText, setButtonText] = useState("🛒 Add to Cart");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const cartCtx = useContext(CartContext);

  function handleMouseEnter() {
    setButtonText("👀 Add to Cart");
  }

  function handleMouseLeave() {
    setButtonText("🛒 Add to Cart");
  }

  function handleAddMeal() {
    cartCtx.addItem(meal);
    setModalIsOpen(true);
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
            <Button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleAddMeal}
              className="button bg-secondary text-accent w-full"
            >
              {buttonText}
            </Button>
          </div>
        </article>
      </li>
      <Notification open={modalIsOpen} close={() => setModalIsOpen(false)}>
        <h3>🛒 {meal.name} was added to the cart!</h3>
      </Notification>
    </>
  );
}
