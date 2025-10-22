import { createContext } from "react";

const AppContext = createContext();

export default AppContext;

// Memoize cartItems to avoid unnecessary re-renders
//   const cartItems = useSelector((state) => state.cart.items);
//   const memoizedCartItems = useMemo(() => cartItems, [cartItems]);
