import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import UserContext from "../store/UserContext";

export default function Header() {
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleCartClick() {
    userCtx.showCart();
  }

  return (
    <header className="flex items-center justify-between text-primary py-12 px-[10%]">
      <div className="flex items-center gap-4">
        <img
          src="./logo.jpg"
          alt="A plate with a nice view."
          className="w-16 h-16 object-contain rounded-full border-2 border-secondary-400"
        />
        <h1 className="text-4xl uppercase font-bold tracking-widest">Fooder</h1>
      </div>
      <nav>
        <Button
          onClick={handleCartClick}
          className="button bg-primary text-accent text-xl"
        >
          🛒 Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
