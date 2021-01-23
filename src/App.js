import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Cart />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/product/:slug" component={ProductPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
