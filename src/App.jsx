import Header from "./components/Header";
import AvailableMeals from "./components/AvailableMeals";
import Cart from "./components/Cart";

import { CartContextProvider } from "./store/CartContext";
import { UserContextProvider } from "./store/UserContext";
import Checkout from "./components/Checkout";

function App() {
  return (
    <div className="mx-auto min-h-screen bg-slate-500">
      <UserContextProvider>
        <CartContextProvider>
          <Header />
          <AvailableMeals />
          <Cart />
          <Checkout />
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
