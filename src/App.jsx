import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { mainStore, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "./components/Navbar";
import Announcement from "./components/Announcement";
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenSideDrawer, setIsOpenSideDrawer] = useState(false);
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(null);
  const [loginStatus, setStatus] = useState(false);
  const [signupStatus, setSignupStatus] = useState(false);
  const fetchProducts = async () => {
    // const { data } = await commerce.products.list();
    fetch("http://localhost:4000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("ERRRRRRRRRRRR@@@", error);
      });
    //  setProducts(data);
    //  console.log("aaa",data)
  };

  const fetchCart = async () => {
    const cartValue = await commerce.cart.retrieve();
    setCart(cartValue);
    setCartCount(cartValue?.total_items || 0);
  };
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
    setCartCount(item?.cart?.total_items || 0);
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [cart]);
  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId, qty) => {
    console.log("qty", lineItemId, qty);
    if (qty == 1) {
      const response = await commerce.cart.remove(lineItemId);
      setCart(response.cart);
    } else {
      let quantity = qty - 1;
      const response = await commerce.cart.update(lineItemId, { quantity });

      setCart(response.cart);
    }
  };
  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };
  const onOpenModal = (type) => {
    setSignupStatus(false);
    setStatus(true);
  };
  const toggleDrawer = (open) => {
    setIsOpenSideDrawer(open);
  };
  const handleClick = (event) => {
    setIsShowProfileMenu(event.currentTarget);
  };
  const handleClose = (value) => {
    console.log("vaalue", value);
    setIsShowProfileMenu(value);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={mainStore}>
        <Router>
          <Navbar
            onOpenModal={onOpenModal}
            cartCount={cartCount}
            isOpenSideDrawer={isOpenSideDrawer}
            toggleDrawer={toggleDrawer}
            handleClick={handleClick}
            handleClose={(value) => handleClose(value)}
            isShowProfileMenu={isShowProfileMenu}
          />
          <Announcement />
          <Switch>
            <Route exact path="/">
              <Home products={products} cartCount={cartCount} />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route path="/product/:id">
              <ProductDetail
                products={products}
                onAddToCart={handleAddToCart}
                cartCount={cartCount}
              />
            </Route>
            <Route exact path="/cart">
              <Cart
                cartProducts={cart}
                cartCount={cartCount}
                onUpdateCartQty={handleUpdateCartQty}
                onRemoveFromCart={handleRemoveFromCart}
                onEmptyCart={handleEmptyCart}
              />
            </Route>
            <Route path="/checkout">
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            </Route>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
