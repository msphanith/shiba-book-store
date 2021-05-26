import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ProductList from "./components/ProductList";
import Cart from "./components/cart/Cart";
import Navbar from "./components/Navbar";

function App(props) {

  return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
             <Route exact path="/" component={ProductList} />
             <Route path="/my-cart" component={Cart} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
