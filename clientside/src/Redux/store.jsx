import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Feature/authslice";
import productReducer from "./Feature/productslice";
import cartSliceReducer from "./Feature/cartslice";
import checkoutReducer from "./Feature/Checkoutslice";
import paymentReducer from "./Feature/paymentslice";
import orderReducer from "./Feature/Ordersslice";
export default configureStore({
  reducer: {
    auth: AuthReducer,
    product: productReducer,
    cart: cartSliceReducer,
    checkout: checkoutReducer,
    payments: paymentReducer,
    orders: orderReducer,
  },
});
